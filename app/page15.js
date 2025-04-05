import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import SpeechBubble from '../components/SpeechBubble';
import BackDrop from '../components/BackDropPage15';
import YesButton from '../components/YesButton';
import NoButton from '../components/NoButton';
import Question from '../components/QuestionPage15';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import { ThemedText } from '../components/ThemedText';

export default function Page15() {
  // State for tracking the game
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sharkSaying, setSharkSaying] = useState('');
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  
  // Scoreboard state
  const [score, setScore] = useState(0);
  const [correctAttempts, setCorrectAttempts] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const maxAttempts = 10;
  
  // Add game completion state
  const [gameCompleted, setGameCompleted] = useState(false);

  // Feedback state
  const [feedback, setFeedback] = useState({ 
    visible: false, 
    correct: false, 
    message: '' 
  });
  
  // Images array
  const images = ['fish.jpg', 'shark1.jpg', 'shark2.jpg', 'turtle.jpg', 'whale.jpg'];
  
  // Pre-load all images to reduce lag
  const imageRefs = useRef({
    'fish.jpg': require('../assets/images/page15-game/fish.jpg'),
    'shark1.jpg': require('../assets/images/page15-game/shark1.jpg'),
    'shark2.jpg': require('../assets/images/page15-game/shark2.jpg'),
    'turtle.jpg': require('../assets/images/page15-game/turtle.jpg'),
    'whale.jpg': require('../assets/images/page15-game/whale.jpg')
  }).current;

  // Helper function to get display name
  const getImageDisplayName = (imageName) => {
    const baseName = imageName.split('.')[0];
    if (baseName === 'shark1' || baseName === 'shark2') {
      return 'shark';
    }
    return baseName;
  };
  
  // Set up what the shark says when the image changes
  useEffect(() => {
    // Skip setting new shark saying if game is completed
    if (gameCompleted) return;
    
    const actualImageName = getImageDisplayName(images[currentImageIndex]);
    
    // Randomly decide if shark tells truth (70%) or lies (30%)
    if (Math.random() < 0.7) {
      // Truth - say what it actually is
      setSharkSaying(actualImageName);
    } else {
      // Lie - say something else
      const options = ['fish', 'shark', 'turtle', 'whale'].filter(name => name !== actualImageName);
      const randomOption = options[Math.floor(Math.random() * options.length)];
      setSharkSaying(randomOption);
    }
    
    // Enable buttons when image changes
    setButtonDisabled(false);
    
    // Reset feedback
    setFeedback({ 
      visible: false, 
      correct: false, 
      message: '' 
    });
  }, [currentImageIndex, gameCompleted]);

  // Process the answer
  const processAnswer = (isYes) => {
    // Prevent multiple rapid clicks or if game is completed
    if (buttonDisabled || gameCompleted) return;
    setButtonDisabled(true);
    
    // Increment total attempts
    setTotalAttempts(prev => Math.min(prev + 1, maxAttempts));
    
    // Get actual image name
    const actualImageName = getImageDisplayName(images[currentImageIndex]);
    
    // Check if answer is correct
    const isCorrect = isYes ? 
      (actualImageName === sharkSaying) : 
      (actualImageName !== sharkSaying);
    
    // Set feedback and update score if correct
    setAnswerCorrect(isCorrect);
    
    if (isCorrect) {
      // Increment correct attempts and score
      const newCorrectAttempts = correctAttempts + 1;
      setCorrectAttempts(newCorrectAttempts);
      setScore(prev => prev + 100);  // Award 100 points per correct answer
      
      // Check if game should be completed (5 correct guesses)
      if (newCorrectAttempts >= 5) {
        // Game completed!
        setGameCompleted(true);
        
        // Show completion message
        setFeedback({
          visible: true,
          correct: true,
          message: "Great job! You got 5 correct answers! Click Continue to proceed."
        });
        
        // Set answer as correct for navigation purposes
        setAnswerCorrect(true);
        return;
      }
      
      // If not completed, show regular success message
      setFeedback({
        visible: true,
        correct: true,
        message: "That's correct! Good job!"
      });
      
      // After showing feedback, move to next image
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 2000);
    } else {
      // Set feedback with incorrect message
      setFeedback({
        visible: true,
        correct: false,
        message: "That's not right. Try again!"
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
                <ThemedText style={styles.bubbleText}>
                  {gameCompleted 
                    ? "Great job! Let's continue!" 
                    : `Hmmm..\nI see a ${sharkSaying}!`}
                </ThemedText>
              </SpeechBubble>
            </View>
            
            {/* Shark below the speech bubble */}
            <View style={styles.sharkContainer}>
              <Shark />
            </View>
          </View>

          {/* Right side container for BackDrop and Question */}
          <View style={styles.rightContainer}>
            {/* Scoreboard positioned directly on top of the image */}
            <View style={styles.scoreboardContainer}>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreLabel}>Score: {score}</Text>
              </View>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreLabel}>Attempts: {totalAttempts}/{maxAttempts}</Text>
              </View>
              <View style={styles.scoreItem}>
                <Text style={styles.scoreLabel}>Correct: {correctAttempts}/5</Text>
              </View>
            </View>
            
            {/* Image container */}
            <View style={styles.backdropContainer}>
              <BackDrop 
                style={styles.backdrop} 
                currentImage={images[currentImageIndex]}
                imageRefs={imageRefs}
              />
              
              {/* Feedback overlay */}
              {feedback.visible && (
                <View style={[
                  styles.feedbackOverlay,
                  feedback.correct ? styles.correctOverlay : styles.incorrectOverlay,
                  gameCompleted ? styles.completionOverlay : null
                ]}>
                  <Text style={[
                    styles.feedbackText,
                    gameCompleted ? styles.completionText : null
                  ]}>
                    {feedback.message}
                  </Text>
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
        <Link href="/page17" asChild>
          <ContinueButton isNavigation={true} disabled={!gameCompleted && !answerCorrect} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={15} title=" " description={description} />;
}

// Update styles to include completion styling
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
    width: 600, // Match the width of your image container
    justifyContent: 'space-between',
    position: 'absolute',
    right: 162,
    top: -65, // Position it at the top of the image
    zIndex: 10, // Ensure it appears above the image
    borderRadius: 12, // Apply rounded corners to all sides
    // Add subtle shadow for depth
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
    top: -250,
    left: 150,
    zIndex: 2,
    transform: [{ scale: 0.3 }],
  },
  backdropContainer: {
    transform: [{ scale: 1.5 }],
    top: 45,
    right: 100,
    marginBottom: 20,
    position: 'relative', // Needed for absolute positioning of feedback overlay
  },
  // New feedback overlay styles (similar to Page7)
  feedbackOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 20,
    borderRadius: 8,
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
    top: 425,
    right: 400,
    zIndex: 3,
    transform: [{ scale: 0.8 }],
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    top: 0,
    right: -450,
    gap: 40,
    transform: [{ scale: 0.8 }]
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
  bubbleText: {
    fontSize: 90,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    lineHeight: 100,
    transform: [{ scale: 1.0 }]
  },
  // Add new styles for completion state
  completionOverlay: {
    backgroundColor: 'rgba(0, 100, 180, 0.7)', // Blue color for completion
  },
  completionText: {
    fontSize: 24,
    textAlign: 'center',
    padding: 10,
  },
});
