import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, Play, KeyRound, Copy, Check, Bell, Lightbulb, Trophy, 
  Sparkles, CheckCircle2, RotateCcw, Flame, ArrowRight
} from 'lucide-react';
import { socket } from '../socket';
import { RoomState, Player } from '../types';
import { soundFx } from '../utils/audio';
import { triggerWinConfetti } from '../utils/confetti';

export const OnlineParty: React.FC = () => {
  const [playerName, setPlayerName] = useState(localStorage.getItem('guess_player_name') || '');
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [isInRoom, setIsInRoom] = useState(false);
  const [roomState, setRoomState] = useState<RoomState | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Gameplay inputs
  const [questionInput, setQuestionInput] = useState('');
  const [guessInput, setGuessInput] = useState('');
  const [buzzCooldown, setBuzzCooldown] = useState(0);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [roomState?.chatHistory]);

  // Socket event listeners
  useEffect(() => {
    socket.on('room_update', (state: RoomState) => {
      setRoomState(state);
      setIsInRoom(true);
      setErrorMessage(null);
    });

    socket.on('player_buzzed', ({ playerId, playerName }: { playerId: string; playerName: string }) => {
      soundFx.playBuzzer();
    });

    socket.on('round_won', ({ winner, character }: { winner: string; character: unknown }) => {
      soundFx.playCorrect();
      triggerWinConfetti();
    });

    socket.on('wrong_guess', ({ player, guess }: { player: string; guess: string }) => {
      soundFx.playWrong();
    });

    socket.on('error_message', (msg: string) => {
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(null), 4000);
    });

    return () => {
      socket.off('room_update');
      socket.off('player_buzzed');
      socket.off('round_won');
      socket.off('wrong_guess');
      socket.off('error_message');
    };
  }, []);

  // Handle Create Room
  const handleCreateRoom = () => {
    if (!playerName.trim()) {
      setErrorMessage('Please enter your player nickname first!');
      return;
    }
    localStorage.setItem('guess_player_name', playerName.trim());
    socket.emit('create_room', {
      playerName: playerName.trim(),
      settings: { maxPlayers: 8, totalRounds: 5, difficulty: 'random', category: 'both' }
    });
  };

  // Handle Join Room
  const handleJoinRoom = () => {
    if (!playerName.trim()) {
      setErrorMessage('Please enter your player nickname first!');
      return;
    }
    if (!roomCodeInput.trim()) {
      setErrorMessage('Please enter a 5-letter Room Code!');
      return;
    }
    localStorage.setItem('guess_player_name', playerName.trim());
    socket.emit('join_room', {
      code: roomCodeInput.trim().toUpperCase(),
      playerName: playerName.trim()
    });
  };

  // Copy Room Link / Code
  const handleCopyCode = () => {
    if (!roomState) return;
    navigator.clipboard.writeText(roomState.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Host: Start Game
  const handleStartGame = () => {
    socket.emit('start_game');
  };

  // Host: Next Round
  const handleNextRound = () => {
    socket.emit('next_round');
  };

  // Ask Question
  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionInput.trim()) return;
    socket.emit('ask_question', { question: questionInput.trim() });
    setQuestionInput('');
  };

  // Request Hint
  const handleRequestHint = () => {
    soundFx.playHint();
    socket.emit('request_hint');
  };

  // Buzz In
  const handleBuzzIn = () => {
    socket.emit('buzz_in');
  };

  // Submit Guess
  const handleSubmitGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guessInput.trim()) return;
    socket.emit('submit_guess', { guess: guessInput.trim() });
    setGuessInput('');
  };

  // Check if current user is the host
  const isHost = !!(socket.id && roomState?.hostId === socket.id);
  const isMyBuzz = !!(socket.id && roomState?.buzzerState.buzzedPlayerId === socket.id);
  const isBuzzerLocked = !!roomState?.buzzerState.isLocked;

  // Sorted players for leaderboard
  const sortedPlayers: Player[] = roomState
    ? Object.values(roomState.players).sort((a, b) => b.score - a.score)
    : [];
  const mvp = sortedPlayers[0];

  // ================= RENDER: JOIN / CREATE SCREEN =================
  if (!isInRoom || !roomState) {
    return (
      <div className="max-w-md mx-auto px-4 py-10">
        <div className="bg-[#12131c] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white mx-auto mb-3 shadow-lg shadow-purple-600/30">
              <Users className="w-7 h-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              ONLINE ROOMS
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              Join with friends from your own phone or PC!
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-600/20 border border-red-500/40 text-red-300 text-xs font-bold text-center">
              {errorMessage}
            </div>
          )}

          {/* Nickname */}
          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Your Nickname
            </label>
            <input
              type="text"
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              placeholder="e.g. Ahmed, Batman..."
              maxLength={15}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Action Tabs */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleCreateRoom}
              className="w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-sm tracking-wider transition-colors shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> CREATE NEW ROOM
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-gray-500 uppercase tracking-widest">OR</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={roomCodeInput}
                onChange={e => setRoomCodeInput(e.target.value.toUpperCase())}
                placeholder="ROOM CODE (A7K92)"
                maxLength={5}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-black text-center text-amber-400 placeholder-gray-500 tracking-widest uppercase focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={handleJoinRoom}
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-black text-xs tracking-wider rounded-xl transition-colors border border-white/10"
              >
                JOIN
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= RENDER: LOBBY =================
  if (roomState.status === 'lobby') {
    return (
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="bg-[#12131c] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
          <span className="text-[11px] font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30 inline-block mb-3">
            ROOM LOBBY
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
            ROOM: <span className="text-gradient-gold tracking-widest">{roomState.code}</span>
          </h2>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 font-semibold mb-6 cursor-pointer hover:bg-white/10 transition-colors" onClick={handleCopyCode}>
            <span>Click to copy code: <strong>{roomState.code}</strong></span>
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
          </div>

          {/* Players in Lobby */}
          <div className="text-left mb-8">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Connected Players ({Object.keys(roomState.players).length}/{roomState.settings.maxPlayers})
            </h4>
            <div className="space-y-2">
              {Object.values(roomState.players).map(p => (
                <div 
                  key={p.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm font-bold text-white">{p.name}</span>
                    {p.isHost && (
                      <span className="text-[10px] bg-amber-500/20 text-amber-300 font-black px-1.5 py-0.5 rounded border border-amber-500/30">
                        HOST
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold">Ready</span>
                </div>
              ))}
            </div>
          </div>

          {/* Host Controls */}
          {isHost ? (
            <button
              onClick={handleStartGame}
              disabled={Object.keys(roomState.players).length < 2}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-black text-base tracking-wider transition-all shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" />
              START MATCH ({Object.keys(roomState.players).length} Players)
            </button>
          ) : (
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-xs font-medium animate-pulse">
              Waiting for Host ({roomState.players[roomState.hostId]?.name || 'Host'}) to start the game...
            </div>
          )}
        </div>
      </div>
    );
  }

  // ================= RENDER: GAME OVER =================
  if (roomState.status === 'game_over') {
    return (
      <div className="max-w-xl mx-auto px-4 py-8 text-center">
        <div className="bg-[#12131c] border-2 border-amber-500/40 rounded-3xl p-8 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto mb-3">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-white mb-1">PARTY FINISHED!</h2>
          <p className="text-gray-400 text-xs mb-6">MVP & Final Standings</p>

          {mvp && (
            <div className="mb-6 p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">👑 MATCH WINNER</span>
              <h3 className="text-2xl font-black text-white">{mvp.name}</h3>
              <p className="text-xs text-amber-300 font-bold">{mvp.score} pts • {mvp.roundsWon} wins</p>
            </div>
          )}

          <div className="space-y-1.5 mb-6 text-left">
            {sortedPlayers.map((p, idx) => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                <span className="font-bold text-white">{idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`} {p.name}</span>
                <span className="font-black text-amber-400">{p.score} pts</span>
              </div>
            ))}
          </div>

          {isHost && (
            <button
              onClick={handleStartGame}
              className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-black text-sm rounded-xl transition-colors"
            >
              PLAY AGAIN
            </button>
          )}
        </div>
      </div>
    );
  }

  // ================= RENDER: ACTIVE MATCH =================
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Header */}
      <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#12131c] border border-white/10 mb-4">
        <div>
          <span className="text-[10px] bg-red-600 text-white font-black px-2 py-0.5 rounded uppercase">
            ROUND {roomState.currentRound} / {roomState.settings.totalRounds}
          </span>
          <h2 className="text-lg font-black text-white mt-1">
            ROOM: <span className="text-amber-400">{roomState.code}</span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRequestHint}
            disabled={roomState.hintsRevealed.length >= 3 || roomState.status === 'round_end'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/30 disabled:opacity-40"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>Hint ({roomState.hintsRemaining})</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Chat / QA Log (7 cols) */}
        <div className="lg:col-span-7 flex flex-col bg-[#12131c] border border-white/10 rounded-2xl overflow-hidden h-[500px]">
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {roomState.chatHistory.map(msg => (
              <div key={msg.id} className={`flex flex-col ${msg.isAi ? 'items-start' : 'items-end'}`}>
                <span className="text-[10px] text-gray-500 font-bold mb-0.5">{msg.sender}</span>
                <div className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-medium ${
                  msg.isAi ? 'bg-purple-950/40 border border-purple-800/40 text-purple-100 rounded-tl-none' : 'bg-red-600 text-white rounded-tr-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleAskQuestion} className="p-2.5 bg-[#0d0e15] border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={questionInput}
              onChange={e => setQuestionInput(e.target.value)}
              placeholder="Ask the AI Game Master a clue question..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs rounded-xl"
            >
              ASK
            </button>
          </form>
        </div>

        {/* Buzzer & Scoreboard (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* BUZZER AREA */}
          <div className="bg-[#12131c] border-2 border-red-500/40 rounded-2xl p-5 text-center shadow-xl">
            {roomState.status === 'round_end' ? (
              /* Round Won Card */
              <div className="animate-pop">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-white">
                  🏆 {roomState.roundWinner?.playerName} Won!
                </h3>
                <p className="text-xs text-emerald-400 font-bold mb-3">+{roomState.roundWinner?.points} pts</p>

                {roomState.revealedCharacter && (
                  <div className="bg-black/50 border border-white/10 rounded-xl p-3 text-left text-xs mb-3 space-y-1">
                    <p className="text-gray-400">Character: <strong className="text-white text-sm">{roomState.revealedCharacter.name}</strong></p>
                    <p className="text-gray-400">Played by: <strong className="text-amber-400">{roomState.revealedCharacter.actor}</strong></p>
                    <p className="text-gray-400">Movie/Show: <strong className="text-white">{roomState.revealedCharacter.title} ({roomState.revealedCharacter.year})</strong></p>
                  </div>
                )}

                {isHost && (
                  <button
                    onClick={handleNextRound}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl"
                  >
                    NEXT ROUND ➡️
                  </button>
                )}
              </div>
            ) : isMyBuzz ? (
              /* You buzzed in! */
              <form onSubmit={handleSubmitGuess} className="animate-pop">
                <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-1">
                  🚨 YOU BUZZED IN! ENTER GUESS:
                </p>
                <input
                  type="text"
                  autoFocus
                  value={guessInput}
                  onChange={e => setGuessInput(e.target.value)}
                  placeholder="Character or actor name..."
                  className="w-full bg-black/60 border-2 border-amber-400 rounded-xl px-3 py-2 text-sm font-bold text-white mb-2 text-center"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs rounded-xl"
                >
                  SUBMIT GUESS
                </button>
              </form>
            ) : isBuzzerLocked ? (
              /* Someone else buzzed in */
              <div className="py-4">
                <p className="text-xs font-bold text-red-400 uppercase tracking-wider animate-pulse">
                  🚨 {roomState.buzzerState.buzzedPlayerName} IS GUESSING...
                </p>
              </div>
            ) : (
              /* Giant Buzz In Button */
              <div>
                <button
                  onClick={handleBuzzIn}
                  className="w-full py-8 rounded-2xl bg-gradient-to-tr from-red-700 via-red-600 to-amber-600 hover:scale-[1.02] active:scale-95 transition-all text-white font-black text-xl sm:text-2xl tracking-widest shadow-2xl shadow-red-600/50 glow-red border-2 border-red-400"
                >
                  🚨 BUZZ IN!
                </button>
                <p className="text-[11px] text-gray-400 mt-2">
                  First to buzz gets 5 seconds to answer!
                </p>
              </div>
            )}
          </div>

          {/* Live Scoreboard */}
          <div className="bg-[#12131c] border border-white/10 rounded-2xl p-4 flex-1">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" /> LIVE SCOREBOARD
            </h4>
            <div className="space-y-1.5">
              {sortedPlayers.map((p, idx) => (
                <div key={p.id} className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 text-xs font-semibold">
                  <span className="text-white font-bold">{idx === 0 ? '🥇' : `#${idx + 1}`} {p.name}</span>
                  <span className="text-amber-400 font-black">{p.score} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
