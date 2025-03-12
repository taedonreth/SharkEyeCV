import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import BasePage from './BasePage';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import Shark from '../components/Shark';
import Wave from '../components/Wave';
import SpeechBubble from '../components/SpeechBubble';
import Overview from '../components/Overview';

export default function OverviewPage() {
  return (
    <View style={styles.container}>
      <BasePage
        pageNumber={2}
        title="overview"
        description="This is the overview page of the SharkEye Computer Vision Game."
      />
      <View style={styles.sharkContainer}>
        <Shark />
      </View>
      <View style={styles.speechBubbleContainer}>
        <SpeechBubble />
      </View>
      <View style={styles.overviewContainer}>
        <Overview />
      </View>

      <View style={styles.navigationContainer}>
        {/* Back button */}
        <View style={styles.backButton}>
          <Link href="/" asChild>
            <BackButton isNavigation={true} />
          </Link>
        </View>

        {/* Continue button */}
        <View style={styles.continueButton}>
          <Link href="/page3" asChild>
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
  overviewContainer: {
    position: 'absolute',
    bottom: 125,     // This will align to bottom
    left: 565,
    zIndex: 1,
    transform: [
      { scale: 0.90 }
    ]
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
    zIndex: 2,  // Waves will be above background
    transform: [
      { scale: 0.3 },
      { rotate: '5deg' }
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
    zIndex: 3, // Ensure navigation buttons are above other elements
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
