import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import SpeechBubble from '../components/SpeechBubble';
import IntroToBenioff from '../components/IntroToBenioff';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page3() {
  const title = " ";
  const description = (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.mainContent}>
        <View style={styles.contentRow}>
          {/* Left side container for Shark and Speech Bubble */}
          <View style={styles.leftContainer}>
            {/* Speech bubble positioned above the shark */}
            <View style={styles.speechBubbleContainer}>
              <SpeechBubble />
            </View>
            {/* Shark below the speech bubble */}
            <View style={styles.sharkContainer}>
              <Shark />
            </View>
          </View>

          {/* Right side container for Intro to Benioff */}
          <View style={styles.rightContainer}>
            <View style={styles.introContainer}>
              <IntroToBenioff />
            </View>
          </View>
        </View>
      </View>

      {/* Footer with navigation buttons */}
      <View style={styles.footerContainer}>
        <Link href="/overview" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page4" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={3} title={title} description={description} />;
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
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: -200,
    left: 1,
    zIndex: 2, // Ensure speech bubble appears above other elements
    transform: [{ scale: 0.4 }], // Adjust scale if needed
  },
  sharkContainer: {
    marginTop: 200, // Add space above the shark to make room for speech bubble
    zIndex: 1,
    marginLeft: -340,
    transform: [{ scale: 0.7 }], // Adjust scale if needed
  },
  introContainer: {
    width: '100%',
    position: 'absolute',
    right: 500,
    transform: [{ scale: 0.7 }],
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});