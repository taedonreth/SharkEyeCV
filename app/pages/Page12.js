import React from 'react';
import BasePage from './BasePage';
import Shark from '../../components/Shark'
import { View, StyleSheet } from 'react-native';
import Wave from '../../components/Wave';
import BackDrop from '../../components/BackDropPage12';
import AnswerBox from '../../components/AnswerBoxPage12';

export default function Page12() {
  return (
    <View style={styles.container}>
      <BasePage pageNumber={12} />
      <View style={styles.waveContainer}>
        <Wave />
      </View>
      <View style={styles.backdropContainer}>
        <BackDrop />
      </View>
      <View style={styles.answerBoxContainer}>
        <AnswerBox />
      </View>
      <View style={styles.sharkContainer}>
        <Shark />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  waveContainer: {
    position: 'absolute',
    bottom: -80,     // This will align to bottom
    left: 0,
    right: 0,
    zIndex: 1,  // Waves will be above background
  },
  backdropContainer: {
    position: 'absolute',
    top: '50%',           // Center vertically
    left: '50%',          // Center horizontally
    transform: [          // Offset by half of the element's size
      { translateX: -500 }, // Adjust this value based on your BackDrop width
      { translateY: -300 },  // Adjust this value based on your BackDrop height
      { scale: 0.80 }
    ],
    zIndex: 2,           // BackDrop layer
  },
  answerBoxContainer: {
    position: 'absolute',
    top: 660,    // Adjust this value to move up/down
    left: '26%', // Center horizontally
    transform: [
      { translateX: -150 }, // Adjust based on AnswerBox width to center it
      { scale: 0.80 }
    ],
    zIndex: 2,
  },
  sharkContainer: {
    position: 'absolute',
    top: 75,    // pixels from top
    left: -220,   // pixels from left
    zIndex: 1,
    transform: [
      { scale: 0.60 },
      { rotate: '20deg' }
    ]
  }
});
