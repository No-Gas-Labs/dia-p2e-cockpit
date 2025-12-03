import React, { useState, useRef } from 'react';

const ProfileManager = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [username, setUsername] = useState('Player');
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size must be less than 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
        // Save to localStorage for persistence
        localStorage.setItem('userProfilePicture', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUsernameChange = (newUsername) => {
    setUsername(newUsername);
    localStorage.setItem('username', newUsername);
  };

  const handleRemovePicture = () => {
    setProfilePicture(null);
    localStorage.removeItem('userProfilePicture');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Load saved profile on mount
  React.useEffect(() => {
    const savedPicture = localStorage.getItem('userProfilePicture');
    const savedUsername = localStorage.getItem('username');
    
    if (savedPicture) {
      setProfilePicture(savedPicture);
    }
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  return (
    <div className="profile-manager">
      <div className="profile-header">
        <div className="profile-picture-container">
          {profilePicture ? (
            <img 
              src={profilePicture} 
              alt="Profile" 
              className="profile-picture"
              onClick={() => setIsEditing(true)}
            />
          ) : (
            <div 
              className="profile-picture-placeholder"
              onClick={() => fileInputRef.current?.click()}
            >
              <span className="profile-icon">👤</span>
              <span className="upload-text">Upload Photo</span>
            </div>
          )}
          
          {isEditing && (
            <div className="profile-edit-overlay">
              <button 
                className="edit-btn change-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                📷 Change
              </button>
              {profilePicture && (
                <button 
                  className="edit-btn remove-btn"
                  onClick={handleRemovePicture}
                >
                  🗑️ Remove
                </button>
              )}
              <button 
                className="edit-btn close-btn"
                onClick={() => setIsEditing(false)}
              >
                ✖️
              </button>
            </div>
          )}
        </div>
        
        <div className="username-section">
          {isEditing ? (
            <input
              type="text"
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              className="username-input"
              placeholder="Enter username"
              maxLength={20}
            />
          ) : (
            <h2 
              className="username-display"
              onClick={() => setIsEditing(true)}
            >
              {username}
            </h2>
          )}
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ProfileManager;