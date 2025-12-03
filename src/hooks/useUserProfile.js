import { useState, useEffect } from 'react';

const useUserProfile = () => {
  const [profile, setProfile] = useState({
    username: 'Player',
    profilePicture: null,
    level: 1,
    joinDate: Date.now()
  });

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfile(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    }

    // Load profile picture separately
    const savedPicture = localStorage.getItem('userProfilePicture');
    if (savedPicture) {
      setProfile(prev => ({ ...prev, profilePicture: savedPicture }));
    }
  }, []);

  const updateProfile = (updates) => {
    const newProfile = { ...profile, ...updates };
    setProfile(newProfile);
    
    // Save to localStorage
    const toSave = { ...newProfile };
    if (toSave.profilePicture) {
      // Save picture separately
      localStorage.setItem('userProfilePicture', toSave.profilePicture);
      delete toSave.profilePicture;
    }
    localStorage.setItem('userProfile', JSON.stringify(toSave));
  };

  const setProfilePicture = (pictureData) => {
    updateProfile({ profilePicture: pictureData });
    localStorage.setItem('userProfilePicture', pictureData);
  };

  const setUsername = (username) => {
    updateProfile({ username });
  };

  const removeProfilePicture = () => {
    updateProfile({ profilePicture: null });
    localStorage.removeItem('userProfilePicture');
  };

  const clearProfile = () => {
    setProfile({
      username: 'Player',
      profilePicture: null,
      level: 1,
      joinDate: Date.now()
    });
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userProfilePicture');
  };

  return {
    profile,
    updateProfile,
    setProfilePicture,
    setUsername,
    removeProfilePicture,
    clearProfile
  };
};

export default useUserProfile;