import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, Play, Plus, Trash2, Bell, Sparkles, Trophy, HelpCircle, 
  Lightbulb, ArrowRight, RotateCcw, AlertTriangle, Flame, CheckCircle2, XCircle
} from 'lucide-react';
import { Difficulty, MediaType, RevealedCharacter } from '../types';
import { soundFx } from '../utils/audio';
import { triggerWinConfetti } from '../utils/confetti';
import { API_BASE } from '../socket';

interface LocalPlayer {
  id: string;
  name: string;
  score: number;
  roundsWon: number;
  isLockedOut: boolean;
}

interface ChatEntry {
  id: string;
  sender: string;
  text: string;
  isAi?: boolean;
  isHint?: boolean;
}

export const LocalParty: React.FC = () => {
  // Setup State
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [players, setPlayers] = useState<LocalPlayer[]>([
    { id: '1', name: 'Ahmed', score: 0, roundsWon: 0, isLockedOut: false },
    { id: '2', name: 'Mohammed', score: 0, roundsWon: 0, isLockedOut: false },
    { id: '3', name: 'Khalid', score: 0, roundsWon: 0, isLockedOut: false },
    { id: '4', name: 'Salem', score: 0, roundsWon: 0, isLockedOut: false }
  ]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [totalRounds, setTotalRounds] = useState(5);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [category, setCategory] = useState<MediaType>('both');

  // Round State
  const [currentRound, setCurrentRound] = useState(1);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [hintsRevealed, setHintsRevealed] = useState<string[]>([]);
  const [chatLog, setChatLog] = useState<ChatEntry[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);

  // Buzzer & Guessing State
  const [buzzedPlayer, setBuzzedPlayer] = useState<LocalPlayer | null>(null);
  const [buzzTimeLeft, setBuzzTimeLeft] = useState<number | null>(null);
  const [guessInput, setGuessInput] = useState('');
  const [guessResult, setGuessResult] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [roundWinner, setRoundWinner] = useState<{ player: LocalPlayer; points: number } | null>(null);
  const [revealedCharacter, setRevealedCharacter] = useState<RevealedCharacter | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  // 5-second buzz countdown timer
  useEffect(() => {
    if (!buzzedPlayer || buzzTimeLeft === null) return;

    if (buzzTimeLeft <= 0) {
      soundFx.playWrong();
      setChatLog(prev => [
        ...prev,
        { id: `to_${Date.now()}`, sender: 'Game Master', text: `⏰ Time's up for ${buzzedPlayer.name}! Buzzer is re-opened.`, isAi: true }
      ]);
      // Lockout this player for the rest of this round attempt
      setPlayers(prev => prev.map(p => p.id === buzzedPlayer.id ? { ...p, isLockedOut: true } : p));
      setBuzzedPlayer(null);
      setBuzzTimeLeft(null);
      setGuessInput('');
      return;
    }

    soundFx.playTick();
    const timer = setTimeout(() => {
      setBuzzTimeLeft(prev => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearTimeout(timer);
  }, [buzzedPlayer, buzzTimeLeft]);

  // Add new player
  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) return;
    setPlayers(prev => [
      ...prev,
      { id: `p_${Date.now()}`, name: newPlayerName.trim(), score: 0, roundsWon: 0, isLockedOut: false }
    ]);
    setNewPlayerName('');
  };

  // Remove player
  const handleRemovePlayer = (id: string) => {
    if (players.length <= 2) return;
    setPlayers(prev => prev.filter(p => p.id !== id));
  };

  // Start the entire Party session
  const handleStartGame = async () => {
    if (players.length < 2) return;
    setIsGameStarted(true);
    setIsGameOver(false);
    setCurrentRound(1);
    setPlayers(prev => prev.map(p => ({ ...p, score: 0, roundsWon: 0, isLockedOut: false })));
    await startNewRound(1);
  };

  // Start an individual Round
  const startNewRound = async (roundNum: number) => {
    setCurrentRound(roundNum);
    setQuestionCount(0);
    setHintsRevealed([]);
    setBuzzedPlayer(null);
    setBuzzTimeLeft(null);
    setGuessInput('');
    setGuessResult(null);
    setRoundWinner(null);
    setRevealedCharacter(null);
    setPlayers(prev => prev.map(p => ({ ...p, isLockedOut: false })));

    try {
      const res = await fetch(`${API_BASE}/api/solo/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ difficulty, category })
      });
      const data = await res.json();
      setSessionId(data.sessionId);
      setChatLog([
        {
          id: `start_${Date.now()}`,
          sender: 'Game Master',
          text: `🎬 ROUND ${roundNum} OF ${totalRounds}! A secret character has been chosen. Ask questions or BUZZ IN when you know the answer!`,
          isAi: true
        }
      ]);
    } catch {
      alert('Error connecting to server. Is the server running?');
    }
  };

  // Host or player asks question
  const handleAskQuestion = async (qText?: string) => {
    const textToAsk = qText || currentQuestion;
    if (!textToAsk.trim() || !sessionId || isAsking) return;

    setIsAsking(true);
    const q = textToAsk.trim();
    setCurrentQuestion('');

    setChatLog(prev => [...prev, { id: `q_${Date.now()}`, sender: 'Discord Crew', text: q }]);

    try {
      const res = await fetch(`${API_BASE}/api/solo/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, question: q })
      });
      const data = await res.json();
      setQuestionCount(data.questionCount);
      setChatLog(prev => [
        ...prev,
        { id: `a_${Date.now()}`, sender: 'Game Master', text: data.answer, isAi: true }
      ]);
    } catch {
      setChatLog(prev => [
        ...prev,
        { id: `err_${Date.now()}`, sender: 'Game Master', text: 'Error getting answer.', isAi: true }
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  // Reveal next Hint
  const handleRequestHint = async () => {
    if (!sessionId || hintsRevealed.length >= 3) return;

    try {
      const res = await fetch(`${API_BASE}/api/solo/hint`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      });
      const data = await res.json();
      if (data.hint) {
        soundFx.playHint();
        setHintsRevealed(data.hintsRevealed);
        setChatLog(prev => [
          ...prev,
          { id: `hint_${Date.now()}`, sender: 'Game Master', text: `💡 HINT #${data.hintsRevealed.length}: ${data.hint}`, isAi: true, isHint: true }
        ]);
      }
    } catch {
      alert('Failed to fetch hint.');
    }
  };

  // Player Buzz-In Trigger
  const handlePlayerBuzz = (player: LocalPlayer) => {
    if (buzzedPlayer || roundWinner || player.isLockedOut) return;

    soundFx.playBuzzer();
    setBuzzedPlayer(player);
    setBuzzTimeLeft(5); // 5 seconds
    setGuessInput('');
    setGuessResult(null);

    setChatLog(prev => [
      ...prev,
      { id: `buzz_${Date.now()}`, sender: 'System', text: `🚨 ${player.name} BUZZED IN! 5 seconds to guess...` }
    ]);
  };

  // Submit Guess
  const handleSubmitGuess = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!buzzedPlayer || !guessInput.trim() || !sessionId) return;

    const currentGuess = guessInput.trim();
    setGuessInput('');

    try {
      const res = await fetch(`${API_BASE}/api/solo/guess`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, guess: currentGuess })
      });
      const data = await res.json();

      if (data.isCorrect) {
        // 🎉 Correct Guess!
        soundFx.playCorrect();
        triggerWinConfetti();

        const speedBonus = buzzTimeLeft ? buzzTimeLeft * 5 : 0;
        const pointsWon = Math.max(40, 100 - (hintsRevealed.length * 15) + speedBonus);

        setPlayers(prev => prev.map(p => {
          if (p.id === buzzedPlayer.id) {
            return { ...p, score: p.score + pointsWon, roundsWon: p.roundsWon + 1 };
          }
          return p;
        }));

        setRoundWinner({ player: buzzedPlayer, points: pointsWon });
        setRevealedCharacter(data.revealedCharacter);
        setBuzzedPlayer(null);
        setBuzzTimeLeft(null);

        setChatLog(prev => [
          ...prev,
          { 
            id: `win_${Date.now()}`, 
            sender: 'Game Master', 
            text: `🎉 CORRECT! ${buzzedPlayer.name} guessed it! "${data.revealedCharacter.name}" played by ${data.revealedCharacter.actor} in ${data.revealedCharacter.title}! (+${pointsWon} pts)`,
            isAi: true 
          }
        ]);
      } else {
        // ❌ Wrong Guess!
        soundFx.playWrong();
        setGuessResult({ isCorrect: false, message: `"${currentGuess}" is incorrect!` });

        setChatLog(prev => [
          ...prev,
          { id: `wrong_${Date.now()}`, sender: 'Game Master', text: `❌ WRONG! ${buzzedPlayer.name} guessed "${currentGuess}". Locked out for this round! Buzzer re-opened.`, isAi: true }
        ]);

        // Lockout player
        setPlayers(prev => prev.map(p => p.id === buzzedPlayer.id ? { ...p, isLockedOut: true } : p));
        setBuzzedPlayer(null);
        setBuzzTimeLeft(null);
      }
    } catch {
      alert('Error submitting guess.');
    }
  };

  // Surrender / Reveal character if everyone gets stuck
  const handleRevealCharacter = async () => {
    if (!sessionId || roundWinner) return;
    if (!window.confirm('Reveal the secret character and skip to the next round?')) return;

    try {
      const res = await fetch(`${API_BASE}/api/solo/surrender`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      });
      const data = await res.json();
      setRevealedCharacter(data.revealedCharacter);
      setRoundWinner({ player: { id: 'none', name: 'Nobody', score: 0, roundsWon: 0, isLockedOut: false }, points: 0 });
      setBuzzedPlayer(null);
      setBuzzTimeLeft(null);
    } catch {
      alert('Failed to reveal character.');
    }
  };

  // Advance to next round or finish game
  const handleNextRound = () => {
    if (currentRound >= totalRounds) {
      setIsGameOver(true);
      triggerWinConfetti();
    } else {
      startNewRound(currentRound + 1);
    }
  };

  // Sort players by score for the live leaderboard
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const mvp = sortedPlayers[0];

  // Quick Suggestion Chips
  const quickQuestions = [
    "Is the character male?",
    "Is he the protagonist / main character?",
    "Is he a villain?",
    "Does he have superpowers?",
    "Does the character die?",
    "Is it a movie?",
    "Is it an American actor?",
    "Has the actor won an Oscar?",
    "Is it from the 2000s or later?"
  ];

  // ================= RENDER: LOBBY SETUP =================
  if (!isGameStarted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-[#12131c] border border-purple-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                🎉 PARTY MODE <span className="text-purple-400 font-medium text-lg">(Discord Screen Share)</span>
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm">
                Share this screen on Discord! Add your friends and see who buzzes in first.
              </p>
            </div>
          </div>

          {/* Players Roster */}
          <div className="mb-6">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Players in Call ({players.length} Players)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              {players.map((p, idx) => (
                <div 
                  key={p.id}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-purple-600/40 text-purple-300 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="font-bold text-white text-sm">{p.name}</span>
                  </div>
                  {players.length > 2 && (
                    <button 
                      onClick={() => handleRemovePlayer(p.id)}
                      className="text-gray-500 hover:text-red-400 transition-colors p-1"
                      title="Remove Player"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Player Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newPlayerName}
                onChange={e => setNewPlayerName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddPlayer()}
                placeholder="Enter friend's name (e.g. Tariq)..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleAddPlayer}
                className="px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 border border-purple-500/40 rounded-xl text-sm font-bold flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </div>

          {/* Game Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 pt-4 border-t border-white/10">
            {/* Rounds */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Number of Rounds
              </label>
              <select
                value={totalRounds}
                onChange={e => setTotalRounds(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              >
                <option value={3} className="bg-[#12131c]">3 Rounds (Quick Match)</option>
                <option value={5} className="bg-[#12131c]">5 Rounds (Recommended)</option>
                <option value={10} className="bg-[#12131c]">10 Rounds (Epic Party)</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value as Difficulty)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              >
                <option value="easy" className="bg-[#12131c]">Easy (Super Famous)</option>
                <option value="medium" className="bg-[#12131c]">Medium (Challenging)</option>
                <option value="hard" className="bg-[#12131c]">Hard (Iconic Side Role)</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as MediaType)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              >
                <option value="both" className="bg-[#12131c]">Movies + TV Shows</option>
                <option value="movie" className="bg-[#12131c]">Movies Only</option>
                <option value="tv" className="bg-[#12131c]">TV Shows Only</option>
              </select>
            </div>
          </div>

          {/* Launch Button */}
          <button
            onClick={handleStartGame}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-base sm:text-lg tracking-wider transition-all shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 group"
          >
            <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
            START DISCORD PARTY GAME
          </button>
        </div>
      </div>
    );
  }

  // ================= RENDER: GAME OVER PODIUM =================
  if (isGameOver) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-[#12131c] border-2 border-amber-500/40 rounded-3xl p-8 text-center shadow-2xl">
          <div className="w-20 h-20 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto mb-4 animate-bounce">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white mb-1">
            GAME OVER!
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Congratulations to all players! Here is the final leaderboard:
          </p>

          {/* MVP Highlight */}
          {mvp && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border border-amber-500/40">
              <span className="text-xs font-black uppercase tracking-widest text-amber-400 flex items-center justify-center gap-1.5 mb-1">
                <Flame className="w-4 h-4 text-orange-500" /> PARTY MVP
              </span>
              <h3 className="text-2xl font-black text-white">{mvp.name}</h3>
              <p className="text-xs text-gray-300">
                {mvp.score} Total Points • {mvp.roundsWon} Rounds Won
              </p>
            </div>
          )}

          {/* Final Standings */}
          <div className="space-y-2 mb-8">
            {sortedPlayers.map((p, idx) => (
              <div 
                key={p.id}
                className={`flex items-center justify-between p-3.5 rounded-xl border ${
                  idx === 0 
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 font-bold' 
                    : idx === 1
                    ? 'bg-slate-300/10 border-slate-300/30 text-slate-200'
                    : idx === 2
                    ? 'bg-amber-700/10 border-amber-700/30 text-amber-600'
                    : 'bg-white/5 border-white/10 text-gray-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base font-black">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                  </span>
                  <span className="text-sm font-bold text-white">{p.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black text-white">{p.score} pts</span>
                  <span className="text-[11px] text-gray-400 ml-2">({p.roundsWon} wins)</span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleStartGame}
              className="flex-1 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-sm tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg shadow-purple-600/30"
            >
              <RotateCcw className="w-4 h-4" /> PLAY AGAIN
            </button>
            <button
              onClick={() => setIsGameStarted(false)}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors"
            >
              Back to Setup
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= RENDER: ACTIVE SCREEN SHARE GAMEPLAY =================
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Top Banner: Round & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 p-4 rounded-2xl bg-[#12131c] border border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-red-600 text-white text-xs font-black uppercase tracking-wider">
              ROUND {currentRound} / {totalRounds}
            </span>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Difficulty: <strong className="text-amber-400 capitalize">{difficulty}</strong>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
            🎬 GUESS THE CHARACTER
          </h2>
        </div>

        {/* Hints Counter & Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleRequestHint}
            disabled={hintsRevealed.length >= 3 || !!roundWinner}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              hintsRevealed.length >= 3 || roundWinner
                ? 'bg-gray-800 text-gray-500 border-gray-700 cursor-not-allowed'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Use Hint ({3 - hintsRevealed.length} left)</span>
          </button>

          <button
            onClick={handleRevealCharacter}
            disabled={!!roundWinner}
            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-red-400 text-xs font-bold border border-white/10 transition-colors"
            title="Give up & reveal character"
          >
            Give Up
          </button>
        </div>
      </div>

      {/* Main Grid: Left Chat/Questions | Right Scoreboard & Buzzers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* LEFT COLUMN: Question Chat (7 cols) */}
        <div className="lg:col-span-7 flex flex-col bg-[#12131c] border border-white/10 rounded-2xl overflow-hidden h-[540px]">
          {/* Chat Header */}
          <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-purple-400" /> Questions & AI Answers ({questionCount})
            </span>
            <span className="text-[11px] text-gray-500">Ask anything to narrow down clues</span>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatLog.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.isAi ? 'items-start' : 'items-end'}`}
              >
                <span className="text-[10px] text-gray-500 font-bold mb-1 px-1">
                  {msg.sender}
                </span>
                <div
                  className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-sm font-medium ${
                    msg.isHint
                      ? 'bg-amber-500/20 border border-amber-500/40 text-amber-200'
                      : msg.isAi
                      ? 'bg-purple-950/40 border border-purple-800/40 text-purple-100 rounded-tl-none'
                      : 'bg-red-600 text-white rounded-tr-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-black/20 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickQuestions.slice(0, 5).map((qq, i) => (
              <button
                key={i}
                onClick={() => handleAskQuestion(qq)}
                disabled={isAsking || !!roundWinner}
                className="whitespace-nowrap text-[11px] bg-white/5 hover:bg-white/15 text-gray-300 border border-white/10 px-2.5 py-1 rounded-lg transition-colors"
              >
                {qq}
              </button>
            ))}
          </div>

          {/* Question Input Form */}
          <form 
            onSubmit={e => { e.preventDefault(); handleAskQuestion(); }}
            className="p-3 bg-[#0d0e15] border-t border-white/10 flex gap-2"
          >
            <input
              type="text"
              value={currentQuestion}
              onChange={e => setCurrentQuestion(e.target.value)}
              disabled={isAsking || !!roundWinner}
              placeholder="Ask the AI Game Master (e.g. Is he in the mafia?)..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!currentQuestion.trim() || isAsking || !!roundWinner}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-800 text-white text-xs font-black tracking-wider rounded-xl transition-colors"
            >
              {isAsking ? 'Thinking...' : 'ASK'}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Buzzer Area & Live Scoreboard (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* BUZZ-IN INTERACTIVE PANEL */}
          <div className="bg-[#12131c] border-2 border-red-500/40 rounded-2xl p-4 sm:p-5 shadow-xl shadow-red-950/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-red-500 animate-pulse" /> BUZZ-IN STATION
              </span>
              <span className="text-[11px] text-gray-400">Click who shouted!</span>
            </div>

            {/* BUZZ ACTIVE MODAL / COUNTDOWN */}
            {buzzedPlayer ? (
              <div className="bg-red-950/50 border-2 border-red-500 rounded-2xl p-4 text-center animate-pop">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-red-400 uppercase tracking-widest">
                    🚨 {buzzedPlayer.name} BUZZED!
                  </span>
                  <span className="text-xl font-black text-amber-400 animate-pulse">
                    ⏱️ {buzzTimeLeft}s
                  </span>
                </div>

                <form onSubmit={handleSubmitGuess} className="mt-3">
                  <input
                    type="text"
                    autoFocus
                    value={guessInput}
                    onChange={e => setGuessInput(e.target.value)}
                    placeholder="Type character or actor name..."
                    className="w-full bg-black/60 border-2 border-amber-400 rounded-xl px-3.5 py-2.5 text-base font-bold text-white placeholder-gray-400 focus:outline-none mb-2"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-black text-sm rounded-xl transition-colors"
                    >
                      CONFIRM GUESS
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        // Manual wrong pass
                        soundFx.playWrong();
                        setPlayers(prev => prev.map(p => p.id === buzzedPlayer.id ? { ...p, isLockedOut: true } : p));
                        setBuzzedPlayer(null);
                        setBuzzTimeLeft(null);
                      }}
                      className="px-3 py-2 bg-white/10 hover:bg-red-600/30 text-gray-300 hover:text-red-400 text-xs font-bold rounded-xl transition-colors"
                    >
                      Wrong
                    </button>
                  </div>
                </form>
              </div>
            ) : roundWinner ? (
              /* ROUND WIN CARD */
              <div className="bg-emerald-950/40 border-2 border-emerald-500/50 rounded-2xl p-4 text-center animate-pop">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-black text-white">
                  {roundWinner.player.id !== 'none' ? `🏆 ${roundWinner.player.name} Won the Round!` : 'Round Ended'}
                </h4>
                {roundWinner.player.id !== 'none' && (
                  <p className="text-xs text-emerald-300 font-bold mb-3">
                    +{roundWinner.points} Points Awarded
                  </p>
                )}

                {/* Character Reveal Card */}
                {revealedCharacter && (
                  <div className="bg-black/50 border border-white/10 rounded-xl p-3 text-left mb-4 text-xs space-y-1">
                    <p className="text-gray-400">
                      Character: <strong className="text-white text-sm">{revealedCharacter.name}</strong>
                    </p>
                    <p className="text-gray-400">
                      Played by: <strong className="text-amber-400">{revealedCharacter.actor}</strong>
                    </p>
                    <p className="text-gray-400">
                      Work: <strong className="text-white">{revealedCharacter.title} ({revealedCharacter.year})</strong>
                    </p>
                    {revealedCharacter.quote && (
                      <p className="text-purple-300 italic pt-1 border-t border-white/10">
                        "{revealedCharacter.quote}"
                      </p>
                    )}
                  </div>
                )}

                <button
                  onClick={handleNextRound}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/30"
                >
                  {currentRound >= totalRounds ? 'VIEW FINAL RESULTS 🏆' : 'NEXT ROUND ➡️'}
                </button>
              </div>
            ) : (
              /* BUZZER BUTTONS FOR PLAYERS */
              <div className="space-y-2">
                <p className="text-[11px] text-gray-400 text-center mb-2">
                  Tap player to trigger their buzz-in!
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {players.map(p => (
                    <button
                      key={p.id}
                      onClick={() => handlePlayerBuzz(p)}
                      disabled={p.isLockedOut}
                      className={`py-3 px-3 rounded-xl font-black text-xs sm:text-sm tracking-wide transition-all border flex items-center justify-between ${
                        p.isLockedOut
                          ? 'bg-gray-800/40 text-gray-500 border-gray-700/50 cursor-not-allowed'
                          : 'bg-red-600 hover:bg-red-500 active:scale-95 text-white border-red-500 shadow-md shadow-red-600/30 hover:glow-red'
                      }`}
                    >
                      <span className="truncate">{p.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/30">
                        {p.isLockedOut ? 'LOCKED' : 'BUZZ'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* LIVE DISCORD SCOREBOARD */}
          <div className="bg-[#12131c] border border-white/10 rounded-2xl p-4 flex-1">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" /> LIVE SCOREBOARD
              </span>
              <span className="text-[11px] text-gray-400 font-semibold">
                Leader: <strong className="text-white">{sortedPlayers[0]?.name}</strong>
              </span>
            </div>

            <div className="space-y-1.5">
              {sortedPlayers.map((p, idx) => (
                <div
                  key={p.id}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                    idx === 0
                      ? 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
                      : 'bg-white/5 border border-white/5 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs">
                      {idx === 0 ? '👑' : `#${idx + 1}`}
                    </span>
                    <span className="text-white font-bold">{p.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-white">{p.score} pts</span>
                    <span className="text-[10px] text-gray-400">({p.roundsWon}W)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
