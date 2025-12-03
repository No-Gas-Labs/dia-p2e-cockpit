import React, { useEffect } from 'react';
import useGameIntegration from '../hooks/useGameIntegration';

const GameContainer = ({ onShrineBlessing }) => {
  const { gameActive, initializeGame } = useGameIntegration(onShrineBlessing);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return (
    <div id="phaser-game-container">
      {gameActive ? null : (
        <div className="game-loading">
          <div className="loading-spinner"></div>
          <p>Initializing game engine...</p>
        </div>
      )}
    </div>
  );
};

export default GameContainer;