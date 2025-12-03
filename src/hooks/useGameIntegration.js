import { useState, useEffect } from 'react';

const useGameIntegration = (onShrineBlessing) => {
  const [gameActive, setGameActive] = useState(false);

  const initializeGame = () => {
    // Load Phaser game script if not already loaded
    if (!document.querySelector('script[src*="main.js"]')) {
      const script = document.createElement('script');
      script.src = '/main.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // Set up callback for Phaser game
    const setupCallback = () => {
      if (window.setReactCallback) {
        window.setReactCallback(onShrineBlessing);
      }
    };

    // Check for Phaser game instance
    const checkGame = () => {
      if (window.game && window.game.isActive()) {
        setGameActive(true);
        setupCallback();
      }
    };

    // Initial setup
    setupCallback();
    
    // Poll for game initialization
    const interval = setInterval(checkGame, 1000);
    
    // Cleanup
    return () => {
      clearInterval(interval);
    };
  };

  const resetGame = () => {
    if (window.game) {
      window.game.scene.restart();
    }
    setGameActive(false);
    // Re-initialize after a short delay
    setTimeout(initializeGame, 100);
  };

  return {
    gameActive,
    initializeGame,
    resetGame
  };
};

export default useGameIntegration;