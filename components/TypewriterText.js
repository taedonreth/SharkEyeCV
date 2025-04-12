import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

const TypewriterText = ({
  text,
  typingSpeed = 100,
  style = {},
  onComplete = () => { }
}) => {
  const [displayedWordCount, setDisplayedWordCount] = useState(0);
  const words = text.split(/\s+/);

  // Create a full-width placeholder with the final text but make it transparent
  const renderFullWidthPlaceholder = () => {
    return (
      <Text style={[style, { color: 'transparent', position: 'absolute' }]}>
        {text}
      </Text>
    );
  };

  // Render only the words that should be visible so far
  const renderVisibleText = () => {
    return (
      <Text style={style}>
        {words.slice(0, displayedWordCount).join(' ')}
        {displayedWordCount > 0 && displayedWordCount < words.length ? ' ' : ''}
      </Text>
    );
  };

  useEffect(() => {
    // Reset when text changes
    setDisplayedWordCount(0);
  }, [text]);

  useEffect(() => {
    if (displayedWordCount < words.length) {
      const timeout = setTimeout(() => {
        setDisplayedWordCount(count => count + 1);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else {
      onComplete();
    }
  }, [displayedWordCount, words.length, typingSpeed, onComplete]);

  return (
    <View style={{ position: 'relative' }}>
      {renderFullWidthPlaceholder()}
      {renderVisibleText()}
    </View>
  );
};

export default TypewriterText;