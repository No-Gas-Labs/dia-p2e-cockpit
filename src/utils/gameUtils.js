export const calculateXPMultiplier = (consecutiveBlessings) => {
  if (consecutiveBlessings < 3) return 1;
  if (consecutiveBlessings < 5) return 1.5;
  if (consecutiveBlessings < 10) return 2;
  return 3;
};

export const calculateLevel = (xp) => {
  return Math.floor(xp / 100) + 1;
};

export const getNextLevelXP = (xp) => {
  const level = calculateLevel(xp);
  return level * 100;
};

export const getProgressToNextLevel = (xp) => {
  const currentLevel = calculateLevel(xp);
  const currentLevelXP = (currentLevel - 1) * 100;
  const nextLevelXP = currentLevel * 100;
  const progress = xp - currentLevelXP;
  const total = nextLevelXP - currentLevelXP;
  
  return {
    progress,
    total,
    percentage: (progress / total) * 100
  };
};

export const formatTimeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

export const validateShrineBlessing = (blessing) => {
  return (
    blessing &&
    typeof blessing.shrine === 'number' &&
    blessing.shrine >= 1 &&
    blessing.shrine <= 3 &&
    typeof blessing.xp === 'number' &&
    blessing.xp > 0 &&
    typeof blessing.timestamp === 'number'
  );
};

export const calculateShrineStats = (blessings) => {
  const shrineStats = {
    1: { count: 0, totalXP: 0 },
    2: { count: 0, totalXP: 0 },
    3: { count: 0, totalXP: 0 }
  };

  blessings.forEach(blessing => {
    if (validateShrineBlessing(blessing)) {
      const shrine = blessing.shrine;
      shrineStats[shrine].count++;
      shrineStats[shrine].totalXP += blessing.xp;
    }
  });

  return shrineStats;
};

export const getBlessingStreak = (blessings) => {
  if (blessings.length === 0) return 0;
  
  let streak = 1;
  const sortedBlessings = [...blessings].sort((a, b) => b.timestamp - a.timestamp);
  
  for (let i = 1; i < sortedBlessings.length; i++) {
    const timeDiff = sortedBlessings[i - 1].timestamp - sortedBlessings[i].timestamp;
    if (timeDiff <= 60000) { // Within 1 minute
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
};