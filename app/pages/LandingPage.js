import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import NavigationBar from '../../components/NavigationBar';
import ProgressBar1 from '../../components/ProgressBar1';
import Wave from '../../components/Wave'; // Import the Wave component
import Shark from '../../components/Shark'; // Import Shark component
import SpeechBubble from '../../components/SpeechBubble';


export default function LandingPage({ onContinue }) {
  // For the landing page (first page), set progress to 0%
  const progressPercentage = 0;

  return (
    <ThemedView style={styles.container}>
      <NavigationBar />
      <View style={styles.waveWrapper}>
        <Wave />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <ProgressBar1 percentage={progressPercentage} />
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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  waveWrapper: {
    position: 'absolute',
    bottom: -225, // Ensures it stays at the bottom
    width: '100%',
    zIndex: -1, // Pushes it to the background
    left: -480,
    transform: [{ scale: 1.2 }],
  },
  progressContainer: {
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
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
    top: 150, // Positioned below speech bubble
    left: 300,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    transform: [{ scale: .85 }],
    zIndex: 1,
  },
  bubbleWrapper: {
    position: 'absolute',
    left: 300,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    top: -300, // Moved to top area
    width: 200,
    transform: [{ scale: 0.4 }],
    zIndex: 2, // Higher z-index to ensure it's above shark
  },
});
