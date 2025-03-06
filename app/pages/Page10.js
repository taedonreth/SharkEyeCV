import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import BasePage from './BasePage';
import RealShark from '../../components/RealShark'; // Import RealShark component
import Wave from '../../components/Wave'; // Import the Wave component
import RealSharkLabel from '../../components/realSharklabel';

export default function Page10() {
  const title = " ";
  const description = (
    <View style={styles.customContent}>
      {/* Wave positioned absolutely at the bottom */}
      <View style={styles.waveWrapper}>
        <Wave />
      </View>

      {/* RealShark Component */}
      <View style={styles.realSharkContainer}>
        <RealShark />
      </View>

      {/* RealSharkLabel Component */}
      <View style={styles.realSharkLabelContainer}>
        <RealSharkLabel />
      </View>



    </View>
  );

  return <BasePage pageNumber={10} title={title} description={description} />;
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
    bottom: -330, // Ensures it stays at the bottom
    width: '100%',
    zIndex: -1, // Pushes it to the background
    left: -750,
    transform: [{ scale: 1 }],
  },
  realSharkContainer: {
    position: 'absolute',
    top: -350, // Adjust position as needed
    left: -500, // Adjust position as needed
    zIndex: 1, // Ensure it's above other elements
    transform: [{ scale: 0.6 }], // Adjust scale as needed
    borderWidth: 0, // Debugging: Add border to check if container is visible
    borderColor: 'red', // Debugging: Add border to check if container is visible
  },
  realSharkLabelContainer: {
    position: 'absolute',
    top: 150, // Adjust position as needed
    left: -500, // Adjust position as needed
    zIndex: 1, // Ensure it's above other elements
    transform: [{ scale: 0.6 }], // Adjust scale as needed
    borderWidth: 0, // Debugging: Add border to check if container is visible
    borderColor: 'red', // Debugging: Add border to check if container is visible
  },
  labelPromptContainer: {
    position: 'absolute',
    top: 300, // Adjust position as needed
    left: 50, // Adjust position as needed
    zIndex: 1, // Ensure it's above other elements
  },
  labelPromptText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20, // Adjust position as needed
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    zIndex: 1, // Ensure buttons are above other elements
  },

});