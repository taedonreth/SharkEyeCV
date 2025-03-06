import React from 'react';
import BasePage from './BasePage';
import Shark from '../../components/Shark'
import { View, StyleSheet } from 'react-native';
import Wave from '../../components/Wave';
import SpeechBubble from '../../components/SpeechBubble';
import ReviewProcess from '../../components/ReviewProcessPage5';
import ReviewProcessAI from '../../components/ReviewProcessAI';
import Arrow from '../../components/Arrow';

export default function Page5() {
  return (
    <View style={styles.container}>
      <BasePage pageNumber={5} />
      <View style={styles.waveContainer}>
        <Wave />
      </View>
      <View style={styles.sharkContainer}>
        <Shark />
      </View>
      <View style={styles.speechBubbleContainer}>
        <SpeechBubble />
      </View>
      <View style={styles.reviewProcessContainer}>
        <ReviewProcess />
      </View>
      <View style={styles.reviewProcessAIContainer}>
        <ReviewProcessAI />
      </View>
      <View style={styles.arrowContainer}>
        <Arrow />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 450,     // This will align to bottom
    left: 650,
    zIndex: 1, 
    transform: [
      { scale: 0.80}
    ]
  },
  reviewProcessContainer: {
    position: 'absolute',
    bottom: -40,     // This will align to bottom
    left: 85,
    zIndex: 1, 
    transform: [
      { scale: 0.80}
    ]
  },
  reviewProcessAIContainer: {
    position: 'absolute',
    bottom: -40,     // This will align to bottom
    left: 800,
    zIndex: 1, 
    transform: [
      { scale: 0.80}
    ]
  },
  waveContainer: {
    position: 'absolute',
    bottom: -80,     // This will align to bottom
    left: -180,
    right: 0,
    zIndex: 1,  // Waves will be above background
  },
  sharkContainer: {
    position: 'absolute',
    top: 450,    // pixels from top
    left: 250,   // pixels from left
    zIndex: 2,
    transform: [
      { scale: 0.75 },
      { rotate: '-5deg' }
    ]
  },
  speechBubbleContainer: {
    position: 'absolute',
    bottom: -75,     // This will align to bottom
    left: 225,
    right: 0,
    zIndex: 2,  // Waves will be above background
    transform: [
      { scale: 0.3 },
      { rotate: '5deg'}
    ],
  }
});