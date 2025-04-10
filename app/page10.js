import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import SharkFramingGame from '../components/SharkFramingGame';

import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page10() {
  const description = (
    <View style={styles.container}>
      {/* Main Content: BackDrop, AnswerBox and Shark */}
      <View style={styles.mainContent}>

        {/* Added SharkFramingGame */}
        <View style={styles.gameSection}>
          <SharkFramingGame />
        </View>
      </View>

      {/* Separated Navigation Buttons */}
      <View style={styles.footerContainer}>
        <View style={styles.backButtonContainer}>
          <Link href="/page9" asChild>
            <BackButton isNavigation={true} />
          </Link>
        </View>
        <View style={styles.continueButtonContainer}>
          <Link href="/page11" asChild>
            <ContinueButton isNavigation={true} />
          </Link>
        </View>
      </View>
    </View>
  );
  return <BasePage pageNumber={10} title=" " description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameSection: {
    // No specific styles needed
  },

  // Container that defines layout for button positioning
  footerContainer: {
    width: '100%',
    marginTop: 60,
    position: 'relative',
    height: 80, // Give enough height for the buttons
  },
  // Independent containers for each button with absolute positioning
  backButtonContainer: {
    position: 'absolute',
    left: 0,
    bottom: 25, // Moved up 40 pixels from bottom
    zIndex: 99,
  },
  continueButtonContainer: {
    position: 'absolute',
    right: 0,
    bottom: 25, // Moved up 40 pixels from bottom
    zIndex: 99,
  }
});