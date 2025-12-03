import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [xp, setXp] = useState(0);
  const [shrineBlessings, setShrineBlessings] = useState([]);
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    // Load Phaser game script
    const script = document.createElement('script');
    script.src = '/main.js';
    script.async = true;
    document.body.appendChild(script);

    // Set up callback for Phaser game
    if (window.setReactCallback) {
      window.setReactCallback(handleShrineBlessing);
    }

    // Check for Phaser game instance
    const checkGame = () => {
      if (window.game && window.game.isActive()) {
        setGameActive(true);
        // Set callback if game is ready
        if (window.setReactCallback) {
          window.setReactCallback(handleShrineBlessing);
        }
      }
    };
    
    const interval = setInterval(checkGame, 1000);
    
    return () => {
      clearInterval(interval);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handleShrineBlessing = (shrineNumber, xpGained) => {
    setXp(prev => prev + xpGained);
    setShrineBlessings(prev => [...prev, { shrine: shrineNumber, timestamp: Date.now(), xp: xpGained }]);
  };

  const resetGame = () => {
    setXp(0);
    setShrineBlessings([]);
    if (window.game) {
      window.game.scene.restart();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>DIA P2E Cockpit</h1>
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
        <button className="reset-btn" onClick={resetGame}>
          Reset Game
        </button>
      </header>
      
      <main className="game-container">
        <div id="phaser-game-container"></div>
      </main>
      
      <aside className="blessings-log">
        <h3>Recent Blessings</h3>
        <div className="blessings-list">
          {shrineBlessings.slice(-5).reverse().map((blessing, index) => (
            <div key={index} className="blessing-item">
              <span>Shrine {blessing.shrine}</span>
              <span>+{blessing.xp} XP</span>
              <span>{new Date(blessing.timestamp).toLocaleTimeString()}</span>
            </div>
          ))}
          {shrineBlessings.length === 0 && (
            <div className="no-blessings">No shrine blessings yet. Start exploring!</div>
          )}
        </div>
      </aside>
    </div>
  );
}

export default App;