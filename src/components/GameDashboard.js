import React from 'react';
import StatsPanel from './StatsPanel';
import GameContainer from './GameContainer';
import BlessingsLog from './BlessingsLog';
import ResetButton from './ResetButton';

const GameDashboard = ({ 
  xp, 
  shrineBlessings, 
  gameActive, 
  onResetGame,
  onShrineBlessing 
}) => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>DIA P2E Cockpit</h1>
        <StatsPanel 
          xp={xp}
          shrineBlessings={shrineBlessings}
          gameActive={gameActive}
        />
        <ResetButton onReset={onResetGame} />
      </header>
      
      <main className="game-container">
        <GameContainer onShrineBlessing={onShrineBlessing} />
      </main>
      
      <aside className="blessings-log">
        <BlessingsLog shrineBlessings={shrineBlessings} />
      </aside>
    </div>
  );
};

export default GameDashboard;