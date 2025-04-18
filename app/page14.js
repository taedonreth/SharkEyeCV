import React, { useState, useEffect, useRef } from 'react';
import BasePage from './BasePage';
import DumbShark from '../components/dumbshark';
import SharkWrapper from '../components/SharkWrapper';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import ModelTestingCard from '../components/ModelTestingCard';

export default function Page14() {
  // Define messages for the speech bubble
  const sharkMessages = [
    "Let me explain how we test our model!",
    "Testing is important to make sure our model works!",
    "We need to check if the model can find sharks correctly!",
    "Click through the card to learn how testing works!"
  ];
  
  // State to track current message index
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
      setCurrentMessageIndex(prevIndex => (prevIndex + 1) % sharkMessages.length);
    }, 3500); // 3.5 seconds
  };
  
  // Function to handle speech bubble click
  const handleSpeechBubbleClick = () => {
    // Move to the next message in the array, or loop back to the first message
    setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % sharkMessages.length);
    
    // Mark as user interaction
    setUserInteracted(true);
    
    // Reset the timer when user clicks
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    startAutoAdvanceTimer();
  };

  const description = (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.mainContent}>
        <View style={styles.contentRow}>
          <View style={styles.leftContainer}>
            {/* Speech Bubble - now wrapped in TouchableOpacity to make it clickable */}
            <TouchableOpacity 
              style={styles.speechBubbleContainer}
              onPress={handleSpeechBubbleClick}
              activeOpacity={0.8}
            >
              <SpeechBubble scale={1.5}>
                <TypewriterText
                  key={currentMessageIndex}
                  text={sharkMessages[currentMessageIndex]}
                  style={styles.speechText}
                  typingSpeed={250}
                />
              </SpeechBubble>
            </TouchableOpacity>
            <View style={styles.sharkContainer}>
              <SharkWrapper>
                <DumbShark />
              </SharkWrapper>
            </View>
          </View>

          <View style={styles.rightContainer}>
            <View style={styles.textBoxContainer}>
              {/* Using our ModelTestingCard with auto-cycling property */}
              <ModelTestingCard />
            </View>
          </View>
        </View>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Link href="/page13" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page15" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={14} title="Model Testing Info" description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  sceneContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 10,
    position: 'relative',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  sharkContainer: {
    marginTop: 200,
    zIndex: 1,
    marginLeft: -340,
    transform: [{ scale: 0.9 }],
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: 180,
    left: 250,
    zIndex: 2,
    width: 250,
  },
  speechText: {
    fontSize: 36,
    textAlign: 'center',
    color: 'black',
    lineHeight: 44,
    fontWeight: '500',
  },
  textBoxContainer: {
    width: '90%',
    right: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});