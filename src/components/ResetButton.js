import React from 'react';

const ResetButton = ({ onReset }) => {
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the game? This will clear all progress.')) {
      onReset();
    }
  };

  return (
    <button className="reset-btn" onClick={handleReset}>
      Reset Game
    </button>
  );
};

export default ResetButton;