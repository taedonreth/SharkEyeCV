import React from 'react';
import BasePage from './BasePage';
import Shark from '../../components/Shark'
import { View, StyleSheet } from 'react-native';
import Wave from '../../components/Wave';
import SpeechBubble from '../../components/SpeechBubble';
import Overview from '../../components/Overview';

export default function OverviewPage() {
  return (
    <View style={styles.container}>
      <BasePage pageNumber={2} />
      <View style={styles.waveContainer}>
        <Wave />
      </View>
      <View style={styles.sharkContainer}>
        <Shark />
      </View>
      <View style={styles.speechBubbleContainer}>
        <SpeechBubble />
      </View>
      <View style={styles.overviewContainer}>
        <Overview />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  overviewContainer: {
    position: 'absolute',
    bottom: 125,     // This will align to bottom
    left: 565,
    zIndex: 1, 
    transform: [
      { scale: 0.90}
    ]
  },
  waveContainer: {
    position: 'absolute',
    bottom: -80,     // This will align to bottom
    left: 0,
    right: 0,
    zIndex: 1,  // Waves will be above background
  },
  sharkContainer: {
    position: 'absolute',
    top: 300,    // pixels from top
    left: -150,   // pixels from left
    zIndex: 2,
    transform: [
      { scale: 0.75 },
      { rotate: '-5deg' }
    ]
  },
  speechBubbleContainer: {
    position: 'absolute',
    bottom: 100,     // This will align to bottom
    left: -350,
    right: 0,
    zIndex: 2,  // Waves will be above background
    transform: [
      { scale: 0.3 },
      { rotate: '5deg'}
    ],
  }
});