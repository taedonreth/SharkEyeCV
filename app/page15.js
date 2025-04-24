import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import BasePage from './BasePage';
import DumbShark from '../components/dumbshark';
import SpeechBubble from '../components/SpeechBubble';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import { ThemedText } from '../components/ThemedText';
import SharkWrapper from '../components/SharkWrapper';
import TypewriterText from '../components/TypewriterText';
import { Ionicons } from '@expo/vector-icons';

export default function Page15() {
  // Define messages for the speech bubble
  const sharkMessages = [
    "Look at these beautiful underwater scenes!",
    "Explore the ocean depths with me!",
    "So many amazing creatures live here!",
    "The underwater world is full of wonders!"
  ];
  
  // State to track current message index
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  // Timer ref to track and clear the interval
  const timerRef = useRef(null);
  
  // Flag to track if user manually interacted
  const [userInteracted, setUserInteracted] = useState(false);
  
  // State for navigation
  const [answerCorrect, setAnswerCorrect] = useState(true);
  
  // Background cycling state
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const [nextBackgroundIndex, setNextBackgroundIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState('next'); // 'next' or 'prev'
  const slideAnim = useRef(new Animated.Value(0)).current;
  const backgrounds = [
    require('../assets/images/page15-game/backgrounds/bg1.png'),
    require('../assets/images/page15-game/backgrounds/bg2.png'),
    require('../assets/images/page15-game/backgrounds/bg3.png'),
    require('../assets/images/page15-game/backgrounds/bg4.png')
  ];

  // Scoreboard state
  const [score, setScore] = useState(0);
  const [correctAttempts, setCorrectAttempts] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const maxAttempts = 15;

  // Track which creatures have been correctly identified
  const [foundCreatures, setFoundCreatures] = useState([]);

  // Game completion state
  const [gameCompleted, setGameCompleted] = useState(false);

  // Feedback state
  const [feedback, setFeedback] = useState({
    visible: false,
    correct: false,
    message: ''
  });

  // Sea creatures data with their positions in the image
  const seaCreatures = [
    {
      id: 1,
      name: 'turtle',
      position: { x: 52, y: 40 },
      size: { width: 140, height: 100 }
    },
    {
      id: 2,
      name: 'jellyfish',
      position: { x: 480, y: 30 },
      size: { width: 70, height: 150 }
    },
    {
      id: 3,
      name: 'shark',
      position: { x: 200, y: 120 },
      size: { width: 290, height: 140 }
    },
    {
      id: 4,
      name: 'stingray',
      position: { x: 365, y: 250 },
      size: { width: 150, height: 130 }
    },
    {
      id: 5,
      name: 'pufferfish',
      position: { x: 120, y: 140 },
      size: { width: 70, height: 70 }
    },
    {
      id: 6,
      name: 'crab',
      position: { x: 115, y: 300 },
      size: { width: 115, height: 110 }
    }
  ];

  // Current creature to highlight
  const [currentCreature, setCurrentCreature] = useState(null);

  // Selection frame for the shark's guess
  const [framePosition, setFramePosition] = useState({ x: 0, y: 0 });
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 });

  // Start a new round with a new creature and frame
  const startNewRound = () => {
    console.log('Starting new round');
    if (gameCompleted) {
      console.log('Game completed, not starting new round');
      return;
    }

    // Determine which creatures haven't been found yet
    const unfoundCreatures = seaCreatures.filter(creature =>
      !foundCreatures.includes(creature.id)
    );

    let creature;

    // If there are unfound creatures, strongly prefer those (90% chance)
    if (unfoundCreatures.length > 0 && (Math.random() < 0.9 || foundCreatures.length === 0)) {
      // Pick a random unfound creature
      const randomIndex = Math.floor(Math.random() * unfoundCreatures.length);
      creature = unfoundCreatures[randomIndex];
    } else {
      // Occasionally show a found creature, or if all have been found
      // Avoid repeating the same creature if possible
      let randomIndex = Math.floor(Math.random() * seaCreatures.length);
      if (currentCreature && seaCreatures.length > 1) {
        // Try to avoid the same creature twice in a row
        let attempts = 0;
        while (seaCreatures[randomIndex].id === currentCreature.id && attempts < 3) {
          randomIndex = Math.floor(Math.random() * seaCreatures.length);
          attempts++;
        }
      }
      creature = seaCreatures[randomIndex];
    }

    setCurrentCreature(creature);

    // Position the frame with variable accuracy to make the game challenging
    // Sometimes the frame will be perfectly aligned, sometimes it will be off
    const perfectFrameChance = 0.5; // 50% chance of perfect framing

    let newFramePosition = { ...creature.position };
    let newFrameSize = { ...creature.size };

    // If not perfectly framed, adjust the frame position and size slightly
    if (Math.random() > perfectFrameChance) {
      // Create varying degrees of misalignment
      const misalignmentLevel = Math.random();

      // Determine offset and size adjustment ranges based on misalignment level
      const offsetRange = misalignmentLevel * 60; // Up to 60px offset
      const sizeAdjustRange = misalignmentLevel * 40; // Up to 40px size change

      // Adjust position randomly within offset range
      newFramePosition.x += Math.floor((Math.random() - 0.5) * offsetRange);
      newFramePosition.y += Math.floor((Math.random() - 0.5) * offsetRange);

      // Adjust size randomly within size adjust range
      newFrameSize.width += Math.floor((Math.random() - 0.5) * sizeAdjustRange);
      newFrameSize.height += Math.floor((Math.random() - 0.5) * sizeAdjustRange);

      // Ensure minimum size
      newFrameSize.width = Math.max(newFrameSize.width, 50);
      newFrameSize.height = Math.max(newFrameSize.height, 50);
    }

    setFramePosition(newFramePosition);
    setFrameSize(newFrameSize);

    // Calculate the accuracy of the frame (overlap percentage and selection precision)
    const frameRight = newFramePosition.x + newFrameSize.width;
    const frameBottom = newFramePosition.y + newFrameSize.height;

    const creatureRight = creature.position.x + creature.size.width;
    const creatureBottom = creature.position.y + creature.size.height;

    // Calculate the overlap area
    const overlapLeft = Math.max(creature.position.x, newFramePosition.x);
    const overlapTop = Math.max(creature.position.y, newFramePosition.y);
    const overlapRight = Math.min(creatureRight, frameRight);
    const overlapBottom = Math.min(creatureBottom, frameBottom);

    // Check if there is an actual overlap
    const hasOverlap = overlapLeft < overlapRight && overlapTop < overlapBottom;
    let overlapArea = 0;
    let overlapPercentage = 0;
    let selectionPrecision = 0;

    if (hasOverlap) {
      const overlapWidth = overlapRight - overlapLeft;
      const overlapHeight = overlapBottom - overlapTop;
      overlapArea = overlapWidth * overlapHeight;

      const creatureArea = creature.size.width * creature.size.height;
      overlapPercentage = (overlapArea / creatureArea) * 100;

      // Calculate selection precision (how much of the selection is filled by the creature)
      const selectionArea = newFrameSize.width * newFrameSize.height;
      selectionPrecision = (overlapArea / selectionArea) * 100;
    }

    // Apply similar logic to MurkySharkFramingGame
    let effectiveOverlapPercentage = overlapPercentage;

    // Penalize imprecise selections (large boxes around small items)
    if (selectionPrecision < 30) {
      // If the selection is very large and the creature is small within it,
      // reduce the effective overlap percentage
      effectiveOverlapPercentage = overlapPercentage * (selectionPrecision / 100);
    }

    // Randomly decide what the shark says (regardless of what's in the frame)
    // Sometimes it's correct, sometimes not
    const correctIdentificationChance = 0.7; // 70% chance to correctly identify

    if (Math.random() < correctIdentificationChance) {
      // Shark correctly identifies the creature
      setSharkSaying(creature.name);
      // Update text key when shark says something new
      setTextUpdateKey(prev => prev + 1);
    } else {
      // Shark randomly identifies some other creature
      const options = seaCreatures
        .map(c => c.name)
        .filter(name => name !== creature.name);
      const randomOption = options[Math.floor(Math.random() * options.length)];
      setSharkSaying(randomOption);
      // Update text key when shark says something new
      setTextUpdateKey(prev => prev + 1);
    }

    // Enable buttons when new round starts
    setButtonDisabled(false);

    // Reset feedback
    setFeedback({
      visible: false,
      correct: false,
      message: ''
    });
  };

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
      setCurrentMessageIndex(prevIndex => (prevIndex + 1) % sharkMessages.length);
    }, 6500);
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
  
  // Function to cycle to the next background with sliding animation
  const nextBackground = () => {
    if (isAnimating) return; // Prevent multiple animations
    setIsAnimating(true);
    setSlideDirection('next');
    
    // Calculate the next background index
    const nextIndex = (currentBackgroundIndex + 1) % backgrounds.length;
    setNextBackgroundIndex(nextIndex);
    
    // Reset animation value
    slideAnim.setValue(0);
    
    // Slide to the left (negative value)
    Animated.timing(slideAnim, {
      toValue: -600, // Full width of the container
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      // Update current index to the next one
      setCurrentBackgroundIndex(nextIndex);
      // Reset animation value
      slideAnim.setValue(0);
      setIsAnimating(false);
    });
  };
  
  // Function to cycle to the previous background with sliding animation
  const prevBackground = () => {
    if (isAnimating) return; // Prevent multiple animations
    setIsAnimating(true);
    setSlideDirection('prev');
    
    // Calculate the previous background index
    const prevIndex = currentBackgroundIndex === 0 ? backgrounds.length - 1 : currentBackgroundIndex - 1;
    setNextBackgroundIndex(prevIndex);
    
    // Reset animation value
    slideAnim.setValue(0);
    
    // Slide to the right (positive value)
    Animated.timing(slideAnim, {
      toValue: 600, // Full width of the container
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      // Update current index to the previous one
      setCurrentBackgroundIndex(prevIndex);
      // Reset animation value
      slideAnim.setValue(0);
      setIsAnimating(false);
    });
  };

  // Process the answer
  const processAnswer = (isYes) => {
    console.log('Processing answer:', isYes);
    console.log('Current creature:', currentCreature);
    console.log('Shark saying:', sharkSaying);
    
    // Prevent multiple rapid clicks or if game is completed
    if (buttonDisabled || gameCompleted) {
      console.log('Button disabled or game completed, returning');
      return;
    }
    setButtonDisabled(true);

    // Increment total attempts
    setTotalAttempts(prev => Math.min(prev + 1, maxAttempts));

    // The shark's identification is correct if it says the actual creature name
    const sharkIsCorrect = sharkSaying === currentCreature.name;

    // Check if user's answer is correct:
    // - User said "Yes" and shark is correct
    // - User said "No" and shark is incorrect
    const isCorrect = (isYes && sharkIsCorrect) || (!isYes && !sharkIsCorrect);

    // Set feedback and update score if correct
    setAnswerCorrect(isCorrect);

    if (isCorrect) {
      // Increment correct attempts and score
      const newCorrectAttempts = correctAttempts + 1;
      setCorrectAttempts(newCorrectAttempts);

      // Award points
      const pointsAwarded = 100;
      setScore(prev => prev + pointsAwarded);

      // Track if we found a new creature
      let newCreatureFound = false;
      let newFoundCreatures = [...foundCreatures];

      // If shark was correct and this was a correct answer, we've found this creature
      // But only if we haven't already found it
      if (sharkIsCorrect && !foundCreatures.includes(currentCreature.id)) {
        newFoundCreatures = [...foundCreatures, currentCreature.id];
        setFoundCreatures(newFoundCreatures);
        newCreatureFound = true;

        // Check if all creatures have been found
        if (newFoundCreatures.length === seaCreatures.length) {
          // Game completed!
          setGameCompleted(true);

          // Update text key for completion message
          setTextUpdateKey(prev => prev + 1);

          // Show completion message
          setFeedback({
            visible: true,
            correct: true,
            message: "Great job! You've found all the sea creatures! Click Continue to proceed."
          });

          // Set answer as correct for navigation purposes
          setAnswerCorrect(true);
          return;
        }
      }

      // If not completed, show regular success message
      let message = `Correct! The shark ${sharkIsCorrect ? 'was right' : 'was wrong'} about that ${currentCreature.name}. +${pointsAwarded}`;

      // Add discovery info if we found a new creature
      if (newCreatureFound) {
        message += `\nYou've found ${newFoundCreatures.length} of ${seaCreatures.length} creatures!`;
      }

      setFeedback({
        visible: true,
        correct: true,
        message: message
      });

      // After showing feedback, move to next round
      setTimeout(() => {
        startNewRound();
      }, 2000);
    } else {
      // Set feedback with incorrect message
      setFeedback({
        visible: true,
        correct: false,
        message: `Incorrect. It was ${sharkIsCorrect ? 'really' : 'not'} a ${sharkSaying}.`
      });

      // For incorrect answers, re-enable buttons after feedback
      setTimeout(() => {
        setFeedback({ visible: false, correct: false, message: '' });
        setButtonDisabled(false);
      }, 2000);
    }
  };

  const description = (
    <View style={styles.container}>
      {/* Main scene content */}
      <View style={styles.mainContent}>
        {/* Background image container at the bottom layer */}
        <View style={styles.backdropContainer}>
          <View style={styles.imageContainer}>
            {/* Container for both current and next images */}
            <View style={styles.slidingContainer}>
              {/* Current background */}
              <Animated.View 
                style={[styles.animatedContainer, {
                  transform: [{ translateX: slideAnim }]
                }]}
              >
                <Image
                  source={backgrounds[currentBackgroundIndex]}
                  style={styles.backgroundImage}
                  resizeMode="contain"
                />
              </Animated.View>
              
              {/* Next/Previous background (positioned based on slide direction) */}
              {isAnimating && (
                <Animated.View 
                  style={[styles.animatedContainer, styles.nextImageContainer, {
                    transform: [{ 
                      translateX: slideAnim.interpolate({
                        inputRange: [-600, 0, 600],
                        outputRange: [0, slideDirection === 'next' ? 600 : -600, 0]
                      }) 
                    }]
                  }]}
                >
                  <Image
                    source={backgrounds[nextBackgroundIndex]}
                    style={styles.backgroundImage}
                    resizeMode="contain"
                  />
                </Animated.View>
              )}
            </View>
            
            {/* Background navigation buttons */}
            <TouchableOpacity 
              style={[styles.backgroundNavButton, styles.leftNavButton]}
              onPress={prevBackground}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={20} color="#ffffff" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.backgroundNavButton, styles.rightNavButton]}
              onPress={nextBackground}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-forward" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* Selection Frame - removed */}

          {/* Feedback overlay */}
          {feedback.visible && (
            <View style={[
              styles.feedbackOverlay,
              feedback.correct ? styles.correctOverlay : styles.incorrectOverlay,
              gameCompleted ? styles.completionOverlay : null
            ]}>
              <ThemedText style={[
                styles.feedbackText,
                gameCompleted ? styles.completionText : null
              ]}>
                {feedback.message}
              </ThemedText>
            </View>
          )}
        </View>

        {/* Speech bubble positioned above the background */}
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
              typingSpeed={70}
            />
          </SpeechBubble>
        </TouchableOpacity>

      </View>

      {/* Bottom section: Buttons removed */}

      {/* Footer navigation */}
      <View style={styles.footerContainer}>
        <Link href="/page14" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page16" asChild>
          <ContinueButton isNavigation={true} disabled={!answerCorrect} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={10} title="Model Testing Game" description={description} />;
}

// Update styles to include frame styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    pointerEvents: 'box-none', // Allow touch events to pass through to children
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    pointerEvents: 'box-none', // Allow touch events to pass through to children
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
    position: 'relative',
  },
  // Scoreboard styles removed
  sharkContainer: {
    zIndex: 1,
    marginLeft: -340,
    left: 0,
    top: 160,
    transform: [{ scale: 0.8 }],
  },
  /* goggles removed */
  speechBubbleContainer: {
    position: 'absolute',
    left: 10,
    bottom: 30,
    zIndex: 150,
    transform: [{ scale: .82 }],
    width: 250,
  },
  speechText: {
    fontSize: 36,
    textAlign: 'center',
    color: 'black',
    lineHeight: 44,
    fontWeight: '500',
  },
  imageContainer: {
    position: 'relative',
    width: 600,
    height: 403.5,
    overflow: 'hidden',
    borderWidth: 0,
    borderColor: '#1a9999',
    borderRadius: 0,
  },
  backgroundNavButton: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    marginTop: -15,
  },
  leftNavButton: {
    left: 10,
  },
  rightNavButton: {
    right: 10,
  },
  slidingContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  animatedContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  nextImageContainer: {
    zIndex: -1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  // Frame style removed
  feedbackOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 600,
    height: 403.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 20,
    borderRadius: 10,
  },
  correctOverlay: {
    backgroundColor: 'rgba(0, 180, 0, 0.6)',
  },
  incorrectOverlay: {
    backgroundColor: 'rgba(180, 0, 0, 0.6)',
  },
  feedbackText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    textAlign: 'center',
  },
  /* question container removed */
  /* buttons row removed */
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
    zIndex: 10, // Lower z-index than buttons
    position: 'relative'
  },
  completionOverlay: {
    backgroundColor: 'rgba(0, 100, 180, 0.7)',
  },
  completionText: {
    fontSize: 24,
    textAlign: 'center',
    padding: 10,
  },
  backdropContainer: {
    position: 'absolute',
    top: 90,
    right: -900,
    marginBottom: 20,
    transform: [{ scaleX: 2.5 }, { scaleY: 1.63 },{scale: .95}],
    width: '100%',
    zIndex: 1,
  },
});