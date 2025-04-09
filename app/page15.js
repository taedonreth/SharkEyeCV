import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import SpeechBubble from '../components/SpeechBubble';
import YesButton from '../components/YesButton';
import NoButton from '../components/NoButton';
import Question from '../components/QuestionPage15';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import { ThemedText } from '../components/ThemedText';
import SharkWrapper from '../components/SharkWrapper';
import TypewriterText from '../components/TypewriterText';

export default function Page15() {
  // State for tracking the game
  const [sharkSaying, setSharkSaying] = useState('');
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  // Add a textUpdateKey to force TypewriterText to re-render
  const [textUpdateKey, setTextUpdateKey] = useState(0);
  
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
    if (gameCompleted) return;
    
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
  
  // Initialize the game
  useEffect(() => {
    startNewRound();
  }, []);

  // Process the answer
  const processAnswer = (isYes) => {
    // Prevent multiple rapid clicks or if game is completed
    if (buttonDisabled || gameCompleted) return;
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
        <View style={styles.contentRow}>
          {/* Left side container for Shark and Speech Bubble */}
          <View style={styles.leftContainer}>
            {/* Speech bubble positioned above the shark */}
            <View style={styles.speechBubbleContainer}>
              <SpeechBubble style={styles.speechBubble}>
                {gameCompleted 
                  ? <TypewriterText 
                      text={"Great job! Let's continue!"} 
                      style={styles.bubbleText} 
                      typingSpeed={40}
                      key={`complete-${textUpdateKey}`} 
                    />
                  : <TypewriterText 
                      text={`Hmmm..\nI see a ${sharkSaying}!`} 
                      style={styles.bubbleText} 
                      typingSpeed={40}
                      key={`saying-${textUpdateKey}`} 
                    />
                }
              </SpeechBubble>
            </View>
            
            {/* Shark below the speech bubble */}
            <View style={styles.sharkContainer}>
              <SharkWrapper>
                <Shark />
              </SharkWrapper>
            </View>
          </View>

          {/* Right side container for Image and Question */}
          <View style={styles.rightContainer}>
            {/* Scoreboard positioned directly on top of the image */}
            <View style={styles.scoreboardContainer}>
              <View style={styles.scoreItem}>
                <ThemedText style={styles.scoreLabel}>Score: {score}</ThemedText>
              </View>
              <View style={styles.scoreItem}>
                <ThemedText style={styles.scoreLabel}>Attempts: {totalAttempts}/{maxAttempts}</ThemedText>
              </View>
              <View style={styles.scoreItem}>
                <ThemedText style={styles.scoreLabel}>Found: {foundCreatures.length}/{seaCreatures.length}</ThemedText>
              </View>
            </View>
            
            {/* Image container with frame */}
            <View style={styles.backdropContainer}>
              <View style={styles.imageContainer}>
                <Image 
                  source={require('../assets/images/page15-game/image1.png')}
                  style={styles.backgroundImage}
                  resizeMode="contain"
                />
                
                {/* Selection Frame */}
                <View
                  style={[
                    styles.frame,
                    {
                      left: framePosition.x,
                      top: framePosition.y,
                      width: frameSize.width,
                      height: frameSize.height
                    }
                  ]}
                />
              </View>
              
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
            
            <View style={styles.questionContainer}>
              <Question style={styles.question} />
            </View>
          </View>
        </View>

        {/* Bottom section: Yes and No buttons */}
        <View style={styles.buttonsRow}>
          <YesButton onPress={() => processAnswer(true)} />
          <NoButton onPress={() => processAnswer(false)} />
        </View>
      </View>

      {/* Footer navigation */}
      <View style={styles.footerContainer}>
        <Link href="/page14" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page16" asChild>
          <ContinueButton isNavigation={true} disabled={!gameCompleted && !answerCorrect} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={15} title=" " description={description} />;
}

// Update styles to include frame styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
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
    position: 'relative',
  },
  scoreboardContainer: {
    flexDirection: 'row',
    backgroundColor: '#4A4A4A',
    paddingVertical: 8,
    paddingHorizontal: 10,
    width: 600,
    justifyContent: 'space-between',
    position: 'absolute',
    right: 162,
    top: 10,
    zIndex: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  scoreItem: {
    flex: 1,
    alignItems: 'center',
  },
  scoreLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sharkContainer: {
    zIndex: 1,
    marginLeft: -340,
    left: 130,
    top: 160,
    transform: [{ scale: .90 }],
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: -200,
    left: 0,
    zIndex: 2,
    transform: [{ scale: 0.8 }],
  },
  speechBubble: {
    width: 350,
    padding: 20,
  },
  bubbleText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    lineHeight: 40,
  },
  imageContainer: {
    position: 'relative',
    width: 600,
    height: 403.5,
    overflow: 'hidden',
    borderWidth: 5,
    borderColor: '#000',
    borderRadius: 10,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  // Frame style for highlighting creatures
  frame: {
    position: 'absolute',
    borderWidth: 4,
    borderColor: '#ffcc00',
    backgroundColor: 'rgba(255, 204, 0, 0.2)',
    zIndex: 5,
  },
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
  questionContainer: {
    position: 'absolute',
    top: 450,
    right: 400,
    zIndex: 3,
    transform: [{ scale: 0.8 }],
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    top: -27,
    right: -450,
    gap: 40,
    transform: [{ scale: 0.8 }]
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
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
    top: 45,
    right: 100,
    marginBottom: 20,
    position: 'relative',
  },
});
