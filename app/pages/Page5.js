import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import Shark from '../../components/Shark';
import SharkIcon from '../../components/SharkIcon';
import Surfer from '../../components/surfer';
import CorrectButton from '../../components/CorrectButton';
import FalseButton from '../../components/FalseButton';
import SpeechBubble from '../../components/SpeechBubble';
import { ThemedText } from '../../components/ThemedText';
import Wave from '../../components/Wave'; // Import the Wave component

export default function Page5() {
  const title = " ";
  const description = (
    <View style={styles.customContent}>
      {/* Wave positioned absolutely at the bottom */}
      <View style={styles.waveWrapper}>
        <Wave />
      </View>

      {/* Example Cards - Moved up higher on the screen */}
      <View style={styles.cardsContainer}>
        {/* Good Data Example */}
        <View style={styles.card}>
          <View style={styles.cardImageContainer}>
            <SharkIcon />
            <View style={styles.correctButtonContainer}>
              <CorrectButton />
            </View>
          </View>
          <View style={styles.goodLabel}>
            <ThemedText style={styles.labelText}>Easy, recognizable</ThemedText>
            <ThemedText style={styles.labelText}>photo!</ThemedText>
          </View>
        </View>

        {/* Bad Data Example */}
        <View style={styles.card}>
          <View style={styles.cardImageContainer}>
            <Surfer />
            <View style={styles.falseButtonContainer}>
              <FalseButton />
            </View>
          </View>
          <View style={styles.badLabel}>
            <ThemedText style={styles.labelText}>Bad, irrelevant</ThemedText>
            <ThemedText style={styles.labelText}>photo</ThemedText>
          </View>
        </View>
      </View>
      
      {/* Shark with Speech Bubble */}
      <View style={styles.sharkSection}>
        <View style={styles.sharkContainer}>
          <Shark />
        </View>
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

  return <BasePage pageNumber={5} title={title} description={description} />;
}

const styles = StyleSheet.create({
  customContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 5, // Reduced padding to move everything up
  },
  waveWrapper: {
    position: 'absolute',
    bottom: -225, // Ensures it stays at the bottom
    width: '100%',
    zIndex: -1, // Pushes it to the background
    left:-480,
    transform: [{ scale: 1.2 }],
  },
  sharkSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 80,
    width: '90%',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  sharkContainer: {
    position: 'absolute',
    bottom: 0,
    left: -702,
    transform: [{ scale: 0.45 }],
    zIndex: 1,
  },
  bubbleWrapper: {
    position: 'absolute',
    left: -350,
    top: -800,
    width: 200,
    transform: [{ scale: 0.25 }],
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
  correctButtonContainer: {
    position: 'absolute',
    bottom: -10,
    right: 50,
    transform: [{ scale: 0.3 }],
  },
  falseButtonContainer: {
    position: 'absolute',
    top: -40,
    right: 40,
    transform: [{ scale: 0.3 }],
  },
  goodLabel: {
    position: 'absolute',
    top: 205,
    backgroundColor: '#4FD1C5',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    width: '60%',
    minHeight: 60,
  },
  badLabel: {
    position: 'absolute',
    top: 205,
    backgroundColor: '#F56565',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    width: '60%',
    minHeight: 60,
  },
  labelText: {
    color: 'white',
    textAlign: 'center',
  },
});

