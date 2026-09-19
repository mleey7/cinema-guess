import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MainMenu } from './components/MainMenu';
import { LocalParty } from './components/LocalParty';
import { OnlineParty } from './components/OnlineParty';
import { SoloGame } from './components/SoloGame';
import { DailyChallenge } from './components/DailyChallenge';
import { StatsLeaderboard } from './components/StatsLeaderboard';
import { GameMode } from './types';
import { soundFx } from './utils/audio';
import { API_BASE } from './socket';

export const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<GameMode>('menu');
  const [isCreatorMode, setIsCreatorMode] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(soundFx.getIsMuted());
  const [characterCount, setCharacterCount] = useState<number>(60);

  useEffect(() => {
    fetch(`${API_BASE}/api/health`)
      .then(res => res.json())
      .then(data => {
        if (data?.characterCount) setCharacterCount(data.characterCount);
      })
      .catch(() => {});
  }, []);

  const handleToggleMute = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleCreatorMode = () => {
    setIsCreatorMode(!isCreatorMode);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08080c] text-white">
      {/* Top Navbar */}
      <Navbar
        currentMode={currentMode}
        onNavigate={setCurrentMode}
        isCreatorMode={isCreatorMode}
        onToggleCreatorMode={handleToggleCreatorMode}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Container */}
      <main className="flex-1 flex flex-col items-center justify-start w-full">
        {isCreatorMode ? (
          /* TikTok / Creator 9:16 Phone Overlay */
          <div className="my-4 w-full max-w-[420px] min-h-[750px] bg-[#0c0d14] border-4 border-amber-500/50 rounded-[40px] shadow-2xl shadow-amber-500/10 overflow-hidden flex flex-col relative">
            <div className="bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest text-center py-1 flex items-center justify-center gap-1">
              <span>📱 TIKTOK / SHORTS 9:16 CREATOR MODE</span>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {currentMode === 'menu' && <MainMenu onSelectMode={setCurrentMode} characterCount={characterCount} />}
              {currentMode === 'local_party' && <LocalParty />}
              {currentMode === 'online_party' && <OnlineParty />}
              {currentMode === 'solo' && <SoloGame />}
              {currentMode === 'daily' && <DailyChallenge />}
              {currentMode === 'leaderboard' && <StatsLeaderboard />}
            </div>
          </div>
        ) : (
          /* Full Responsive Viewport */
          <div className="w-full flex-1">
            {currentMode === 'menu' && <MainMenu onSelectMode={setCurrentMode} characterCount={characterCount} />}
            {currentMode === 'local_party' && <LocalParty />}
            {currentMode === 'online_party' && <OnlineParty />}
            {currentMode === 'solo' && <SoloGame />}
            {currentMode === 'daily' && <DailyChallenge />}
            {currentMode === 'leaderboard' && <StatsLeaderboard />}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-white/5 text-center text-xs text-gray-500">
        <p>🎬 Cinema Guess Master • Playable on Discord Screen Share & Mobile</p>
      </footer>
    </div>
  );
};

export default App;
