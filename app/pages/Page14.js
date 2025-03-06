import React from 'react';
import BasePage from './BasePage';
import Shark from '../../components/Shark'
import { View, StyleSheet } from 'react-native';
import Wave from '../../components/Wave';
import SpeechBubble from '../../components/SpeechBubble';
import TextBox from '../../components/TextBoxPage14';

export default function Page14() {
  return (
    <View style={styles.container}>
      <BasePage pageNumber={14} />
      <View style={styles.sharkContainer}>
        <Shark />
      </View>
      <View style={styles.waveContainer}>
        <Wave />
      </View>
      <View style={styles.speechBubbleContainer}>
        <SpeechBubble />
      </View>
      <View style={styles.textBoxContainer}>
        <TextBox />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  textBoxContainer: {
    position: 'absolute',
    bottom: -30,     // This will align to bottom
    left: 200,
    zIndex: 1,  // Waves will be above background
    transform: [
      { scale: 0.80}
    ]
  },
  waveContainer: {
    position: 'absolute',
    bottom: -80,     // This will align to bottom
    left: -100,
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