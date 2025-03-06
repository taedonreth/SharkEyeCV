import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import Shark from '../../components/Shark'; // Import Shark component
import SpeechBubble from '../../components/SpeechBubble';
import { ThemedText } from '../../components/ThemedText';
import Wave from '../../components/Wave'; // Import the Wave component

export default function Page16() {
  const title = " ";
  const description = (
    <View style={styles.customContent}>

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
    </View>
  );

  return <BasePage pageNumber={16} title={title} description={description} />;
}

const styles = StyleSheet.create({
  customContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 5, // Reduced padding to move everything up
  },
  backDropWrapper: {
    position: 'absolute',
    bottom: -200,
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
    transform: [{ scale: 1 }],
  },
  sharkSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 80,
    width: '90%',
    justifyContent: 'space-between', // Adjust spacing between sharks
    position: 'relative',
    transform: [{ scale: 0.8 }],
    left: -100,
  },
  sharkContainer: {
    position: 'absolute',
    bottom: -300,
    left: -400,
    transform: [{ scale: .85 }], // Combine scale and rotate
    zIndex: 1,
  },
  bubbleWrapper: {
    position: 'absolute',
    left: 0,
    top: -600,
    width: 200,
    transform: [{ scale: 0.4 }], // Combine scale and rotate
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 20, // Adjust position as needed
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    zIndex: 2, // Ensure buttons are above other elements
  },
  correctButtonContainer: {
    left: -100,
    top: 175,
    transform: [{ scale: 0.55 }], // Adjust scale as needed
  },
  falseButtonContainer: {
    left: -100,
    top: 175,
    transform: [{ scale: 0.55 }],
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
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '40%',
    marginHorizontal: 10,
  },
  cardImageContainer: {
    position: 'relative',
    marginBottom: 20,
    height: 180,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    color: 'white',
    textAlign: 'center',
  },
});