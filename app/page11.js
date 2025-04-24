import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import BasePage from './BasePage';
import DumbShark from '../components/dumbshark';
import SpeechBubble from '../components/SpeechBubble';
import BackDrop from '../components/BackDropPage15';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import { ThemedText } from '../components/ThemedText';
import SharkWrapper from '../components/SharkWrapper';
import TypewriterText from '../components/TypewriterText';
import Goggles from '../components/goggles';
import Seaweed from '../components/Seaweed';

export default function Page11() {
  // State for tracking current image and what shark says
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Messages for the initial speech bubble to cycle through
  const messages = [
    "Now that I have been trained, lets try to identify something!",
    "Scanning...",
    "Hmmm..\nI see a Whale!",
  ];
  
  // Messages for after shark moves to seaweed
  const seaweedMessages = [
    "Let me check if it's actually a whale",
    "Ummmm... That was embarrassing! This is seaweed...",
    "We need to do more training!"
  ];
  
  // State for scanning animation
  const [isScanning, setIsScanning] = useState(false);
  const scanLinePosition = useRef(new Animated.Value(0)).current;
  
  // State to track the current message indices
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentSeaweedMessageIndex, setCurrentSeaweedMessageIndex] = useState(0);
  
  // State to track if the shark has moved to seaweed
  const [sharkMovedToSeaweed, setSharkMovedToSeaweed] = useState(false);
  
  // State to track if the shark is visible
  const [sharkVisible, setSharkVisible] = useState(false);
  
  // State to track if goggles are visible
  const [gogglesVisible, setGogglesVisible] = useState(true);
  
  // Timer ref to track and clear the interval
  const timerRef = useRef(null);
  
  // Flag to track if user manually interacted
  const [userInteracted, setUserInteracted] = useState(false);

  // Images array
  const images = ['fish.jpg', 'shark1.jpg', 'shark2.jpg', 'turtle.jpg', 'whale.jpg'];
  
  // Effect to update the image periodically
  useEffect(() => {
    // Pick a random image only once when component mounts
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImageIndex(randomIndex);

    // No interval or timeout needed, just set once
  }, []); // Empty dependency array means this runs once on mount
  
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
        
        // Set a timeout to move the shark to seaweed after another delay
        setTimeout(() => {
          // Set shark moved to seaweed to true which will trigger animation
          setSharkMovedToSeaweed(true);
        }, 1000); // Delay before moving to seaweed
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
  
  // Function to handle seaweed speech bubble click
  const handleSeaweedSpeechBubbleClick = () => {
    if (currentSeaweedMessageIndex < seaweedMessages.length - 1) {
      setCurrentSeaweedMessageIndex(currentSeaweedMessageIndex + 1);
    }
  };

  // Define seaweed positions
  const seaweedPositions = [
    { bottom: 0, left: 730, scale: 1.2, rotation: 0 },
    { bottom: 0, left: 540, scale: 0.8, rotation: 5 },
    { bottom: 0, left: 700, scale: 1.0, rotation: -5 },
    { bottom: 0, left: 900, scale: 1.3, rotation: 3 },
  ];

  // Calculate the scan line's transform based on animation value
  const scanLineTransform = scanLinePosition.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 450]
  });

  const description = (
    <View style={styles.container}>
      {/* Main content */}
      <View style={styles.mainContent}>
        {/* Shark Section - only visible when needed */}
        <View style={styles.sharkSection}>
          {/* Shark Container */}
          <View style={[
            styles.sharkContainer,
            sharkVisible && styles.sharkVisible,
            sharkMovedToSeaweed && styles.sharkMovedToSeaweed
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
        {!sharkMovedToSeaweed && (
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
        
        {/* Second Speech Bubble - only visible after shark has moved */}
        {sharkMovedToSeaweed && (
          <TouchableOpacity 
            style={styles.secondSpeechBubbleContainer}
            onPress={handleSeaweedSpeechBubbleClick}
            activeOpacity={0.8}
          >
            <SpeechBubble scale={1.5}>
              <TypewriterText
                key={currentSeaweedMessageIndex}
                text={seaweedMessages[currentSeaweedMessageIndex]}
                style={styles.bubbleText}
                typingSpeed={70}
              />
            </SpeechBubble>
          </TouchableOpacity>
        )}
        
        {/* Seaweed at the bottom of the scene with scanning effect when needed */}
        {seaweedPositions.map((position, index) => (
          <View 
            key={`seaweed-${index}`} 
            style={[
              styles.seaweedContainer,
              { 
                bottom: position.bottom,
                left: position.left,
                transform: [
                  { scale: position.scale },
                  { rotate: `${position.rotation}deg` }
                ]
              }
            ]}
          >
            <Seaweed />
            
            {/* Scanning effect on seaweed */}
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
        ))}
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Link href="/page9" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page12" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={11} title="Learning from Mistakes" description={description} />;
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
  // Style for when the shark has moved to the seaweed
  sharkMovedToSeaweed: {
    marginTop: 50,
    left: 0, // Position near seaweed
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
    right: 330, // Position near where shark will be after moving
    bottom: 350, // Adjust as needed
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
  seaweedContainer: {
    position: 'absolute',
    zIndex: 1,
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
    left: -20,
    right: -20,
    height: 4,
    backgroundColor: '#00ff00', // Green scanning line
    zIndex: 6,
    shadowColor: '#00ff00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  // Target box around seaweed
  targetBox: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    borderWidth: 2,
    borderColor: '#00ff00',
    borderStyle: 'dashed',
    borderRadius: 5,
    zIndex: 5,
  },
  // Beams from goggles to seaweed
  goggleBeams: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 500,
    bottom: 0,
    zIndex: 2,
  },
  beam: {
    position: 'absolute',
    top: 60,
    right: -400,
    width: 400,
    height: 50,
    backgroundColor: 'rgba(0, 255, 0, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 0, 0.5)',
    transform: [{ rotate: '10deg' }],
    zIndex: 2,
  },
});