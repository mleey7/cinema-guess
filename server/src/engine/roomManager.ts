import { Server, Socket } from 'socket.io';
import { Character, Difficulty, MediaType } from '../database/types.js';
import { CHARACTERS_DATABASE } from '../database/characters.js';
import { askGameMaster } from './gameMaster.js';
import { evaluateGuess } from './guessValidator.js';
import { calculatePartyScore } from './scoring.js';

export interface Player {
  id: string; // socket.id or persistent uuid
  socketId: string;
  name: string;
  score: number;
  roundsWon: number;
  isHost: boolean;
  isReady: boolean;
  lockoutUntil: number; // timestamp until when player cannot buzz
}

export interface RoomSettings {
  maxPlayers: number;
  totalRounds: number;
  difficulty: Difficulty | 'random';
  category: MediaType | 'both';
  timerSeconds: number; // 30, 60, 90, or 0 (no timer)
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  isAi?: boolean;
  isSystem?: boolean;
  timestamp: number;
}

export interface RoomState {
  code: string;
  hostId: string;
  players: Record<string, Player>;
  settings: RoomSettings;
  status: 'lobby' | 'playing' | 'round_end' | 'game_over';
  currentRound: number;
  secretCharacter?: Character;
  usedCharacterIds: Set<string>;
  questionCount: number;
  hintsRevealed: string[];
  chatHistory: ChatMessage[];
  
  // Buzzer state
  buzzerState: {
    isLocked: boolean;
    buzzedPlayerId: string | null;
    buzzedPlayerName: string | null;
    buzzTimestamp: number | null;
    timerExpiresAt: number | null;
  };
  
  roundWinner?: {
    playerId: string;
    playerName: string;
    points: number;
  };
}

export class RoomManager {
  private io: Server;
  private rooms: Map<string, RoomState> = new Map();
  private socketToRoom: Map<string, string> = new Map();

  constructor(io: Server) {
    this.io = io;
  }

  public createRoom(socket: Socket, playerName: string, settings?: Partial<RoomSettings>): string {
    let code = this.generateRoomCode();
    while (this.rooms.has(code)) {
      code = this.generateRoomCode();
    }

    const hostPlayer: Player = {
      id: socket.id,
      socketId: socket.id,
      name: playerName.trim() || 'Host',
      score: 0,
      roundsWon: 0,
      isHost: true,
      isReady: true,
      lockoutUntil: 0
    };

    const roomState: RoomState = {
      code,
      hostId: socket.id,
      players: { [socket.id]: hostPlayer },
      settings: {
        maxPlayers: settings?.maxPlayers || 8,
        totalRounds: settings?.totalRounds || 5,
        difficulty: settings?.difficulty || 'random',
        category: settings?.category || 'both',
        timerSeconds: settings?.timerSeconds ?? 60
      },
      status: 'lobby',
      currentRound: 0,
      usedCharacterIds: new Set<string>(),
      questionCount: 0,
      hintsRevealed: [],
      chatHistory: [
        {
          id: 'init',
          sender: 'Game Master',
          text: `Welcome to Party Mode! Room Code: ${code}. Share this with friends on Discord!`,
          isAi: true,
          isSystem: true,
          timestamp: Date.now()
        }
      ],
      buzzerState: {
        isLocked: false,
        buzzedPlayerId: null,
        buzzedPlayerName: null,
        buzzTimestamp: null,
        timerExpiresAt: null
      }
    };

    this.rooms.set(code, roomState);
    this.socketToRoom.set(socket.id, code);
    socket.join(code);

    this.broadcastRoomUpdate(code);
    return code;
  }

  public joinRoom(socket: Socket, code: string, playerName: string): boolean {
    const formattedCode = code.trim().toUpperCase();
    const room = this.rooms.get(formattedCode);

    if (!room) {
      socket.emit('error_message', 'Room not found. Check the code!');
      return false;
    }

    if (Object.keys(room.players).length >= room.settings.maxPlayers) {
      socket.emit('error_message', 'Room is full (max reached).');
      return false;
    }

    const player: Player = {
      id: socket.id,
      socketId: socket.id,
      name: playerName.trim() || `Player ${Object.keys(room.players).length + 1}`,
      score: 0,
      roundsWon: 0,
      isHost: false,
      isReady: true,
      lockoutUntil: 0
    };

    room.players[socket.id] = player;
    this.socketToRoom.set(socket.id, formattedCode);
    socket.join(formattedCode);

    room.chatHistory.push({
      id: `join_${Date.now()}`,
      sender: 'System',
      text: `${player.name} joined the party!`,
      isSystem: true,
      timestamp: Date.now()
    });

    this.broadcastRoomUpdate(formattedCode);
    return true;
  }

  public startGame(socket: Socket): void {
    const code = this.socketToRoom.get(socket.id);
    if (!code) return;
    const room = this.rooms.get(code);
    if (!room || room.hostId !== socket.id) return;

    room.currentRound = 0;
    room.usedCharacterIds.clear();
    Object.values(room.players).forEach(p => {
      p.score = 0;
      p.roundsWon = 0;
      p.lockoutUntil = 0;
    });

    this.startNewRound(room);
  }

  public nextRound(socket: Socket): void {
    const code = this.socketToRoom.get(socket.id);
    if (!code) return;
    const room = this.rooms.get(code);
    if (!room || room.hostId !== socket.id) return;

    if (room.currentRound >= room.settings.totalRounds) {
      room.status = 'game_over';
      this.broadcastRoomUpdate(code);
      return;
    }

    this.startNewRound(room);
  }

  private startNewRound(room: RoomState): void {
    room.currentRound += 1;
    room.status = 'playing';
    room.questionCount = 0;
    room.hintsRevealed = [];
    room.roundWinner = undefined;
    room.buzzerState = {
      isLocked: false,
      buzzedPlayerId: null,
      buzzedPlayerName: null,
      buzzTimestamp: null,
      timerExpiresAt: null
    };

    // Filter characters by settings
    let candidates = CHARACTERS_DATABASE.filter(c => !room.usedCharacterIds.has(c.id));
    if (room.settings.category !== 'both') {
      candidates = candidates.filter(c => c.mediaType === room.settings.category);
    }
    if (room.settings.difficulty !== 'random') {
      candidates = candidates.filter(c => c.difficulty === room.settings.difficulty);
    }

    if (candidates.length === 0) {
      room.usedCharacterIds.clear();
      candidates = CHARACTERS_DATABASE;
    }

    const selected = candidates[Math.floor(Math.random() * candidates.length)];
    room.secretCharacter = selected;
    room.usedCharacterIds.add(selected.id);

    // Reset lockouts
    Object.values(room.players).forEach(p => { p.lockoutUntil = 0; });

    room.chatHistory.push({
      id: `round_${room.currentRound}`,
      sender: 'Game Master',
      text: `🎬 ROUND ${room.currentRound} OF ${room.settings.totalRounds}! A secret character has been chosen. Ask me questions or buzz in!`,
      isAi: true,
      timestamp: Date.now()
    });

    this.broadcastRoomUpdate(room.code);
  }

  public async handleAskQuestion(socket: Socket, question: string): Promise<void> {
    const code = this.socketToRoom.get(socket.id);
    if (!code) return;
    const room = this.rooms.get(code);
    if (!room || room.status !== 'playing' || !room.secretCharacter) return;

    const player = room.players[socket.id];
    if (!player) return;

    room.questionCount += 1;

    // Add player question to chat
    room.chatHistory.push({
      id: `q_${Date.now()}`,
      sender: player.name,
      text: question,
      timestamp: Date.now()
    });

    // Ask Game Master
    const { answer } = await askGameMaster(question, room.secretCharacter);

    room.chatHistory.push({
      id: `a_${Date.now()}`,
      sender: 'Game Master',
      text: answer,
      isAi: true,
      timestamp: Date.now()
    });

    this.broadcastRoomUpdate(code);
  }

  public handleRequestHint(socket: Socket): void {
    const code = this.socketToRoom.get(socket.id);
    if (!code) return;
    const room = this.rooms.get(code);
    if (!room || room.status !== 'playing' || !room.secretCharacter) return;

    const availableHints = room.secretCharacter.hints;
    if (room.hintsRevealed.length >= availableHints.length) {
      socket.emit('error_message', 'All hints have already been revealed!');
      return;
    }

    const nextHintIndex = room.hintsRevealed.length;
    const nextHint = availableHints[nextHintIndex];
    room.hintsRevealed.push(nextHint);

    room.chatHistory.push({
      id: `hint_${Date.now()}`,
      sender: 'Game Master',
      text: `💡 HINT #${room.hintsRevealed.length}: ${nextHint}`,
      isAi: true,
      timestamp: Date.now()
    });

    this.broadcastRoomUpdate(code);
  }

  public handleBuzzIn(socket: Socket): void {
    const code = this.socketToRoom.get(socket.id);
    if (!code) return;
    const room = this.rooms.get(code);
    if (!room || room.status !== 'playing') return;

    const player = room.players[socket.id];
    if (!player) return;

    // Check lockout
    const now = Date.now();
    if (player.lockoutUntil > now) {
      const remainingSeconds = Math.ceil((player.lockoutUntil - now) / 1000);
      socket.emit('buzz_rejected', `You are locked out for ${remainingSeconds}s due to a wrong guess!`);
      return;
    }

    // Check if buzzer is already locked by someone
    if (room.buzzerState.isLocked) {
      socket.emit('buzz_rejected', `${room.buzzerState.buzzedPlayerName} buzzed first!`);
      return;
    }

    // Lock buzzer for this player
    room.buzzerState = {
      isLocked: true,
      buzzedPlayerId: player.id,
      buzzedPlayerName: player.name,
      buzzTimestamp: now,
      timerExpiresAt: now + 5000 // 5 seconds to guess
    };

    this.io.to(code).emit('player_buzzed', {
      playerId: player.id,
      playerName: player.name,
      expiresAt: room.buzzerState.timerExpiresAt
    });

    this.broadcastRoomUpdate(code);

    // Auto-release buzzer if player doesn't guess within 5 seconds
    setTimeout(() => {
      const currentRoom = this.rooms.get(code);
      if (
        currentRoom &&
        currentRoom.buzzerState.isLocked &&
        currentRoom.buzzerState.buzzedPlayerId === player.id &&
        currentRoom.status === 'playing'
      ) {
        // Time expired without guessing
        player.lockoutUntil = Date.now() + 7000;
        currentRoom.buzzerState = {
          isLocked: false,
          buzzedPlayerId: null,
          buzzedPlayerName: null,
          buzzTimestamp: null,
          timerExpiresAt: null
        };
        this.io.to(code).emit('buzz_expired', `${player.name} ran out of time! Buzzer re-opened.`);
        this.broadcastRoomUpdate(code);
      }
    }, 5200);
  }

  public handleGuess(socket: Socket, guess: string): void {
    const code = this.socketToRoom.get(socket.id);
    if (!code) return;
    const room = this.rooms.get(code);
    if (!room || room.status !== 'playing' || !room.secretCharacter) return;

    const player = room.players[socket.id];
    if (!player) return;

    // Verify player is the one who buzzed
    if (room.buzzerState.buzzedPlayerId !== player.id) {
      socket.emit('error_message', 'You must BUZZ IN before guessing!');
      return;
    }

    const { isCorrect, matchedName } = evaluateGuess(guess, room.secretCharacter);
    const now = Date.now();
    const remainingSeconds = room.buzzerState.timerExpiresAt ? Math.max(0, (room.buzzerState.timerExpiresAt - now) / 1000) : 0;

    if (isCorrect) {
      // Correct guess!
      const points = calculatePartyScore(room.hintsRevealed.length, room.questionCount, remainingSeconds);
      player.score += points;
      player.roundsWon += 1;

      room.roundWinner = {
        playerId: player.id,
        playerName: player.name,
        points
      };
      room.status = 'round_end';

      room.chatHistory.push({
        id: `win_${Date.now()}`,
        sender: 'Game Master',
        text: `🎉 CORRECT! ${player.name} guessed it! It was ${room.secretCharacter.name} (${room.secretCharacter.actor}) from "${room.secretCharacter.title}"! (+${points} pts)`,
        isAi: true,
        timestamp: Date.now()
      });

      this.io.to(code).emit('round_won', {
        winner: player.name,
        points,
        character: {
          name: room.secretCharacter.name,
          actor: room.secretCharacter.actor,
          title: room.secretCharacter.title,
          year: room.secretCharacter.year,
          genres: room.secretCharacter.genres,
          quote: room.secretCharacter.attributes.famousQuote,
          trivia: room.secretCharacter.attributes.trivia
        }
      });
    } else {
      // Wrong guess!
      player.lockoutUntil = Date.now() + 8000; // 8-second penalty
      room.buzzerState = {
        isLocked: false,
        buzzedPlayerId: null,
        buzzedPlayerName: null,
        buzzTimestamp: null,
        timerExpiresAt: null
      };

      room.chatHistory.push({
        id: `wrong_${Date.now()}`,
        sender: 'Game Master',
        text: `❌ WRONG! "${guess}" is incorrect. ${player.name} is locked out for 8s! Buzzer is open again.`,
        isAi: true,
        timestamp: Date.now()
      });

      this.io.to(code).emit('wrong_guess', {
        player: player.name,
        guess
      });
    }

    this.broadcastRoomUpdate(code);
  }

  public handleDisconnect(socket: Socket): void {
    const code = this.socketToRoom.get(socket.id);
    if (!code) return;

    const room = this.rooms.get(code);
    if (!room) return;

    const player = room.players[socket.id];
    const playerName = player ? player.name : 'A player';

    delete room.players[socket.id];
    this.socketToRoom.delete(socket.id);

    const remainingPlayerIds = Object.keys(room.players);
    if (remainingPlayerIds.length === 0) {
      // Delete empty room after delay
      this.rooms.delete(code);
      return;
    }

    // If host disconnected, assign next player as host
    if (room.hostId === socket.id) {
      room.hostId = remainingPlayerIds[0];
      room.players[room.hostId].isHost = true;
      room.chatHistory.push({
        id: `host_${Date.now()}`,
        sender: 'System',
        text: `${playerName} disconnected. ${room.players[room.hostId].name} is now the Host!`,
        isSystem: true,
        timestamp: Date.now()
      });
    } else {
      room.chatHistory.push({
        id: `disc_${Date.now()}`,
        sender: 'System',
        text: `${playerName} left the room.`,
        isSystem: true,
        timestamp: Date.now()
      });
    }

    this.broadcastRoomUpdate(code);
  }

  private broadcastRoomUpdate(code: string): void {
    const room = this.rooms.get(code);
    if (!room) return;

    // SANITIZE: NEVER send secretCharacter to clients during active play!
    const sanitizedState = {
      code: room.code,
      hostId: room.hostId,
      players: room.players,
      settings: room.settings,
      status: room.status,
      currentRound: room.currentRound,
      questionCount: room.questionCount,
      hintsRevealed: room.hintsRevealed,
      hintsRemaining: room.secretCharacter ? Math.max(0, 3 - room.hintsRevealed.length) : 3,
      chatHistory: room.chatHistory.slice(-50),
      buzzerState: room.buzzerState,
      roundWinner: room.roundWinner,
      revealedCharacter: room.status === 'round_end' || room.status === 'game_over'
        ? {
            name: room.secretCharacter?.name,
            actor: room.secretCharacter?.actor,
            title: room.secretCharacter?.title,
            year: room.secretCharacter?.year,
            genres: room.secretCharacter?.genres,
            quote: room.secretCharacter?.attributes.famousQuote,
            trivia: room.secretCharacter?.attributes.trivia
          }
        : undefined
    };

    this.io.to(code).emit('room_update', sanitizedState);
  }

  private generateRoomCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
}
