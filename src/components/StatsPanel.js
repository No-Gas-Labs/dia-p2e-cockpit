import React from 'react';

const StatsPanel = ({ xp, shrineBlessings, gameActive }) => {
  return (
    <div className="stats-panel">
      <div className="stat-item">
        <span className="stat-label">Total XP:</span>
        <span className="stat-value">{xp}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Shrines Blessed:</span>
        <span className="stat-value">{shrineBlessings.length}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Game Status:</span>
        <span className={`stat-value ${gameActive ? 'active' : 'inactive'}`}>
          {gameActive ? 'Active' : 'Loading'}
        </span>
      </div>
    </div>
  );
};

export default StatsPanel;