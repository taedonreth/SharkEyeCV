import React from 'react';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import { View, StyleSheet } from 'react-native';
import Wave from '../components/Wave';
import SpeechBubble from '../components/SpeechBubble';
import IntroToBenioff from '../components/IntroToBenioff';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import { useEffect } from 'react';

export default function Page3() {
  useEffect(() => {
    console.log("Page 3 Loaded");
  }, []);
  return (
    <View style={styles.container}>
      <BasePage pageNumber={3} />
      <View style={styles.waveContainer}>
        <Wave />
      </View>
      <View style={styles.sharkContainer}>
        <Shark />
      </View>
      <View style={styles.speechBubbleContainer}>
        <SpeechBubble />
      </View>
      <View style={styles.introToBenioffContainer}>
        <IntroToBenioff />
      </View>

      <View style={styles.navigationContainer}>
        {/* Back button */}
        <View style={styles.backButton}>
          <Link href="/overview" asChild>
            <BackButton isNavigation={true} />
          </Link>
        </View>

        {/* Continue button */}
        <View style={styles.continueButton}>
          <Link href="/page4" asChild>
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
  introToBenioffContainer: {
    position: 'absolute',
    bottom: -60,
    left: 65,
    zIndex: 1,
    transform: [
      { scale: 0.70 }
    ]
  },
  waveContainer: {
    position: 'absolute',
    bottom: -80,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  sharkContainer: {
    position: 'absolute',
    top: 300,
    left: -150,
    zIndex: 2,
    transform: [
      { scale: 0.75 },
      { rotate: '-5deg' }
    ]
  },
  speechBubbleContainer: {
    position: 'absolute',
    bottom: 50,
    left: -350,
    right: 0,
    zIndex: 2,
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