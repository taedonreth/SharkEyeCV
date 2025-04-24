import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import MurkySharkFramingGame from '../components/MurkySharkFramingGame';
import DumbShark from '../components/dumbshark';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import SharkWrapper from '../components/SharkWrapper';
import Goggles from '../components/goggles';

import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page12() {
  const description = (
    <View style={styles.container}>
      {/* Main Content: BackDrop, AnswerBox and Shark */}
      <View style={styles.mainContent}>
        {/* Shark with Speech Bubble */}
        <View style={styles.sharkBubbleWrapper}>
          <View style={styles.sharkPosition}>
            <SharkWrapper>
              <View style={styles.gogglesContainer}>
                <Goggles />
              </View>
            </SharkWrapper>
          </View>
          
          {/* Speech bubble positioned above the shark */}
          <View style={styles.speechBubbleContainer}>
            <SpeechBubble scale={1.3}>
              <TypewriterText
                text="The previous training was too simple! Let's try a different approach!"
                style={styles.speechText}
                typingSpeed={150}
              />
            </SpeechBubble>
          </View>
        </View>

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
    position: 'relative',
  },
  sharkBubbleWrapper: {
    position: 'absolute',
    top: 80,
    left: 30,
    zIndex: 10,
  },
  sharkPosition: {
    transform: [{ scale: 1 }],
  },
  gogglesContainer: {
    position: 'absolute',
    zIndex: 3,
    top: 50,  // Adjust this value to move goggles up/down
    left: -220, // Adjust this value to move goggles left/right
    transform: [
      { scaleX: -1 }, // This flips the goggles horizontally
      { scale: 0.7 }  // This makes the goggles 70% of their original size
    ],
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: -70,
    left: 0,
    zIndex: 2,
    width: 320,
  },
  speechText: {
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
    lineHeight: 30,
    fontWeight: '500',
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