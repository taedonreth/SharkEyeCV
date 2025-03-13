import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import { Link } from 'expo-router';
import ContinueButton from '../components/ContinueButton';
import Shark from '../components/Shark';
import SpeechBubble from '../components/SpeechBubble';
import { ThemedText } from '../components/ThemedText';

export default function Index() {
  const title = " ";
  const description = (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.mainContent}>

        {/* Shark + Bubble in the same wrapper, using relative positioning */}
        <View style={styles.sharkBubbleWrapper}>
          {/* Wrap Shark in a View that you can style/transform */}
          <View style={styles.sharkPosition}>
            <Shark />
          </View>

          <View style={styles.bubbleOverlap}>
            <SpeechBubble />
          </View>
        </View>

      </View>

      {/* Footer with the Continue button */}
      <View style={styles.footerContainer}>
        <Link href="/overview" asChild>
          <ContinueButton isNavigation={false} />
        </Link>
      </View>
    </View>
  );

  return (
    <BasePage
      pageNumber={1}
      title={title}
      description={description}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    // Center everything in the main area
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Wrapper for both Shark and Bubble
  sharkBubbleWrapper: {
    width: 300,  // tweak
    height: 250, // tweak
    position: 'relative',
    transform: [{ scale: 0.9 }],
    // borderWidth: 1, borderColor: 'red', // enable for debugging
  },
  // Optional: additional styling for Shark
  sharkPosition: {
    marginLeft: -340,
    marginTop: 0,
    transform: [{ scale: 0.9 }],
  },
  // Absolutely position the bubble so it overlaps the Shark
  bubbleOverlap: {
    position: 'absolute',
    top: -300,          // Adjust to move bubble up/down
    right: 0,      // Adjust to move bubble left/right
    width: 250,      // So text wraps nicely
    transform: [{ scale: 0.45, rotate: '5deg' }],
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 120,
  },
});
