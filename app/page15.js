import React from 'react';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import { View, StyleSheet } from 'react-native';
import Wave from '../components/Wave';
import SpeechBubble from '../components/SpeechBubble';
import BackDrop from '../components/BackDropPage15';
import YesButton from '../components/YesButton';
import NoButton from '../components/NoButton';
import Question from '../components/QuestionPage15';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page15() {
  return (
    <View style={styles.container}>
      <BasePage pageNumber={15} />
      <View style={styles.sharkContainer}>
        <Shark />
      </View>
      <View style={styles.waveContainer}>
        <Wave />
      </View>
      <View style={styles.speechBubbleContainer}>
        <SpeechBubble />
      </View>
      <View style={styles.backdropContainer}>
        <BackDrop />
      </View>
      <View style={styles.yesButtonContainer}>
        <YesButton />
      </View>
      <View style={styles.noButtonContainer}>
        <NoButton />
      </View>
      <View style={styles.questionContainer}>
        <Question />
      </View>
      
      {/* Navigation buttons */}
      <View style={styles.navigationContainer}>
        {/* Back button */}
        <View style={styles.backButton}>
          <Link href="/page14" asChild>
            <BackButton isNavigation={true} />
          </Link>
        </View>

        {/* Continue button */}
        <View style={styles.continueButton}>
          <Link href="/page16" asChild>
            <ContinueButton isNavigation={true} />
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  questionContainer: {
    position: 'absolute',
    bottom: 100,     
    left: 550,
    right: 0,
    zIndex: 4, 
    transform: [
      { scale: 0.80 }
    ]
  },
  noButtonContainer: {
    position: 'absolute',
    bottom: 100,     
    left: 1175,
    right: 0,
    zIndex: 4, 
    transform: [
      { scale: 0.80 }
    ]
  },
  yesButtonContainer: {
    position: 'absolute',
    bottom: 100,     
    left: 1025,
    right: 0,
    zIndex: 2, 
    transform: [
      { scale: 0.80 }
    ]
  },
  waveContainer: {
    position: 'absolute',
    bottom: -80,     // This will align to bottom
    left: -100,
    right: 0,
    zIndex: 1,  // Waves will be above background
  },
  backdropContainer: {
    position: 'absolute',
    top: '50%',           // Center vertically
    left: '72%',          // Center horizontally
    transform: [          // Offset by half of the element's size
      { translateX: -500 }, // Adjust this value based on your BackDrop width
      { translateY: -300 },  // Adjust this value based on your BackDrop height
      { scale: 0.80 }
    ],
    zIndex: 2,           // BackDrop layer
  },
  sharkContainer: {
    position: 'absolute',
    top: 300,    // pixels from top
    left: -150,   // pixels from left
    zIndex: 2,
    transform: [
      { scale: 0.75 },
      { rotate: '-5deg' }
    ]
  },
  speechBubbleContainer: {
    position: 'absolute',
    bottom: 100,     // This will align to bottom
    left: -350,
    right: 0,
    zIndex: 3,  // Waves will be above background
    transform: [
      { scale: 0.3 },
      { rotate: '5deg'}
    ],
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    width: '100%',
    zIndex: 3,
  },
  backButton: {
    alignSelf: 'flex-start',
    position: 'absolute',
    left: 0,
    bottom: 10,
  },
  continueButton: {
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 0,
    bottom: 10,
  },
});