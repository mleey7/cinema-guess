import React from 'react';
import { Film, Volume2, VolumeX, Smartphone, Monitor, Home, Sparkles } from 'lucide-react';
import { GameMode } from '../types';
import { soundFx } from '../utils/audio';

interface NavbarProps {
  currentMode: GameMode;
  onNavigate: (mode: GameMode) => void;
  isCreatorMode: boolean;
  onToggleCreatorMode: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onNavigate,
  isCreatorMode,
  onToggleCreatorMode,
  isMuted,
  onToggleMute
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#08080c]/85 border-b border-white/10 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => onNavigate('menu')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-red-500 to-amber-500 flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
            <Film className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black tracking-wider text-lg text-white">GUESS WHO?</span>
              <span className="text-[10px] uppercase tracking-widest bg-amber-500/20 text-amber-400 font-bold px-1.5 py-0.5 rounded border border-amber-500/30">
                PARTY
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-medium -mt-1 hidden sm:block">Cinema & TV Game Master</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Creator / TikTok Mode Toggle */}
          <button
            onClick={onToggleCreatorMode}
            title={isCreatorMode ? "Exit TikTok/Shorts Mode" : "Enter TikTok/Shorts 9:16 Mode"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              isCreatorMode
                ? 'bg-amber-500 text-black border-amber-400 shadow-md shadow-amber-500/30'
                : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
            }`}
          >
            {isCreatorMode ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5 text-amber-400" />}
            <span className="hidden sm:inline">{isCreatorMode ? 'Desktop View' : 'TikTok 9:16 Mode'}</span>
            <span className="sm:hidden">{isCreatorMode ? '16:9' : '9:16'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Home Button */}
          {currentMode !== 'menu' && (
            <button
              onClick={() => onNavigate('menu')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 border border-red-500/40 text-red-400 hover:bg-red-600/30 font-semibold text-xs transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Menu</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
