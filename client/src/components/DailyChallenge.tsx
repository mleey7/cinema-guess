import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, Lightbulb, Share2, Eye, EyeOff, Check, Copy, 
  RotateCcw, Sparkles, Target, Flame
} from 'lucide-react';
import { RevealedCharacter } from '../types';
import { soundFx } from '../utils/audio';
import { triggerWinConfetti } from '../utils/confetti';
import { API_BASE } from '../socket';

interface Message {
  id: string;
  sender: 'player' | 'ai';
  text: string;
  isHint?: boolean;
}

export const DailyChallenge: React.FC = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [todayDate, setTodayDate] = useState<string>('');
  const [questionCount, setQuestionCount] = useState(0);
  const [hintsRevealed, setHintsRevealed] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);

  const [guessModalOpen, setGuessModalOpen] = useState(false);
  const [guessInput, setGuessInput] = useState('');
  const [guessError, setGuessError] = useState<string | null>(null);

  const [isSolved, setIsSolved] = useState(false);
  const [score, setScore] = useState<number>(0);
  const [revealedCharacter, setRevealedCharacter] = useState<RevealedCharacter | null>(null);
  const [hideSpoiler, setHideSpoiler] = useState(true);
  const [copied, setCopied] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    fetchTodayPuzzle();
  }, []);

  const fetchTodayPuzzle = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/daily/today`);
      const data = await res.json();
      setSessionId(data.sessionId);
      setTodayDate(data.date);
      setMessages([
        {
          id: 'welcome',
          sender: 'ai',
          text: `🔥 Welcome to Today's Global Challenge (${data.date})! Everyone gets the exact same secret character. Solve it with the fewest questions!`
        }
      ]);
    } catch {
      //
    }
  };

  const handleAskQuestion = async () => {
    if (!currentQuestion.trim() || !sessionId || isAsking || isSolved) return;
    setIsAsking(true);
    const q = currentQuestion.trim();
    setCurrentQuestion('');
    setMessages(prev => [...prev, { id: `p_${Date.now()}`, sender: 'player', text: q }]);

    try {
      const res = await fetch(`${API_BASE}/api/solo/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, question: q })
      });
      const data = await res.json();
      setQuestionCount(data.questionCount);
      setMessages(prev => [...prev, { id: `ai_${Date.now()}`, sender: 'ai', text: data.answer }]);
    } catch {
      //
    } finally {
      setIsAsking(false);
    }
  };

  const handleRequestHint = async () => {
    if (!sessionId || hintsRevealed.length >= 3 || isSolved) return;
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
      //
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
        setIsSolved(true);
        setScore(data.scoreResult.totalPoints);
        setRevealedCharacter(data.revealedCharacter);
        setGuessModalOpen(false);
      } else {
        soundFx.playWrong();
        setGuessError(`"${guess}" is incorrect!`);
      }
    } catch {
      setGuessError('Error checking guess.');
    }
  };

  const handleShareResult = () => {
    const cardText = `🎬 GUESS WHO? DAILY CHALLENGE (${todayDate})
━━━━━━━━━━━━━━━━━━━━━━
🔥 Questions: ${questionCount}
💡 Hints: ${hintsRevealed.length}
🏆 Score: ${score} pts
${hideSpoiler ? '🔒 Character: [Hidden to prevent spoilers]' : `⭐ Character: ${revealedCharacter?.name} (${revealedCharacter?.actor})`}
Play now: ${window.location.origin}`;

    navigator.clipboard.writeText(cardText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Daily Header */}
      <div className="bg-[#12131c] border border-amber-500/30 rounded-2xl p-4 sm:p-5 mb-4 flex flex-wrap items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
              TODAY'S DAILY PUZZLE • {todayDate}
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white">
              Global Mystery Character
            </h2>
          </div>
        </div>

        <button
          onClick={handleRequestHint}
          disabled={hintsRevealed.length >= 3 || isSolved}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/30 disabled:opacity-40"
        >
          <Lightbulb className="w-4 h-4 text-amber-400" />
          <span>Hint ({3 - hintsRevealed.length} left)</span>
        </button>
      </div>

      {/* Chat Area */}
      <div className="bg-[#12131c] border border-white/10 rounded-2xl overflow-hidden h-[460px] flex flex-col mb-4 shadow-xl">
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map(m => (
            <div key={m.id} className={`flex flex-col ${m.sender === 'ai' ? 'items-start' : 'items-end'}`}>
              <span className="text-[10px] text-gray-500 font-bold mb-1">
                {m.sender === 'ai' ? 'Game Master' : 'You'}
              </span>
              <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm font-medium ${
                m.isHint ? 'bg-amber-500/20 border border-amber-500/40 text-amber-200' : m.sender === 'ai' ? 'bg-purple-950/40 border border-purple-800/40 text-purple-100 rounded-tl-none' : 'bg-red-600 text-white rounded-tr-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input or Solved Card */}
        {!isSolved ? (
          <form onSubmit={e => { e.preventDefault(); handleAskQuestion(); }} className="p-3 bg-[#0d0e15] border-t border-white/10 flex gap-2">
            <input
              type="text"
              value={currentQuestion}
              onChange={e => setCurrentQuestion(e.target.value)}
              placeholder="Ask a question about today's character..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
            />
            <button type="submit" disabled={!currentQuestion.trim() || isAsking} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-xs font-black rounded-xl">
              ASK
            </button>
            <button type="button" onClick={() => setGuessModalOpen(true)} className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-black rounded-xl">
              GUESS!
            </button>
          </form>
        ) : (
          /* Solved Card & Share Section */
          <div className="p-5 bg-gradient-to-r from-amber-500/10 via-[#12131c] to-amber-500/10 border-t border-amber-500/40 text-center animate-pop">
            <h3 className="text-2xl font-black text-white mb-1">
              🎉 TODAY'S CHALLENGE SOLVED!
            </h3>
            <p className="text-xs text-amber-300 font-semibold mb-4">
              Solved in {questionCount} questions • {hintsRevealed.length} hints used • Score: {score} pts
            </p>

            {/* Shareable Card Preview */}
            <div className="max-w-md mx-auto bg-black/60 border border-white/10 rounded-2xl p-4 text-left mb-4 shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                <span className="font-bold text-white">🎬 GUESS WHO? DAILY</span>
                <span className="text-gray-400">{todayDate}</span>
              </div>
              <div className="py-2.5 space-y-1 text-xs">
                <p className="text-gray-300">🔥 Questions: <strong className="text-white">{questionCount}</strong></p>
                <p className="text-gray-300">💡 Hints: <strong className="text-white">{hintsRevealed.length}</strong></p>
                <p className="text-gray-300">🏆 Score: <strong className="text-amber-400">{score} pts</strong></p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-gray-400">Secret Character:</span>
                  <span className={`font-bold transition-all ${hideSpoiler ? 'blur-sm select-none text-gray-500' : 'text-emerald-400'}`}>
                    {revealedCharacter?.name} ({revealedCharacter?.actor})
                  </span>
                </div>
              </div>
              <button
                onClick={() => setHideSpoiler(!hideSpoiler)}
                className="w-full mt-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-gray-400 flex items-center justify-center gap-1.5 transition-colors"
              >
                {hideSpoiler ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                {hideSpoiler ? 'Reveal Answer in Card' : 'Hide / Blur Answer (Anti-Spoiler)'}
              </button>
            </div>

            <button
              onClick={handleShareResult}
              className="py-3 px-6 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 inline-flex items-center gap-2 transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'COPIED TO CLIPBOARD!' : 'SHARE RESULT TO DISCORD / TIKTOK'}
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
            <h3 className="text-xl font-black text-white mb-1">Guess Today's Mystery Character</h3>
            {guessError && (
              <div className="mb-3 p-2.5 rounded-xl bg-red-600/20 text-red-300 text-xs font-bold">
                {guessError}
              </div>
            )}
            <form onSubmit={handleSubmitGuess}>
              <input
                type="text"
                autoFocus
                value={guessInput}
                onChange={e => setGuessInput(e.target.value)}
                placeholder="Character or actor name..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white text-center mb-4 focus:outline-none focus:border-amber-400"
              />
              <div className="flex gap-2">
                <button type="button" onClick={() => setGuessModalOpen(false)} className="flex-1 py-2.5 bg-white/10 text-gray-300 text-xs font-bold rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-black rounded-xl">
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
