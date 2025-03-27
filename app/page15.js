import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
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
import FeedbackDisplay from '../components/FeedbackDisplay';

export default function Page15() {
  // State for tracking the game
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sharkSaying, setSharkSaying] = useState('');
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  
  // Images array
  const images = ['fish.jpg', 'shark1.jpg', 'shark2.jpg', 'turtle.jpg', 'whale.jpg'];

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
  }, [currentImageIndex]);

  // Process the answer
  const processAnswer = (isYes) => {
    // Disable buttons temporarily to prevent double-clicks
    setButtonDisabled(true);
    
    // Get actual image name
    const actualImageName = getImageDisplayName(images[currentImageIndex]);
    
    // Check if answer is correct
    // "Yes" is correct if shark is telling truth (what it says matches image)
    // "No" is correct if shark is lying (what it says doesn't match image)
    const isCorrect = isYes ? 
      (actualImageName === sharkSaying) : 
      (actualImageName !== sharkSaying);
    
    // Set feedback
    setAnswerCorrect(isCorrect);
    
    if (isCorrect) {
      // If correct, show success message and advance to next image after delay
      setFeedback("That's correct! Good job!");
      setShowFeedback(true);
      
      setTimeout(() => {
        // Move to next image only after correct answer
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setShowFeedback(false);
      }, 2000);
    } else {
      // If wrong, show hint and let them try again
      setFeedback("That's not right. Try again!");
      setShowFeedback(true);
      
      // Re-enable buttons after a short delay to allow for feedback to be read
      setTimeout(() => {
        setButtonDisabled(false);
        setShowFeedback(false);
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
                  Hmmm..{'\n'}I see a {sharkSaying}!
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
            <View style={styles.backdropContainer}>
              <BackDrop 
                style={styles.backdrop} 
                currentImage={images[currentImageIndex]} 
              />
            </View>
            
            <View style={styles.questionContainer}>
              <Question style={styles.question} />
            </View>
          </View>
        </View>

        {/* Bottom section: Yes and No buttons */}
        <View style={styles.buttonsRow}>
          <YesButton onPress={() => !buttonDisabled && processAnswer(true)} />
          <NoButton onPress={() => !buttonDisabled && processAnswer(false)} />
        </View>
      </View>

      {/* Feedback display */}
      <FeedbackDisplay 
        message={feedback}
        visible={showFeedback}
        duration={2000}
      />

      {/* Footer navigation */}
      <View style={styles.footerContainer}>
        <Link href="/page14" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href={answerCorrect ? "/page17" : "/page16"} asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={15} description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1, // Pushes footer to the bottom
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1, // Takes up half the available width
    alignItems: 'center',
    justifyContent: 'flex-end', // Align items at the bottom of container
    paddingRight: 10,
    position: 'relative',
  },
  rightContainer: {
    flex: 1, // Takes up half the available width
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    position: 'relative',
  },
  sharkContainer: {
    zIndex: 1,
    marginLeft: -340,
    left: 150,
    top: 140,
    transform: [{ scale: .90 }], // Adjust scale if needed
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: -250,
    left: 150,
    zIndex: 2, // Ensure speech bubble appears above other elements
    transform: [{ scale: 0.3 }], // Adjust scale if needed
  },
  backdropContainer: {
    transform: [{ scale: 1.5 }],
    top: 25,
    right: 100,
    marginBottom: 20,
  },
  questionContainer: {
    position: 'absolute',
    top: 405,
    right: 400,
    zIndex: 3,
    transform: [{ scale: 0.8 }],
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    top: -20,
    right: -450,
    gap: 40, // Very small gap between buttons
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
    transform: [{ scale: 1.1 }]
  },
});
