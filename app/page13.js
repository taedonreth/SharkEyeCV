import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import BasePage from './BasePage';
import DumbShark from '../components/dumbshark';
import SpeechBubble from '../components/SpeechBubble';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import SharkWrapper from '../components/SharkWrapper';
import TypewriterText from '../components/TypewriterText';
import Goggles from '../components/goggles';
import Seaturtle from '../components/Seaturtle';
import GoggleShark from '../components/GoggleShark';

export default function Page13() {
  // Messages for the initial speech bubble to cycle through
  const messages = [
    "I am a lot smarter now! Let's try again!",
    "Scanning...",
    "Hmmm..\nI see a Turtle!",
  ];
  
  // Messages for after shark moves to turtle
  const turtleMessages = [
    "Let me check if it's actually a turtle",
    "Nice! After all that training! The goggles are so smart now!",
    "Let's put the goggles on and find my family!"
  ];
  
  // State for scanning animation
  const [isScanning, setIsScanning] = useState(false);
  const scanLinePosition = useRef(new Animated.Value(0)).current;
  
  // State to track the current message indices
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentTurtleMessageIndex, setCurrentTurtleMessageIndex] = useState(0);
  
  // State to track if the shark has moved to turtle
  const [sharkMovedToTurtle, setSharkMovedToTurtle] = useState(false);
  
  // State to track if the shark is visible
  const [sharkVisible, setSharkVisible] = useState(false);
  
  // State to track if goggles are visible
  const [gogglesVisible, setGogglesVisible] = useState(true);
  
  // State for final transformation
  const [showTransformation, setShowTransformation] = useState(false);
  const [transformationComplete, setTransformationComplete] = useState(false);
  const transformPosition = useRef(new Animated.Value(0)).current;
  
  // Timer ref to track and clear the interval
  const timerRef = useRef(null);
  
  // Flag to track if user manually interacted
  const [userInteracted, setUserInteracted] = useState(false);
  
  // Setup and clear interval for message cycling on component mount/unmount
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
  
  // Effect to start and stop scanning animation
  useEffect(() => {
    if (currentMessageIndex === 1) { // If we're on the "Scanning..." message
      setIsScanning(true);
      startScanAnimation();
    } else {
      setIsScanning(false);
      // Reset scan line position
      scanLinePosition.setValue(0);
      // Stop any ongoing animations
      scanLinePosition.stopAnimation();
    }
  }, [currentMessageIndex]);
  
  // Effect to handle transformation animation
  useEffect(() => {
    if (showTransformation) {
      // Start transformation animation
      Animated.timing(transformPosition, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
      }).start(() => {
        // After animation completes, show the GoggleShark
        setTransformationComplete(true);
      });
    }
  }, [showTransformation]);
  
  // Scanning animation function
  const startScanAnimation = () => {
    Animated.loop(
      Animated.sequence([
        // Move from top to bottom
        Animated.timing(scanLinePosition, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true
        }),
        // Reset to top
        Animated.timing(scanLinePosition, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        })
      ])
    ).start();
  };
  
  // Function to start the auto-advance timer
  const startAutoAdvanceTimer = () => {
    // Clear any existing timer first
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Set new timer - messages advance every 5 seconds
    timerRef.current = setInterval(() => {
      setCurrentMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
    }, 5000);
  };
  
  // Function to handle initial speech bubble click
  const handleSpeechBubbleClick = () => {
    // If we're at the last message in the array
    if (currentMessageIndex === messages.length - 1) {
      // First hide the goggles
      setGogglesVisible(false);
      
      // After a delay, make the shark appear
      setTimeout(() => {
        setSharkVisible(true);
        
        // Set a timeout to move the shark to turtle after another delay
        setTimeout(() => {
          // Set shark moved to turtle to true which will trigger animation
          setSharkMovedToTurtle(true);
        }, 1000); // Delay before moving to turtle
      }, 500); // Delay before showing shark
      
      // Clear the timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    } else {
      // Move to the next message in the array
      setCurrentMessageIndex((prevIndex) => prevIndex + 1);
      
      // Mark as user interaction
      setUserInteracted(true);
      
      // Reset the timer when user clicks
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      startAutoAdvanceTimer();
    }
  };
  
  // Function to handle turtle speech bubble click
  const handleTurtleSpeechBubbleClick = () => {
    if (currentTurtleMessageIndex < turtleMessages.length - 1) {
      setCurrentTurtleMessageIndex(currentTurtleMessageIndex + 1);
    } else if (currentTurtleMessageIndex === turtleMessages.length - 1 && !showTransformation) {
      // If we're at the last message and transformation hasn't started yet
      setShowTransformation(true);
    }
  };

  // Calculate the scan line's transform based on animation value
  const scanLineTransform = scanLinePosition.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 450]
  });
  
  // Calculate transforms for the final animation
  const sharkTransform = transformPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [-160, 0] // Move from current position to center
  });
  
  const gogglesTransform = transformPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [-500, 0] // Move from off-screen to center
  });
  
  const opacityTransform = transformPosition.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [1, 0.5, 0] // Fade out near the end
  });

  const description = (
    <View style={styles.container}>
      {/* Main content */}
      <View style={styles.mainContent}>
        {/* Final Transformed GoggleShark - only visible after transformation */}
        {transformationComplete && (
          <View style={styles.goggleSharkContainer}>
            <GoggleShark />
          </View>
        )}
        
        {/* Transformation animation elements - only visible during transformation */}
        {showTransformation && !transformationComplete && (
          <View style={styles.transformationContainer}>
            {/* Animated Shark */}
            <Animated.View style={[
              styles.transformingShark,
              {
                transform: [{ translateX: sharkTransform }],
                opacity: opacityTransform
              }
            ]}>
              <SharkWrapper>
                <DumbShark />
              </SharkWrapper>2
            </Animated.View>
            
            {/* Animated Goggles - smaller size */}
            <Animated.View style={[
              styles.transformingGoggles,
              {
                transform: [{ translateX: gogglesTransform }],
                opacity: opacityTransform
              }
            ]}>
              <View style={{ transform: [{ scale: 0.3 }, { scaleX: -1 }] }}>
                <Goggles />
              </View>
            </Animated.View>
          </View>
        )}
      
        {/* Only show these elements if transformation not happening/complete */}
        {!showTransformation && (
          <>
            {/* Shark Section - only visible when needed */}
            <View style={styles.sharkSection}>
              {/* Shark Container */}
              <View style={[
                styles.sharkContainer,
                sharkVisible && styles.sharkVisible,
                sharkMovedToTurtle && styles.sharkMovedToTurtle
              ]}>
                <SharkWrapper>
                  <DumbShark />
                </SharkWrapper>
              </View>
              
              {/* Separate Goggles container */}
              <View style={[
                styles.gogglesContainer,
                !gogglesVisible && styles.gogglesHidden
              ]}>
                <Goggles />
              </View>
            </View>
            
            {/* Initial Speech Bubble - only visible when shark hasn't moved */}
            {!sharkMovedToTurtle && (
              <TouchableOpacity 
                style={styles.speechBubbleContainer}
                onPress={handleSpeechBubbleClick}
                activeOpacity={0.8}
              >
                <SpeechBubble scale={1.8}>
                  <TypewriterText
                    key={currentMessageIndex}
                    text={messages[currentMessageIndex]}
                    style={styles.bubbleText}
                    typingSpeed={70}
                  />
                </SpeechBubble>
              </TouchableOpacity>
            )}
            
            {/* Single Sea Turtle */}
            <View style={styles.turtleContainer}>
              <Seaturtle />
              
              {/* Scanning effect on turtle */}
              {isScanning && (
                <View style={styles.scanOverlay}>
                  <Animated.View 
                    style={[
                      styles.scanLine,
                      { transform: [{ translateY: scanLineTransform }] }
                    ]}
                  />
                  <View style={styles.targetBox} />
                </View>
              )}
            </View>
          </>
        )}
        
        {/* Second Speech Bubble - only visible after shark has moved but before transformation */}
        {sharkMovedToTurtle && !showTransformation && (
          <TouchableOpacity 
            style={styles.secondSpeechBubbleContainer}
            onPress={handleTurtleSpeechBubbleClick}
            activeOpacity={0.8}
          >
            <SpeechBubble scale={1.5}>
              <TypewriterText
                key={currentTurtleMessageIndex}
                text={turtleMessages[currentTurtleMessageIndex]}
                style={styles.bubbleText}
                typingSpeed={70}
              />
            </SpeechBubble>
          </TouchableOpacity>
        )}
        
        {/* Final Speech Bubble - after transformation */}
        {transformationComplete && (
          <View style={styles.finalSpeechBubbleContainer}>
            <SpeechBubble scale={1.5}>
              <TypewriterText
                text="Now I can see clearly! Time to find my family!"
                style={styles.bubbleText}
                typingSpeed={70}
              />
            </SpeechBubble>
          </View>
        )}
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Link href="/page12" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page15" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={13} title="Learning from Mistakes - Part 2" description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  sharkContainer: {
    position: 'absolute',
    marginTop: 200,
    left: -1000, // Start off-screen to the left
    transform: [{ scale: 1.3 }],
    opacity: 0, // Initially invisible
    transition: 'all 1.5s ease-in-out', // Add transition for smooth movement
    zIndex: 2,
  },
  // Style for when shark becomes visible
  sharkVisible: {
    left: -200, // Initial visible position (same as before)
    opacity: 1, // Now visible
  },
  // Style for when the shark has moved to turtle
  sharkMovedToTurtle: {
    marginTop: 50,
    left: -160, // Position near turtle
    opacity: 1, // Ensure it's visible
    transform: [
      { scale: 1.3 },
      { scaleX: 1 }, // Face original direction
    ],
  },
  sharkSection: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    right: 50,
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  gogglesContainer: {
    position: 'absolute',
    zIndex: 3,
    top: 120,
    left: -370,
    transform: [
      { scaleX: -1 },
      { scale: 0.6 }
    ],
    opacity: 1, // Start visible
    transition: 'opacity 0.5s ease-out', // Quick fade-out
  },
  // Style for hiding goggles
  gogglesHidden: {
    opacity: 0,
  },
  speechBubbleContainer: {
    position: 'absolute',
    right: 730,
    bottom: 300,
    zIndex: 2,
    width: 250,
  },
  // New container for the second speech bubble that appears after shark moves
  secondSpeechBubbleContainer: {
    position: 'absolute',
    right: 500, // Position near where shark will be after moving
    bottom: 350, // Adjust as needed
    zIndex: 2,
    width: 250,
  },
  // Final speech bubble after transformation
  finalSpeechBubbleContainer: {
    position: 'absolute',
    right: 300,
    bottom: 350,
    zIndex: 2,
    width: 250,
  },
  bubbleText: {
    fontSize: 36,
    textAlign: 'center',
    color: 'black',
    lineHeight: 44,
    fontWeight: '500',
  },
  turtleContainer: {
    position: 'absolute',
    zIndex: 1,
    right: 100,
    bottom: -100,
    transform: [{ scale: .7 }],
    overflow: 'visible',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
  // Scanning animation styles
  scanOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    zIndex: 5,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#00ff00', // Green scanning line
    zIndex: 6,
    shadowColor: '#00ff00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  // Target box around turtle
  targetBox: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    bottom: 80,
    borderWidth: 5,
    borderColor: '#00ff00',
    borderStyle: 'dashed',
    borderRadius: 5,
    zIndex: 5,
  },
  // Transformation animation styles
  transformationContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  transformingShark: {
    position: 'absolute',
    transform: [{ scale: 1.3 }],
  },
  transformingGoggles: {
    position: 'absolute',
    top: -30,
    zIndex: 11,
  },
  // GoggleShark container
  goggleSharkContainer: {
    position: 'absolute',
    zIndex: 10,
    transform: [{ scale: 0.9 }],
  }
});