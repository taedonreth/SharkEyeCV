import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import SpeechBubble from '../components/SpeechBubble';
import BackDrop from '../components/BackDropPage15';
import YesButton from '../components/YesButton';
import NoButton from '../components/NoButton';
import Question from '../components/QuestionPage15';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import { ThemedText } from '../components/ThemedText';

export default function Page15() {
  const description = (
    <View style={styles.container}>
      {/* Main scene content */}
      <View style={styles.mainContent}>
        <View style={styles.contentRow}>
          {/* Left side container for Shark and Speech Bubble */}
          <View style={styles.leftContainer}>
            {/* Speech bubble positioned above the shark */}
            <View style={styles.speechBubbleContainer}>
              <SpeechBubble style={styles.speechBubble}>
                <ThemedText style={styles.bubbleText}>
                  Hmmm..{'\n'}I see a dog!
                </ThemedText>
              </SpeechBubble>
            </View>
            
            {/* Shark below the speech bubble */}
            <View style={styles.sharkContainer}>
              <Shark />
            </View>
          </View>

          {/* Right side container for BackDrop and Question */}
          <View style={styles.rightContainer}>
            <View style={styles.backdropContainer}>
              <BackDrop style={styles.backdrop} />
            </View>
            
            <View style={styles.questionContainer}>
              <Question style={styles.question} />
            </View>
          </View>
        </View>

        {/* Bottom section: Yes and No buttons */}
        <View style={styles.buttonsRow}>
          <YesButton />
          <NoButton />
        </View>
      </View>

      {/* Footer navigation */}
      <View style={styles.footerContainer}>
        <Link href="/page14" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page16" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={15} description={description} />;
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
    position: 'relative',
  },
  sharkContainer: {
    zIndex: 1,
    marginLeft: -340,
    transform: [{ scale: 0.7 }], // Adjust scale if needed
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: -200,
    left: 150,
    zIndex: 2, // Ensure speech bubble appears above other elements
    transform: [{ scale: 0.3 }], // Adjust scale if needed
  },
  backdropContainer: {
    transform: [{ scale: 0.75 }],
    top: 25,
    right: 100,
    marginBottom: 20,
  },
  questionContainer: {
    position: 'absolute',
    top: 550,
    right: 420,
    zIndex: 3,
    transform: [{ scale: 0.75 }],
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    top: -85,
    right: -465,
    gap: 60, // Very small gap between buttons
    transform: [{ scale: 0.75 }]
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
  bubbleText: {
    fontSize: 90,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    lineHeight: 100,
    transform: [{ scale: 1.25 }]
  },
});
