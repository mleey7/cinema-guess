import React from 'react';
import { Trophy, Flame, Zap, Award, Film, CheckCircle2, RotateCcw } from 'lucide-react';

export const StatsLeaderboard: React.FC = () => {
  const stats = {
    highScore: 1250,
    currentStreak: 4,
    bestStreak: 7,
    totalGames: 18,
    accuracy: '84%',
    fastestGuess: '2 Questions (Vito Corleone)'
  };

  const badges = [
    { title: 'The Don', desc: 'Guessed a character in 3 or fewer questions', icon: '🎩', unlocked: true },
    { title: 'Lightning Buzzer', desc: 'Won a round with buzzer in under 2 seconds', icon: '⚡', unlocked: true },
    { title: 'Cinema Historian', desc: 'Guessed a movie released before 1980', icon: '📼', unlocked: true },
    { title: 'TV Binge King', desc: 'Guessed 5 consecutive TV show legends', icon: '📺', unlocked: false }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-[#12131c] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              STATS & ACHIEVEMENTS
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm">
              Your career performance as a Cinema Sleuth
            </p>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
            <span className="text-2xl font-black text-white">{stats.bestStreak}</span>
            <p className="text-[11px] text-gray-400 uppercase font-bold">Best Streak</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <Trophy className="w-5 h-5 text-amber-500 mx-auto mb-1" />
            <span className="text-2xl font-black text-amber-400">{stats.highScore}</span>
            <p className="text-[11px] text-gray-400 uppercase font-bold">High Score</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center col-span-2 sm:col-span-1">
            <Zap className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
            <span className="text-2xl font-black text-cyan-300">{stats.accuracy}</span>
            <p className="text-[11px] text-gray-400 uppercase font-bold">Accuracy</p>
          </div>
        </div>

        {/* Badges / Achievements */}
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-purple-400" /> Unlocked Badges
        </h3>
        <div className="space-y-2 mb-6">
          {badges.map((b, i) => (
            <div 
              key={i} 
              className={`flex items-center justify-between p-3.5 rounded-xl border ${
                b.unlocked 
                  ? 'bg-purple-950/20 border-purple-800/40 text-white' 
                  : 'bg-white/5 border-white/5 text-gray-500 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{b.icon}</span>
                <div>
                  <h4 className="text-sm font-bold text-white">{b.title}</h4>
                  <p className="text-xs text-gray-400">{b.desc}</p>
                </div>
              </div>
              {b.unlocked ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-gray-500">
                  LOCKED
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
