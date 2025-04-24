import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import MurkySharkFramingGame from '../components/MurkySharkFramingGame';

import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page12() {
  const description = (
    <View style={styles.container}>
      {/* Main Content: BackDrop, AnswerBox and Shark */}
      <View style={styles.mainContent}>

        {/* Added SharkFramingGame */}
        <View style={styles.gameSection}>
          <MurkySharkFramingGame />
        </View>
      </View>

      {/* Separated Navigation Buttons */}
      <View style={styles.footerContainer}>
        <View style={styles.backButtonContainer}>
          <Link href="/page11" asChild>
            <BackButton isNavigation={true} />
          </Link>
        </View>

        <View style={styles.continueButtonContainer}>
          <Link href="/page13" asChild>
            <ContinueButton isNavigation={true} />
          </Link>
        </View>
      </View>
    </View>
  );
  return <BasePage pageNumber={12} title="Murky Capturing Game" description={description} />;
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
    // Your existing game section styles
  },

  // Container that defines layout
  footerContainer: {
    width: '100%',
    position: 'relative',
    paddingVertical: 25,
  },
  // Independent containers for each button with absolute positioning
  backButtonContainer: {
    position: 'absolute',
    left: 0,
    bottom: 25,
    zIndex: 99,
  },
  continueButtonContainer: {
    position: 'absolute',
    right: 0,
    bottom: 25,
    zIndex: 99,
  }
});