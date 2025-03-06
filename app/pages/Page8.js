import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BasePage from './BasePage';
import SharkIcon from '../../components/SharkIcon';
import CorrectButton from '../../components/CorrectButton';
import FalseButton from '../../components/FalseButton';
import Wave from '../../components/Wave'; // Import the Wave component
import CroppingRectangle from '../../components/CroppingRectangle'; // Import CroppingRectangle component
import Shark from '../../components/Shark'; // Import Shark component
import SpeechBubble from '../../components/SpeechBubble'; // Import SpeechBubble component

export default function Page5() {
  const title = " ";
  const description = (
    <View style={styles.customContent}>
      {/* Wave positioned absolutely at the bottom */}
      <View style={styles.waveWrapper}>
        <Wave />
      </View>

      {/* Single White Box */}
      <View style={styles.singleBox}>
        {/* Good Box */}
        <View style={styles.boxContent}>
          <View style={styles.iconContainer}>
            <SharkIcon />
            <View style={styles.correctButtonContainer}>
              <CorrectButton />
            </View>
          </View>
          <View style={styles.goodLabel}>
            <Text style={styles.labelText}>Good box!</Text>
          </View>
        </View>

        {/* Bad Box */}
        <View style={styles.boxContent}>
          <View style={styles.iconContainer}>
            <SharkIcon />
            <View style={styles.falseButtonContainer}>
              <FalseButton />
            </View>
          </View>
          <View style={styles.badLabel}>
            <Text style={styles.labelText}>Bad box.</Text>
          </View>
        </View>

        {/* Cropping Rectangle for Good Box */}
        <View style={styles.croppingRectangleGood}>
          <CroppingRectangle />
        </View>

        {/* Cropping Rectangle for Bad Box */}
        <View style={styles.croppingRectangleBad}>
          <CroppingRectangle />
        </View>
      </View>

      {/* Shark Component */}
      <View style={styles.sharkContainer}>
        <Shark />
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
    left: -500,
    transform: [{ scale: 1.4 }],
  },
  singleBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
    width: '200%', // Adjust width as needed
    height: 360,
    marginBottom: 20,
    flexDirection: 'row', // Ensure content is side by side
    justifyContent: 'space-between', // Space out the two boxes
    position: 'relative', // Required for absolute positioning of children
  },
  boxContent: {
    alignItems: 'center',
    width: '45%', // Adjust width as needed
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 10,
    height: 130,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  correctButtonContainer: {
    position: 'absolute',
    top: 130,
    right: 0,
    transform: [{ scale: 0.5 }],
  },
  falseButtonContainer: {
    position: 'absolute',
    top: 130,
    right: 0,
    transform: [{ scale: 0.5 }],
  },
  goodLabel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    width: '100%',
    minHeight: 50,
    top: 80,
  },
  badLabel: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    width: '100%',
    minHeight: 50,
    top: 80,
  },
  labelText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  croppingRectangleGood: {
    position: 'absolute',
    top: 35, // Adjust position as needed
    left: -20, // Adjust position as needed
    zIndex: 1, // Ensure it's above other elements
    transform: [{ scale: 0.65 }],
  },
  croppingRectangleBad: {
    position: 'absolute',
    top: 80, // Adjust position as needed
    right: -70, // Adjust position as needed
    zIndex: 1, // Ensure it's above other elements
    transform: [{ scale: 0.4 }],
  },
  sharkContainer: {
    position: 'absolute',
    bottom: -100, // Adjust position as needed
    left: -700, // Adjust position as needed
    transform: [{ scale: 0.7 }], // Adjust scale as needed
    zIndex: 1, // Ensure it's above other elements
  },
});