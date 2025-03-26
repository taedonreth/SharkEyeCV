import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Animated, TouchableOpacity } from 'react-native';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import CorrectButton from '../components/CorrectButton';
import FalseButton from '../components/FalseButton';
import SpeechBubble from '../components/SpeechBubble';
import { ThemedText } from '../components/ThemedText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

// Define the training images data structure
const trainingImages = {
  good: [
    { id: 'good1', path: require('../assets/images/training-data/good/good1.jpg'), name: 'Shark Image 1' },
    { id: 'good2', path: require('../assets/images/training-data/good/good2.jpg'), name: 'Seaweed Image' },
    // Add more good images as needed
  ],
  bad: [
    { id: 'bad1', path: require('../assets/images/training-data/bad/bad1.jpg'), name: 'Monkey Image' },
    { id: 'bad2', path: require('../assets/images/training-data/bad/bad2.jpg'), name: 'Random Object' },
    // Add more bad images as needed
  ]
};

export default function Page7() {
  // State for the game
  const [currentImage, setCurrentImage] = useState(null);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [feedback, setFeedback] = useState({ visible: false, correct: false, message: '' });
  const [fadeAnim] = useState(new Animated.Value(1));

  // Function to get a random image
  const getRandomImage = () => {
    // Randomly decide between good and bad category
    const category = Math.random() > 0.5 ? 'good' : 'bad';

    // Get a random image from the selected category
    const imageArray = trainingImages[category];
    const randomIndex = Math.floor(Math.random() * imageArray.length);

    return {
      ...imageArray[randomIndex],
      category
    };
  };

  // Initialize with a random image when component mounts
  useEffect(() => {
    setCurrentImage(getRandomImage());
  }, []);

  // Handle user selection
  const handleSelection = (selection) => {
    // Don't allow selection while feedback is showing
    if (feedback.visible) return;

    const isCorrect = (selection === 'good' && currentImage.category === 'good') ||
      (selection === 'bad' && currentImage.category === 'bad');

    // Update score and total
    setTotalAnswered(prev => prev + 1);
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Show feedback
    setFeedback({
      visible: true,
      correct: isCorrect,
      message: isCorrect ? 'Correct!' : 'Incorrect!'
    });

    // Fade out current image
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      // After fade out, set new image and fade in
      setTimeout(() => {
        setCurrentImage(getRandomImage());
        setFeedback({ visible: false, correct: false, message: '' });
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true
        }).start();
      }, 1000);
    });
  };

  const title = "Training Data Classification";
  const description = (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        {/* Left section with shark and speech bubble */}
        <View style={styles.leftSection}>
          <View style={styles.sharkContainer}>
            <Shark />
          </View>
        </View>

        <View style={styles.speechBubbleContainer}>
          <SpeechBubble>
            <ThemedText style={styles.questionText}>
              Is this image{'\n'}good or bad{'\n'}training data?
            </ThemedText>
          </SpeechBubble>
        </View>

        {/* Center content with image and buttons */}
        <View style={styles.centerContent}>
          {/* Score display */}
          <View style={styles.scoreContainer}>
            <ThemedText style={styles.scoreText}>
              Score: {score}/{totalAnswered}
            </ThemedText>
          </View>

          {/* Image container */}
          <View style={styles.imageContainer}>
            {currentImage && (
              <Animated.View style={{ opacity: fadeAnim, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source={currentImage.path}
                  style={styles.trainingImage}
                  resizeMode="contain"
                />
              </Animated.View>
            )}

            {/* Feedback overlay */}
            {feedback.visible && (
              <View style={[
                styles.feedbackOverlay,
                feedback.correct ? styles.correctOverlay : styles.incorrectOverlay
              ]}>
                <ThemedText style={styles.feedbackText}>
                  {feedback.message}
                </ThemedText>
              </View>
            )}
          </View>

          {/* Buttons Row */}
          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => handleSelection('good')}
              activeOpacity={0.8}
            >
              <CorrectButton />
              <ThemedText style={styles.buttonLabel}>Good Data</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => handleSelection('bad')}
              activeOpacity={0.8}
            >
              <FalseButton />
              <ThemedText style={styles.buttonLabel}>Bad Data</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Instructions */}
          <View style={styles.instructionsContainer}>
            <ThemedText style={styles.instructionsText}>
              Good training data includes sharks or relevant ocean items.{'\n'}
              Bad training data includes unrelated objects or scenes.
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Link href="/page6" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page8" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={7} title={title} description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  leftSection: {
    width: '30%',
    position: 'relative',
    paddingTop: 100,
  },
  sharkContainer: {
    right: 190,
    bottom: 150,
    transform: [{ scale: 0.65 }, { rotate: '20deg' }],
  },
  speechBubbleContainer: {
    position: 'absolute',
    left: -90,
    top: -350,
    transform: [{ scale: 0.25 }],
    zIndex: 20,
  },
  questionText: {
    fontSize: 70,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    lineHeight: 100,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    marginRight: 450,
    maxWidth: 800,
  },
  scoreContainer: {
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    position: 'absolute',
    left: 225,
    top: 430,
    zIndex: 3,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#064160',
  },
  imageContainer: {
    width: 700,
    height: 420,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  trainingImage: {
    width: '90%',
    height: '90%',
    borderRadius: 10,
  },
  feedbackOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  correctOverlay: {
    backgroundColor: 'rgba(0, 180, 0, 0.5)',
  },
  incorrectOverlay: {
    backgroundColor: 'rgba(180, 0, 0, 0.5)',
  },
  feedbackText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
    gap: 90,
  },
  buttonWrapper: {
    alignItems: 'center',
    transform: [{ scale: 0.7 }],
  },
  buttonLabel: {
    marginTop: -15,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  instructionsContainer: {
    marginTop: 5,
    padding: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    maxWidth: 600,
    position: 'absolute',
    bottom: 80,
  },
  instructionsText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});
