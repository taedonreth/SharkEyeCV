import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedView } from '../components/ThemedView';
import { ThemedText } from '../components/ThemedText';
import BasePage from './BasePage';
import { Link } from 'expo-router';
import ContinueButton from '../components/ContinueButton';
import Shark from '../components/Shark';
import SpeechBubble from '../components/SpeechBubble';

export default function Index() {
  return (
    <ThemedView style={styles.container}>
      {/* Renders wave + title + progress bar */}
      <BasePage
        pageNumber={1}
        title="index"
        description="Welcome to SharkEye Computer Vision Game."
      />

      {/* Main content container (below the title/description from BasePage) */}
      <View style={styles.mainContent}>

        {/* Bubble above Shark (stacked vertically) */}
        <View style={styles.bubbleWrapper}>
          <SpeechBubble>
            <ThemedText style={styles.bubbleText}>
              Welcome!{"\n"}
              My name is BotShark.{"\n"}
              Ready to learn about computer vision?...
            </ThemedText>
          </SpeechBubble>
        </View>

        {/* Shark below bubble (rotated/scaled) */}
        <View style={styles.sharkWrapper}>
          <Shark />
        </View>

        {/* Centered Continue button under Shark */}
        <View style={styles.buttonContainer}>
          <Link href="/overview" asChild>
            <ContinueButton />
          </Link>
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
  mainContent: {
    flex: 1,
    alignItems: 'center',      // Center horizontally
    justifyContent: 'center',  // Center vertically
  },

  // Make the bubble larger so it matches your screenshot
  bubbleWrapper: {
    marginBottom: 0,
    transform: [{ scale: 0.9 }], // Adjust as needed
  },
  bubbleText: {
    fontSize: 18,              // Slightly bigger text
    fontWeight: 'bold',
    textAlign: 'center',
  },

  sharkWrapper: {
    marginTop: -30,            // Pull the shark up slightly
    marginBottom: 40,          // Space between shark and button
    transform: [{ scale: 0.8 }, { rotate: '-5deg' }],
  },

  buttonContainer: {
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 0,
    bottom: 10,
  },
});
