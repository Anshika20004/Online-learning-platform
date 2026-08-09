import React, { createContext, useState, useContext, useEffect } from 'react';

const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
  const [mood, setMood] = useState('normal'); // 'low_energy', 'normal', 'high_focus'
  const [isMoodModalOpen, setIsMoodModalOpen] = useState(false);
  const [isBoostMode, setIsBoostMode] = useState(false);
  const [showBoostEntry, setShowBoostEntry] = useState(false);
  const [showBoostComplete, setShowBoostComplete] = useState(false);

  // Load from local storage if exists
  useEffect(() => {
    const savedMood = localStorage.getItem('user_mood');
    if (savedMood) {
      setMood(savedMood);
    } else {
      // If no mood is set, pop it up a few seconds after they land
      const timer = setTimeout(() => {
        setIsMoodModalOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const changeMood = (newMood) => {
    setMood(newMood);
    localStorage.setItem('user_mood', newMood);
    setIsMoodModalOpen(false);
    
    // Trigger Boost Entry popup automatically if low energy is selected
    if (newMood === 'low_energy') {
      setShowBoostEntry(true);
    } else {
      setIsBoostMode(false); // Cancel boost if normal or high focus selected
    }
  };

  return (
    <MoodContext.Provider value={{ 
      mood, 
      changeMood, 
      isMoodModalOpen, 
      setIsMoodModalOpen,
      isBoostMode,
      setIsBoostMode,
      showBoostEntry,
      setShowBoostEntry,
      showBoostComplete,
      setShowBoostComplete
    }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};
