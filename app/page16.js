import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import BasePage from './BasePage';
import DumbShark from '../components/dumbshark';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import SharkWrapper from '../components/SharkWrapper';

export default function Page16() {
  // Define an array of messages to cycle through
  const messages = [
    "The goggles are so smart now! I  finally found my family!",
    "The training and testing we did is similar to Computer Vision Models!",
    "Computer vision helps identify objects in images, like sharks!",
    "Thanks for learning with me about AI and computer vision!"
  ];
  
  // State to track the current message index
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  // Timer ref to track and clear the interval
  const timerRef = useRef(null);
  
  // Flag to track if user manually interacted
  const [userInteracted, setUserInteracted] = useState(false);
  
  // Setup and clear interval on component mount/unmount
  useEffect(() => {
    // Start the timer for auto-advancing messages
    startAutoAdvanceTimer();
    
    // Cleanup function to clear the timer when component unmounts
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []); // Empty dependency array means this runs once on mount
  
  // Reset the timer whenever the message changes due to user interaction
  useEffect(() => {
    // If user manually interacted, restart the timer
    if (userInteracted) {
      startAutoAdvanceTimer();
      setUserInteracted(false); // Reset the flag
    }
  }, [currentMessageIndex]);
  
  // Function to start the auto-advance timer
  const startAutoAdvanceTimer = () => {
    // Clear any existing timer first
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Set new timer - messages advance every 6.5 seconds
    timerRef.current = setInterval(() => {
      setCurrentMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
    }, 6500);
  };
  
  // Function to handle speech bubble click
  const handleSpeechBubbleClick = () => {
    // Move to the next message in the array, or loop back to the first message
    setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    
    // Mark as user interaction
    setUserInteracted(true);
    
    // Reset the timer when user clicks
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    startAutoAdvanceTimer();
  };

  // Define multiple shark positions - centered more in the view
  const sharkPositions = [
    { top: 0, left: 350, scale: 1, rotation: 0 },      // Main shark in center
    { top: 150, left: 200, scale: 0.8, rotation: 15 },   // Top left
    { top: 0, left: -200, scale: 0.7, rotation: -10 },  // Bottom right
    { top: 180, left: 450, scale: 0.6, rotation: 5 },    // Top right
    { top: 80, left: -50, scale: 0.9, rotation: -5 },   // Bottom left
    { top: 50, left: 100, scale: 0.5, rotation: 20 },   // Small one near center
  ];

  const description = (
    <View style={styles.container}>
      {/* Main Content: Sharks and Speech Bubble */}
      <View style={styles.mainContent}>
        <View style={styles.sharkSection}>
          {/* Map through shark positions to create multiple sharks */}
          {sharkPositions.map((position, index) => (
            <View 
              key={`shark-${index}`} 
              style={[
                styles.sharkContainer,
                { 
                  top: position.top,
                  left: position.left,
                  transform: [
                    { scale: position.scale },
                    { rotate: `${position.rotation}deg` }
                  ]
                }
              ]}
            >
              <SharkWrapper>
                <DumbShark />
              </SharkWrapper>
            </View>
          ))}
        </View>
        {/* Speech Bubble - now wrapped in TouchableOpacity to make it clickable */}
        <TouchableOpacity 
          style={styles.speechBubbleContainer}
          onPress={handleSpeechBubbleClick}
          activeOpacity={0.8}
        >
          <SpeechBubble scale={1.8}>
            <TypewriterText
              key={currentMessageIndex}
              text={messages[currentMessageIndex]}
              style={styles.speechText}
              typingSpeed={70}
            />
          </SpeechBubble>
        </TouchableOpacity>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Link href="/page15" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page17" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={16} title="The End" description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  speechText: {
    fontSize: 36,
    textAlign: 'center',
    color: 'black',
    lineHeight: 44,
    fontWeight: '500',
  },
  sharkContainer: {
    position: 'absolute',
    zIndex: 1,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sharkSection: {
    flex: 1,
    position: 'relative',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechBubbleContainer: {
    position: 'absolute',
    right: 300,
    bottom: 300,
    zIndex: 10,
    width: 250,
  },
  speechBubbleImage: {
    width: '100%',
    height: 400,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
    zIndex: 20,
  },
});