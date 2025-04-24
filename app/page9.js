import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import BasePage from './BasePage';
import SharkIcon from '../components/SharkIcon'; // Using SharkIcon as requested
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import SharkFramingGame from '../components/SharkFramingGame';
import Goggles from '../components/goggles';

export default function CombinedPage() {
  // States for the component
  const [showGame, setShowGame] = useState(false);
  const [demoStage, setDemoStage] = useState(0);
  const [gogglesFlipped, setGogglesFlipped] = useState(false);
  const [showText, setShowText] = useState(true); // New state for controlling speech bubble text visibility
  
  // Auto-start the demo when component mounts
  useEffect(() => {
    // Short delay before showing the box
    const timer = setTimeout(() => {
      handleDemoStage();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animation values
  const zoomAnim = useRef(new Animated.Value(1)).current;
  const boxOpacity = useRef(new Animated.Value(0)).current;
  const boxSize = useRef(new Animated.Value(60)).current; // Increased box size from 30 to 60
  const viewportVisible = useRef(new Animated.Value(1)).current;
  const boxAreaVisible = useRef(new Animated.Value(0)).current; // New animated value for box area
  
  // Box position and clipping area - adjust these to position the box on the fin
  const boxPositionRight = 50; // The right position of the box
  const boxPositionTop = 70;   // The top position of the box
  
  // Original shark position - we need these to calculate the zoomed view offsets
  const sharkPositionLeft = 100;
  const sharkPositionTop = 70;
  
  // Messages for each demo stage
  const demoMessages = [
    "Let me try to identify the shark...", // Initial message
    "I can't identify anything with this....", // After box appears
    "Help me capture the whole creature so I can see better! \n Click to try the game." // Final message
  ];
  
  // Function to toggle goggles orientation
  const toggleGogglesOrientation = () => {
    setGogglesFlipped(!gogglesFlipped);
  };
  
  // Function to reset animations
  const resetAnimations = () => {
    zoomAnim.setValue(1);
    boxOpacity.setValue(0);
    boxAreaVisible.setValue(0); // Reset box area visibility
    boxSize.setValue(60); // Updated box size value to match initial value
    viewportVisible.setValue(1);
    setDemoStage(0);
    setShowText(true); // Make sure text is visible when resetting
  };
  
  // Handle start demo button click - just shows first message
  const handleStartDemo = () => {
    resetAnimations();
    setDemoStage(0);
  };
  
  // Handle starting the game
  const handleStartGame = () => {
    setShowGame(true);
  };
  
  // Handle returning from game to demo
  const handleBackToDemo = () => {
    setShowGame(false);
    resetAnimations();
  };
  
  // Function to handle the different stages of the demo
  const handleDemoStage = () => {
    // What happens depends on current demo stage
    switch(demoStage) {
      case 0:
        // First stage - Show the targeting box on the fin and zoom in
        Animated.timing(boxOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false
        }).start(() => {
          // Start zoom animation immediately
          Animated.parallel([
            // Zoom in on the targeting box
            Animated.timing(zoomAnim, {
              toValue: 8, // Medium zoom level for first stage
              duration: 1500, // Slower zoom for first transition
              useNativeDriver: true
            }),
            // Slightly fade in the box area
            Animated.timing(boxAreaVisible, {
              toValue: 0.5, // Partially visible
              duration: 800,
              useNativeDriver: false
            }),
            // Slightly fade out the viewport
            Animated.timing(viewportVisible, {
              toValue: 0.9, // Still mostly visible
              duration: 800,
              useNativeDriver: false
            })
          ]).start();
          
          // First hide the current text
          setShowText(false);
          
          // Wait a moment before showing new text and advancing stage
          setTimeout(() => {
            setDemoStage(1);
            // Show text after slight delay to ensure smooth transition
            setTimeout(() => {
              setShowText(true);
            }, 300);
          }, 1000); // 1.5 second delay before showing new text
        });
        break;
        
      case 1:
        // Second stage - No additional zoom, just text change
        // First hide the current text
        setShowText(false);
        
        // Wait a moment before showing new text and advancing stage
        setTimeout(() => {
          setDemoStage(2);
          // Show text after slight delay to ensure smooth transition
          setTimeout(() => {
            setShowText(true);
          }, 300);
        }, 1000); // 1.5 second delay before showing new text
        break;
        
      case 2:
        // Final stage - Reset the animation and go to game
        handleStartGame();
        break;
        
      default:
        resetAnimations();
        break;
    }
  };
  
  // Render the demo view (Page 9)
  const renderDemoContent = () => (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        {/* Speech Bubble - Make it clickable to progress through the demo */}
        <TouchableOpacity 
          style={styles.speechBubbleContainer}
          onPress={handleDemoStage}
          activeOpacity={0.8}
        >
          <SpeechBubble scale={1.5}>
            {showText && (
              <TypewriterText
                key={demoStage} // Force re-render when stage changes
                text={demoMessages[demoStage]}
                style={styles.speechText}
                typingSpeed={70}
              />
            )}
          </SpeechBubble>
        </TouchableOpacity>
        
        {/* Goggles (Positioned above the shark) - no longer clickable */}
        <View style={styles.gogglesContainer}>
          <View style={[
            styles.gogglesWrapper, 
            { transform: [{ scaleX: -1 }, { scale: 0.8 }] }
          ]}>
            <Goggles />
          </View>
        </View>
        
        {/* Whole Shark Container - will be zoomed and then partially hidden */}
        <Animated.View
          style={[
            styles.viewportContainer,
            {
              opacity: viewportVisible, // This will fade out the whole shark but not completely
              transform: [
                { scale: zoomAnim }, // This will zoom in
              ]
            }
          ]}
        >
          {/* SharkIcon in its own container */}
          <View style={styles.sharkIconContainer}>
            <SharkIcon />
          </View>
          
          {/* Small targeting box on the fin that will remain visible */}
          <Animated.View 
            style={[
              styles.targetBox,
              {
                opacity: boxOpacity,
                width: boxSize,
                height: boxSize,
                borderColor: '#FF0000',
                // Position the box on the fin of the shark
                top: boxPositionTop,
                right: boxPositionRight,
                zIndex: 5
              }
            ]}
          />
        </Animated.View>
        
        {/* Box Area Only - This will become visible as shark fades out */}
        <Animated.View
          style={[
            styles.boxAreaContainer,
            {
              opacity: boxAreaVisible, // Use the new animated value for box area
              transform: [
                { scale: zoomAnim }, // Keep same zoom level as shark
              ]
            }
          ]}
        >
          {/* This is a clipped version of the shark that only shows the fin area */}
          <View style={styles.boxAreaContent}>
            {/* SharkIcon positioned to show only the fin in the zoomed view */}
            <View style={[
              styles.finCloseupContainer,
              {
                // Position shark to align exactly with the main shark view
                left: sharkPositionLeft,
                top: sharkPositionTop,
                transform: [
                  // No additional transform needed - we'll let the container's zoom handle it
                  // This ensures the shark stays in exactly the same position in both views
                ]
              }
            ]}>
              <SharkIcon />
            </View>
            
            {/* Keep the targeting box visible in exactly the same position */}
            <View 
              style={[
                styles.targetBox,
                {
                  width: boxSize.__getValue(),
                  height: boxSize.__getValue(),
                  borderColor: '#FF0000',
                  position: 'absolute',
                  top: boxPositionTop,
                  right: boxPositionRight,
                  zIndex: 5
                }
              ]}
            />
          </View>
        </Animated.View>
        
        {/* Action Buttons - Now empty since we removed the Start Demo button */}
        <View style={styles.buttonContainer}>
          {/* Button removed */}
        </View>
      </View>
      
      {/* Footer with Navigation Buttons */}
      <View style={styles.footerContainer}>
        <View style={styles.backButtonContainer}>
          <Link href="/page8" asChild>
            <BackButton isNavigation={true} />
          </Link>
        </View>
        <View style={styles.continueButtonContainer}>
          <Link href="/page11" asChild>
            <ContinueButton isNavigation={true} />
          </Link>
        </View>
      </View>
    </View>
  );

  // Render the game view (Page 10)
  const renderGameContent = () => (
    <View style={styles.container}>
      {/* Game Component */}
      <View style={styles.gameSection}>
        <SharkFramingGame />
      </View>
      
      {/* Back to Demo Button */}
      <View style={styles.backToDemoContainer}>
        <TouchableOpacity
          style={styles.backToDemoButton}
          onPress={handleBackToDemo}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
      
      {/* Footer with Navigation Buttons */}
      <View style={styles.footerContainer}>
        <View style={styles.backButtonContainer}>
          <Link href="/page8" asChild>
            <BackButton isNavigation={true} />
          </Link>
        </View>
        <View style={styles.continueButtonContainer}>
          <Link href="/page11" asChild>
            <ContinueButton isNavigation={true} />
          </Link>
        </View>
      </View>
    </View>
  );

  // Determine title based on current view
  const title = showGame ? "Capturing Game" : "Capturing the object";

  return (
    <BasePage 
      pageNumber={showGame ? 10 : 9} 
      title={title} 
      description={showGame ? renderGameContent() : renderDemoContent()} 
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
    position: 'relative',
  },
  speechBubbleContainer: {
    position: 'absolute',
    left: 250,
    top: 60,
    zIndex: 10,
    width: 250,
  },
  viewportContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  boxAreaContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    width: '100%',
    height: '100%',
    overflow: 'hidden', // Ensure content stays within container
  },
  boxAreaContent: {
    position: 'relative',
    width: '100%',
    height: '100%',
    // Make sure the zoomed view is properly centered on the box
    transform: [
      { translateX: -180 }, // Adjust to position the fin in center of screen when zoomed
      { translateY: -100 }  // Adjust to position the fin in center of screen when zoomed
    ]
  },
  finCloseupContainer: {
    // This positions the shark icon to show only the fin in the zoomed view
    position: 'absolute',
    zIndex: 1,
    // Transform will be applied to position it correctly
  },
  sharkIconContainer: {
    // Add positioning properties here to move the shark
    position: 'relative',
    left: 80, // Adjust to move left/right
    top: 70, // Adjust to move up/down
  },
  speechText: {
    fontSize: 23,
    textAlign: 'center',
    color: 'black',
    lineHeight: 44,
    fontWeight: '500',
  },
  gogglesContainer: {
    position: 'absolute',
    top: 180,
    left: 270,
    zIndex: 5,
  },
  gogglesWrapper: {
    // This allows us to apply transforms to the goggles
    width: 200, // Set appropriate width
    height: 100, // Set appropriate height
  },
  targetBox: {
    position: 'absolute',
    borderWidth: 2,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    left:90
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gameButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gameSection: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10
  },
  backToDemoContainer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
    width: '100%',
  },
  backToDemoButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    left:270,
    top:65
  },
  footerContainer: {
    width: '100%',
    position: 'relative',
    height: 80,
    pointerEvents: 'none',
  },
  backButtonContainer: {
    position: 'absolute',
    left: 0,
    bottom: 25,
    zIndex: 99,
    pointerEvents: 'auto',
  },
  continueButtonContainer: {
    position: 'absolute',
    right: 0,
    bottom: 25,
    zIndex: 99,
    pointerEvents: 'auto',
  }
});