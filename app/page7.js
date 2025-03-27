import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Animated, Pressable, Text } from 'react-native';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import SpeechBubble from '../components/SpeechBubble';
import { ThemedText } from '../components/ThemedText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

// Define the training images data structure
const trainingImages = {
  good: [
    { id: 'good1', path: require('../assets/images/training-data/good/good1.jpg'), name: 'Shark' },
    { id: 'good2', path: require('../assets/images/training-data/good/good2.jpg'), name: 'Turtle' },
    { id: 'good3', path: require('../assets/images/training-data/good/good3.jpg'), name: 'StingRay' },
    { id: 'good4', path: require('../assets/images/training-data/good/good4.jpg'), name: 'CoralReef' },
    { id: 'good5', path: require('../assets/images/training-data/good/good5.jpg'), name: 'Surfer' },
    // Add more good images as needed
  ],
  bad: [
    { id: 'bad1', path: require('../assets/images/training-data/bad/bad1.jpg'), name: 'Couch' },
    { id: 'bad2', path: require('../assets/images/training-data/bad/bad2.jpg'), name: 'Monkey' },
    { id: 'bad3', path: require('../assets/images/training-data/bad/bad3.jpg'), name: 'Dog' },
    { id: 'bad4', path: require('../assets/images/training-data/bad/bad4.jpg'), name: 'Cat' },
    { id: 'bad5', path: require('../assets/images/training-data/bad/bad5.jpg'), name: 'Sushi' },
    // Add more bad images as needed
  ]
};

export default function Page7() {
  // State for the game
  const [currentImage, setCurrentImage] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({ visible: false, correct: false, message: '' });
  const [fadeAnim] = useState(new Animated.Value(1));
  const [gameCompleted, setGameCompleted] = useState(false);
  const [yesButtonHovered, setYesButtonHovered] = useState(false);
  const [noButtonHovered, setNoButtonHovered] = useState(false);

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
    // Don't allow selection while feedback is showing or if game is completed
    if (feedback.visible || gameCompleted) return;

    const isCorrect = (selection === 'good' && currentImage.category === 'good') ||
      (selection === 'bad' && currentImage.category === 'bad');

    // Update score only for correct answers
    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);

      // Check if game is completed
      if (newScore >= 5) {
        setGameCompleted(true);
        setFeedback({
          visible: true,
          correct: true,
          message: 'Game completed! Press Continue to move to the next page!'
        });
        return;
      }
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
      // After fade out, set new image and fade in (only if game is not completed)
      if (!gameCompleted) {
        setTimeout(() => {
          setCurrentImage(getRandomImage());
          setFeedback({ visible: false, correct: false, message: '' });
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
          }).start();
        }, 1000);
      }
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
              Score: {score}
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
                feedback.correct ? styles.correctOverlay : styles.incorrectOverlay,
                gameCompleted ? styles.completionOverlay : null
              ]}>
                <ThemedText style={[styles.feedbackText, gameCompleted ? styles.completionText : null]}>
                  {feedback.message}
                </ThemedText>
              </View>
            )}
          </View>

          {/* Buttons Row */}
          <View style={styles.buttonsRow}>
            <Pressable
              style={({ pressed }) => [
                styles.simpleButton,
                styles.yesButton,
                pressed && styles.buttonPressed,
                yesButtonHovered && styles.buttonHovered
              ]}
              onPress={() => handleSelection('good')}
              disabled={gameCompleted}
              onMouseEnter={() => setYesButtonHovered(true)}
              onMouseLeave={() => setYesButtonHovered(false)}
            >
              <Text style={styles.buttonText}>YES</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.simpleButton,
                styles.noButton,
                pressed && styles.buttonPressed,
                noButtonHovered && styles.buttonHovered
              ]}
              onPress={() => handleSelection('bad')}
              disabled={gameCompleted}
              onMouseEnter={() => setNoButtonHovered(true)}
              onMouseLeave={() => setNoButtonHovered(false)}
            >
              <Text style={styles.buttonText}>NO</Text>
            </Pressable>
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
    justifyContent: 'space-evenly', // or 'center'
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
    left: 234,
    top: 380,
    zIndex: 3,
    elevation: 2,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
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
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
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
  completionOverlay: {
    backgroundColor: 'rgba(0, 100, 180, 0.7)',
  },
  feedbackText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.75)',
  },
  completionText: {
    fontSize: 32,
    textAlign: 'center',
    padding: 10,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 120,
  },
  simpleButton: {
    width: 120,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  yesButton: {
    backgroundColor: '#4CC0B9',
  },
  noButton: {
    backgroundColor: '#F26F63',
  },
  buttonHovered: {
    opacity: 0.85,
    backgroundColor: '#333333',
  },
  buttonPressed: {
    opacity: 0.8,
    backgroundColor: '#222222',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});
