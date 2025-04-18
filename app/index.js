import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import BasePage from './BasePage';
import { Link } from 'expo-router';
import ContinueButton from '../components/ContinueButton';
import DumbShark from '../components/dumbshark';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import SharkWrapper from '../components/SharkWrapper';

export default function Index() {
  // Define an array of messages to cycle through
  const messages = [
    "Can you help me!?!",
    "My name is Frankie the Shark! \n I lost my family while chasing some squid!",
    "I need your help to\n find my shark family!\n \n Will you join my adventure?"
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
    
    // Set new timer - messages advance every 3.5 seconds
    timerRef.current = setInterval(() => {
      setCurrentMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
    }, 6000); // 3.5 seconds
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

  const title = "Welcome";
  const description = (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.mainContent}>
        {/* Shark + Bubble in the same wrapper, using relative positioning */}
        <View style={styles.sharkBubbleWrapper}>
          {/* Wrap Shark in SharkWrapper for animation */}
          <SharkWrapper style={styles.sharkPosition}>
            <DumbShark />
          </SharkWrapper>

          {/* Speech Bubble - now wrapped in TouchableOpacity to make it clickable */}
          <TouchableOpacity 
            style={styles.speechBubbleContainer}
            onPress={handleSpeechBubbleClick}
            activeOpacity={0.8} // Slight opacity change when pressed
          >
            <SpeechBubble scale={2.2}>
              <TypewriterText
                key={currentMessageIndex} // Key changes force re-render of component
                text={messages[currentMessageIndex]}
                style={styles.speechText}
                typingSpeed={100}
              />
            </SpeechBubble>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer with the Continue button */}
      <View style={styles.footerContainer}>
        <Link href="/overview" asChild>
          <ContinueButton isNavigation={false} />
        </Link>
      </View>
    </View>
  );

  return (
    <BasePage
      pageNumber={1}
      title={title}
      description={description}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sharkBubbleWrapper: {
    width: 300,
    height: 160,
    position: 'relative',
    marginTop: 90,
  },
  sharkPosition: {
    marginLeft: -450,
    marginTop: 25,
    transform: [{ scale: 2 }],
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: -120,
    right: 0,
    width: 250,
    zIndex: 2,
  },
  speechText: {
    fontSize: 36,
    textAlign: 'center',
    color: 'black',
    lineHeight: 44,
    fontWeight: '500',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 120,
  },
});