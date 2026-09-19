import React from 'react';
import { Play, Users, Calendar, Trophy, Sparkles, Flame, Tv, Film, Disc } from 'lucide-react';
import { GameMode } from '../types';

interface MainMenuProps {
  onSelectMode: (mode: GameMode) => void;
  characterCount: number;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onSelectMode, characterCount }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Hero Header */}
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          The Ultimate Movie & TV Guessing Game
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-3">
          GUESS <span className="text-gradient-gold">WHO?</span>
        </h1>
        
        <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Ask questions to the AI Game Master, buzz in before your friends, and guess legendary characters from <span className="text-white font-semibold">The Godfather</span>, <span className="text-white font-semibold">Breaking Bad</span>, <span className="text-white font-semibold">The Dark Knight</span>, and 50+ iconic masterworks!
        </p>

        <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-500 font-medium">
          <span className="flex items-center gap-1.5">
            <Film className="w-3.5 h-3.5 text-red-500" /> {characterCount || '60+'} Verified Legends
          </span>
          <span className="flex items-center gap-1.5">
            <Tv className="w-3.5 h-3.5 text-amber-500" /> Movies & TV Shows
          </span>
          <span className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-orange-500" /> Built for Discord & TikTok
          </span>
        </div>
      </div>

      {/* Game Mode Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* 🎉 PARTY MODE (PRIMARY FOCUS) */}
        <div
          onClick={() => onSelectMode('local_party')}
          className="relative group cursor-pointer rounded-2xl p-6 bg-gradient-to-b from-[#1a1324] to-[#12131c] border-2 border-purple-500/40 hover:border-purple-400 transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-purple-950/30 overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-purple-600/20 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-600/30 transition-all" />
          
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300">
              <Users className="w-6 h-6" />
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40 animate-pulse">
              DISCORD FAVORITE
            </span>
          </div>

          <h2 className="text-2xl font-black text-white mb-1.5 flex items-center gap-2">
            🎉 PARTY MODE <span className="text-xs font-normal text-purple-300">(Screen Share)</span>
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Host a screen share session on Discord! Add your friends (Ahmed, Khalid, etc.), buzz in, answer questions, and compete for the #1 MVP spot.
          </p>

          <div className="flex items-center gap-3">
            <button className="flex-1 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-sm tracking-wide transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30">
              <Disc className="w-4 h-4" /> PLAY ON SCREEN SHARE
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onSelectMode('online_party');
              }}
              className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-gray-200 border border-white/10 transition-colors"
              title="Join via Room Code on separate phones"
            >
              Room Codes
            </button>
          </div>
        </div>

        {/* ⚡ QUICK PLAY (SOLO) */}
        <div
          onClick={() => onSelectMode('solo')}
          className="relative group cursor-pointer rounded-2xl p-6 bg-gradient-to-b from-[#1a1215] to-[#12131c] border-2 border-red-500/30 hover:border-red-500 transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-red-950/20 overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-red-600/20 rounded-full blur-3xl pointer-events-none group-hover:bg-red-600/30 transition-all" />

          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-red-600/30 border border-red-500/50 flex items-center justify-center text-red-400">
              <Play className="w-6 h-6 fill-current" />
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/40">
              SOLO VS AI
            </span>
          </div>

          <h2 className="text-2xl font-black text-white mb-1.5">
            ⚡ QUICK PLAY
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            Challenge the smart Game Master 1-on-1. Ask questions, decode clues, use 3 progressive hints, and guess before Question #5!
          </p>

          <button className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-sm tracking-wide transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-600/30">
            START SOLO GAME
          </button>
        </div>

        {/* 🏆 DAILY CHALLENGE */}
        <div
          onClick={() => onSelectMode('daily')}
          className="cursor-pointer rounded-2xl p-5 bg-[#12131c] border border-white/10 hover:border-amber-500/50 transition-all duration-300 hover:scale-[1.01] flex items-center gap-4"
        >
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Daily Challenge</h3>
              <span className="text-[10px] bg-amber-500/20 text-amber-400 font-bold px-1.5 py-0.5 rounded">TODAY</span>
            </div>
            <p className="text-xs text-gray-400 truncate">One mystery character for everyone today. Share results with friends!</p>
          </div>
        </div>

        {/* 📊 STATS & LEADERBOARDS */}
        <div
          onClick={() => onSelectMode('leaderboard')}
          className="cursor-pointer rounded-2xl p-5 bg-[#12131c] border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.01] flex items-center gap-4"
        >
          <div className="w-11 h-11 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-white">Stats & Streaks</h3>
            <p className="text-xs text-gray-400 truncate">View your win streaks, fastest guesses, and game history.</p>
          </div>
        </div>
      </div>

      {/* Quick Tips Footer */}
      <div className="mt-10 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
        <p className="text-xs text-gray-400">
          💡 <strong className="text-gray-200">Discord Screen Share Tip:</strong> Open <strong className="text-purple-400">Party Mode</strong>, stream your window in Discord 1080p/60fps, and enable Sound FX for maximum fun!
        </p>
      </div>
    </div>
  );
};
