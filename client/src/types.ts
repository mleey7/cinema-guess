export type GameMode = 'menu' | 'solo' | 'local_party' | 'online_party' | 'daily' | 'leaderboard' | 'settings';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'random';
export type MediaType = 'movie' | 'tv' | 'both';

export interface RevealedCharacter {
  name: string;
  actor: string;
  title: string;
  year: number;
  genres: string[];
  quote?: string;
  trivia?: string;
}

export interface Player {
  id: string;
  socketId: string;
  name: string;
  score: number;
  roundsWon: number;
  isHost: boolean;
  isReady: boolean;
  lockoutUntil: number;
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  isAi?: boolean;
  isSystem?: boolean;
  timestamp: number;
}

export interface RoomSettings {
  maxPlayers: number;
  totalRounds: number;
  difficulty: Difficulty;
  category: MediaType;
  timerSeconds: number;
}

export interface RoomState {
  code: string;
  hostId: string;
  players: Record<string, Player>;
  settings: RoomSettings;
  status: 'lobby' | 'playing' | 'round_end' | 'game_over';
  currentRound: number;
  questionCount: number;
  hintsRevealed: string[];
  hintsRemaining: number;
  chatHistory: ChatMessage[];
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
  revealedCharacter?: RevealedCharacter;
}
