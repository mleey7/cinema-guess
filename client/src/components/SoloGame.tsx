import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Lightbulb, HelpCircle, Flame, CheckCircle2, RotateCcw, 
  Sparkles, Target, AlertCircle
} from 'lucide-react';
import { Difficulty, MediaType, RevealedCharacter } from '../types';
import { soundFx } from '../utils/audio';
import { triggerWinConfetti } from '../utils/confetti';
import { API_BASE } from '../socket';

interface Message {
  id: string;
  sender: 'player' | 'ai';
  text: string;
  isHint?: boolean;
}

export const SoloGame: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [category, setCategory] = useState<MediaType>('both');
  const [streak, setStreak] = useState(0);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [hintsRevealed, setHintsRevealed] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);

  const [guessModalOpen, setGuessModalOpen] = useState(false);
  const [guessInput, setGuessInput] = useState('');
  const [guessError, setGuessError] = useState<string | null>(null);

  const [roundWon, setRoundWon] = useState(false);
  const [roundScore, setRoundScore] = useState<number | null>(null);
  const [revealedCharacter, setRevealedCharacter] = useState<RevealedCharacter | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Start game on mount
  useEffect(() => {
    startNewGame();
  }, [difficulty, category]);

  const startNewGame = async () => {
    setRoundWon(false);
    setRoundScore(null);
    setRevealedCharacter(null);
    setQuestionCount(0);
    setHintsRevealed([]);
    setGuessError(null);

    try {
      const res = await fetch(`${API_BASE}/api/solo/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ difficulty, category, streak })
      });
      const data = await res.json();
      setSessionId(data.sessionId);
      setMessages([
        {
          id: 'welcome',
          sender: 'ai',
          text: `🎬 Secret character chosen! Ask me anything about their role, morality, movie, or actor to deduce who they are.`
        }
      ]);
    } catch {
      // Offline fallback
    }
  };

  const handleAskQuestion = async (customQ?: string) => {
    const q = customQ || currentQuestion;
    if (!q.trim() || !sessionId || isAsking || roundWon) return;

    setIsAsking(true);
    setCurrentQuestion('');
    setMessages(prev => [...prev, { id: `p_${Date.now()}`, sender: 'player', text: q.trim() }]);

    try {
      const res = await fetch(`${API_BASE}/api/solo/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, question: q.trim() })
      });
      const data = await res.json();
      setQuestionCount(data.questionCount);
      setMessages(prev => [
        ...prev,
        { id: `ai_${Date.now()}`, sender: 'ai', text: data.answer }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { id: `err_${Date.now()}`, sender: 'ai', text: 'Error connecting to Game Master.' }
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  const handleRequestHint = async () => {
    if (!sessionId || hintsRevealed.length >= 3 || roundWon) return;

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
        setMessages(prev => [
          ...prev,
          { id: `h_${Date.now()}`, sender: 'ai', text: `💡 HINT #${data.hintsRevealed.length}: ${data.hint}`, isHint: true }
        ]);
      }
    } catch {
      alert('Could not fetch hint.');
    }
  };

  const handleSubmitGuess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guessInput.trim() || !sessionId) return;

    const guess = guessInput.trim();
    setGuessInput('');
    setGuessError(null);

    try {
      const res = await fetch(`${API_BASE}/api/solo/guess`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, guess })
      });
      const data = await res.json();

      if (data.isCorrect) {
        soundFx.playCorrect();
        triggerWinConfetti();
        setRoundWon(true);
        setRoundScore(data.scoreResult.totalPoints);
        setStreak(data.newStreak);
        setRevealedCharacter(data.revealedCharacter);
        setGuessModalOpen(false);
      } else {
        soundFx.playWrong();
        setGuessError(`"${guess}" is incorrect! Try another question.`);
      }
    } catch {
      setGuessError('Error checking guess.');
    }
  };

  const quickQuestions = [
    "Is the character male?",
    "Is he the main protagonist?",
    "Is he a villain?",
    "Does he have superpowers?",
    "Does the character die?",
    "Is it a movie?",
    "Is the actor American?",
    "Did the actor win an Oscar?"
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* TikTok Hook Header */}
      <div className="bg-gradient-to-r from-red-600/20 via-[#12131c] to-amber-500/20 border border-white/10 rounded-2xl p-4 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-black uppercase tracking-wider bg-red-600 text-white px-2 py-0.5 rounded">
              SOLO MODE
            </span>
            <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-500" /> {streak} Win Streak
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white">
            Can you guess before Question #5?
          </h2>
        </div>

        {/* Hints Counter */}
        <button
          onClick={handleRequestHint}
          disabled={hintsRevealed.length >= 3 || roundWon}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold hover:bg-amber-500/30 disabled:opacity-40 transition-colors"
        >
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>Use Hint ({3 - hintsRevealed.length} left)</span>
        </button>
      </div>

      {/* Main Question / Answer Log */}
      <div className="bg-[#12131c] border border-white/10 rounded-2xl overflow-hidden h-[460px] flex flex-col mb-4 shadow-xl">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map(m => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'ai' ? 'items-start' : 'items-end'}`}
            >
              <span className="text-[10px] text-gray-500 font-bold mb-1">
                {m.sender === 'ai' ? 'Game Master' : 'You'}
              </span>
              <div
                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm font-medium ${
                  m.isHint
                    ? 'bg-amber-500/20 border border-amber-500/40 text-amber-200'
                    : m.sender === 'ai'
                    ? 'bg-purple-950/40 border border-purple-800/40 text-purple-100 rounded-tl-none'
                    : 'bg-red-600 text-white rounded-tr-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        {!roundWon && (
          <div className="px-3 py-2 bg-black/20 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickQuestions.map((qq, i) => (
              <button
                key={i}
                onClick={() => handleAskQuestion(qq)}
                disabled={isAsking}
                className="whitespace-nowrap text-[11px] bg-white/5 hover:bg-white/15 text-gray-300 border border-white/10 px-2.5 py-1 rounded-lg transition-colors"
              >
                {qq}
              </button>
            ))}
          </div>
        )}

        {/* Question Input */}
        {!roundWon ? (
          <form
            onSubmit={e => { e.preventDefault(); handleAskQuestion(); }}
            className="p-3 bg-[#0d0e15] border-t border-white/10 flex gap-2"
          >
            <input
              type="text"
              value={currentQuestion}
              onChange={e => setCurrentQuestion(e.target.value)}
              disabled={isAsking}
              placeholder="Ask a question (e.g. Is he in a franchise?)..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              disabled={!currentQuestion.trim() || isAsking}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:bg-gray-800 text-white text-xs font-black rounded-xl transition-colors"
            >
              {isAsking ? '...' : 'ASK'}
            </button>
            <button
              type="button"
              onClick={() => setGuessModalOpen(true)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-black rounded-xl transition-colors shadow-md shadow-amber-500/20"
            >
              GUESS!
            </button>
          </form>
        ) : (
          /* Victory Round Card */
          <div className="p-4 bg-emerald-950/40 border-t border-emerald-500/40 text-center animate-pop">
            <h3 className="text-xl font-black text-white mb-1">
              🎉 CORRECT! +{roundScore} Points!
            </h3>
            {revealedCharacter && (
              <p className="text-xs text-emerald-300 font-semibold mb-3">
                {revealedCharacter.name} played by {revealedCharacter.actor} in {revealedCharacter.title} ({revealedCharacter.year})
              </p>
            )}
            <button
              onClick={startNewGame}
              className="py-2.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> NEXT ROUND
            </button>
          </div>
        )}
      </div>

      {/* GUESS MODAL */}
      {guessModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12131c] border-2 border-amber-500/50 rounded-2xl max-w-md w-full p-6 text-center shadow-2xl animate-pop">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white mb-1">Make Your Guess</h3>
            <p className="text-xs text-gray-400 mb-4">
              Enter the character name or actor name.
            </p>

            {guessError && (
              <div className="mb-3 p-2.5 rounded-xl bg-red-600/20 border border-red-500/40 text-red-300 text-xs font-bold">
                {guessError}
              </div>
            )}

            <form onSubmit={handleSubmitGuess}>
              <input
                type="text"
                autoFocus
                value={guessInput}
                onChange={e => setGuessInput(e.target.value)}
                placeholder="e.g. Vito Corleone, Al Pacino..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white text-center mb-4 focus:outline-none focus:border-amber-400"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setGuessModalOpen(false)}
                  className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 text-gray-300 text-xs font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-black rounded-xl"
                >
                  Confirm Guess
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
