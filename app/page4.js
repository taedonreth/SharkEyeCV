import React from 'react';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import { View, StyleSheet } from 'react-native';
import Wave from '../components/Wave';
import SpeechBubble from '../components/SpeechBubble';
import ReviewProcess from '../components/ReviewProcess';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page4() {
  return (
    <View style={styles.container}>
      <BasePage pageNumber={4} />
      <View style={styles.waveContainer}>
        <Wave />
      </View>
      <View style={styles.sharkContainer}>
        <Shark />
      </View>
      <View style={styles.speechBubbleContainer}>
        <SpeechBubble />
      </View>
      <View style={styles.reviewProcessContainer}>
        <ReviewProcess />
      </View>
      
      <View style={styles.navigationContainer}>
        {/* Back button */}
        <View style={styles.backButton}>
          <Link href="/page3" asChild>
            <BackButton isNavigation={true} />
          </Link>
        </View>

        {/* Continue button */}
        <View style={styles.continueButton}>
          <Link href="/page5" asChild>
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
  reviewProcessContainer: {
    position: 'absolute',
    bottom: -40,     // This will align to bottom
    left: 55,
    zIndex: 1, 
    transform: [
      { scale: 0.70}
    ]
  },
  waveContainer: {
    position: 'absolute',
    bottom: -80,     // This will align to bottom
    left: 0,
    right: 0,
    zIndex: 1,  // Waves will be above background
  },
  sharkContainer: {
    position: 'absolute',
    top: 275,    // pixels from top
    left: -75,   // pixels from left
    zIndex: 2,
    transform: [
      { scale: 0.75 },
      { rotate: '-5deg' }
    ]
  },
  speechBubbleContainer: {
    position: 'absolute',
    bottom: 90,     // This will align to bottom
    left: -275,
    right: 0,
    zIndex: 2,  // Waves will be above background
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