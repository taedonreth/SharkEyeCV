import React from 'react';
import BasePage from './BasePage';
import Shark from '../../components/Shark'
import { View, StyleSheet } from 'react-native';
import Wave from '../../components/Wave';
import SpeechBubble from '../../components/SpeechBubble';
import Resources from '../../components/Resources';

export default function Page17() {
  return (
    <View style={styles.container}>
      <BasePage pageNumber={17} />
      <View style={styles.sharkContainer}>
        <Shark />
      </View>
      <View style={styles.waveContainer}>
        <Wave />
      </View>
      <View style={styles.speechBubbleContainer}>
        <SpeechBubble />
      </View>
      <View style={styles.resourcesContainer}>
        <Resources />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  resourcesContainer: {
    position: 'absolute',
    top: '48%',           // Center vertically
    left: '80%',          // Center horizontally
    transform: [          // Offset by half of the element's size
      { translateX: -500 }, // Adjust this value based on your BackDrop width
      { translateY: -300 },  // Adjust this value based on your BackDrop height
      { scale: 0.70 }
    ],
    zIndex: 2,           // BackDrop layer
  },
  waveContainer: {
    position: 'absolute',
    bottom: -80,     // This will align to bottom
    left: -250,
    right: 0,
    zIndex: 1,  // Waves will be above background
  },
  sharkContainer: {
    position: 'absolute',
    top: 300,    // pixels from top
    left: -50,   // pixels from left
    zIndex: 2,
    transform: [
      { scale: 0.70 },
      { rotate: '-5deg' }
    ]
  },
  speechBubbleContainer: {
    position: 'absolute',
    bottom: 80,     // This will align to bottom
    left: -200,
    right: 0,
    zIndex: 3,  // Waves will be above background
    transform: [
      { scale: 0.3 },
      { rotate: '5deg'}
    ],
  }
});