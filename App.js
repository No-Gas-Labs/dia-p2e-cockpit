import React, { useEffect, useState } from 'react';
import './App.css';
import GameDashboard from './src/components/GameDashboard';
import useGameState from './src/hooks/useGameState';

function App() {
  const { xp, shrineBlessings, handleShrineBlessing, resetGame, getStats } = useGameState();
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    // Check for Phaser game instance
    const checkGame = () => {
      if (window.game && window.game.isActive()) {
        setGameActive(true);
      }
    };
    
    const interval = setInterval(checkGame, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = getStats();

  return (
    <GameDashboard 
      xp={xp}
      shrineBlessings={shrineBlessings}
      gameActive={gameActive}
      onResetGame={resetGame}
      onShrineBlessing={handleShrineBlessing}
      stats={stats}
    />
  );
}

export default App;