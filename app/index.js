import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import BasePage from './BasePage';
import { Link } from 'expo-router';
import ContinueButton from '../components/ContinueButton';
import DumbShark from '../components/dumbshark';
import SharkGif from '../components/SharkGif';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import SharkWrapper from '../components/SharkWrapper';

export default function Index() {
  // Define an array of messages to cycle through
  const messages = [
    "Ouch!!",
    "My name is Frankie the Shark! \n I bumped my head and forgot everything :(",
    "I need your help to\n find my shark family and relearn what wildlife in the ocean looks like.\n \n Will you join my adventure?"
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

    // Set new timer - messages advance but stop at the end
    timerRef.current = setInterval(() => {
      setCurrentMessageIndex(prevIndex => {
        // Only advance if not at the last message
        if (prevIndex < messages.length - 1) {
          return prevIndex + 1;
        }
        // If at the last message, clear the interval and stay there
        clearInterval(timerRef.current);
        return prevIndex;
      });
    }, 3000);
  };

  // Function to handle speech bubble click
  const handleSpeechBubbleClick = () => {
    // If at the last message, go back to the first
    // Otherwise, move to the next message
    setCurrentMessageIndex((prevIndex) => {
      if (prevIndex >= messages.length - 1) {
        return 0;
      }
      return prevIndex + 1;
    });

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
            <SharkGif />
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
        <Link href="/page2" asChild>
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