import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

const TypewriterText = ({ 
  text, 
  typingSpeed = 50,
  style = {},
  onComplete = () => {} 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else {
      onComplete();
    }
  }, [currentIndex, text, typingSpeed, onComplete]);

  return <Text style={style}>{displayedText}</Text>;
};

export default TypewriterText;