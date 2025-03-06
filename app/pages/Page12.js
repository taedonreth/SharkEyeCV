import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import Shark from '../../components/Shark'; // Import Shark component
import RealSharkLabel from '../../components/realSharklabel';
import SpeechBubble from '../../components/SpeechBubble';
import { ThemedText } from '../../components/ThemedText';
import Wave from '../../components/Wave'; // Import the Wave component
import BackDrop from '../../components/BackDrop'; // Import the BackDrop component

export default function Page12() {
  const title = " ";
  const description = (
    <View style={styles.customContent}>
      {/* BackDrop positioned absolutely at the bottom */}
      <View style={styles.backDropWrapper}>
        <BackDrop />
      </View>

      {/* Wave positioned absolutely at the bottom */}
      <View style={styles.waveWrapper}>
        <Wave />
      </View>

      {/* Shark and CuteShark with Speech Bubble */}
      <View style={styles.sharkSection}>
        {/* Shark positioned on the left */}
        <View style={styles.sharkContainer}>
          <Shark />
        </View>

        {/* Speech Bubble */}
        <View style={styles.bubbleWrapper}>
          <SpeechBubble>
            <ThemedText style={styles.questionText}>What is data?</ThemedText>
            <ThemedText style={styles.questionText}>How is data collected?</ThemedText>
            <ThemedText style={styles.questionText}>What is good vs bad data?</ThemedText>
          </SpeechBubble>
        </View>
      </View>

      {/* RealSharkLabel Component */}
      <View style={styles.realSharkLabelContainer}>
        <RealSharkLabel />
      </View>

    </View>
  );

  return <BasePage pageNumber={12} title={title} description={description} />;
}

const styles = StyleSheet.create({
  customContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 5, // Reduced padding to move everything up
  },
  realSharkLabelContainer: {
    position: 'absolute',
    top: 150,
    left: 0, // Center horizontally
    right: 0, // Center horizontally
    alignItems: 'center', // Center the content
    zIndex: 1,
    transform: [{ scale: 0.6 }],
    borderWidth: 0,
    borderColor: 'red',
  },
  backDropWrapper: {
    position: 'absolute',
    bottom: -150,
    left: -300,
    width: '100%',
    zIndex: 2, // Ensure it's behind other elements
    transform: [{ scale: 0.65 }],
  },
  waveWrapper: {
    position: 'absolute',
    bottom: -300, // Ensures it stays at the bottom
    width: '100%',
    zIndex: -1, // Pushes it to the background
    left: -900,
    transform: [{ scale: 1.1 }],
  },
  sharkSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 80,
    width: '90%',
    justifyContent: 'space-between', // Adjust spacing between sharks
    position: 'relative',
    transform: [{ scale: 0.5 }],
    left: -450, // Increased negative value to move further left
  },
  sharkContainer: {
    position: 'absolute',
    bottom: 100,
    left: -700, // Adjusted to better align with the center
    transform: [{ scale: 1 }, { rotate: '25deg' }],
    zIndex: 1,
  },
  bubbleWrapper: {
    position: 'absolute',
    left: -325, // Adjusted to match new shark position
    top: -1025, // Adjusted to better align with shark
    width: 200,
    transform: [{ scale: 0.3 }],
  },
  questionText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '200%',
    paddingHorizontal: 40,
    marginTop: 0,
    marginBottom: -100,
  },
  labelText: {
    color: 'white',
    textAlign: 'center',
  },
});