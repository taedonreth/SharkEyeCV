import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import CuteShark from '../components/CuteShark';
import CorrectButton from '../components/CorrectButton';
import FalseButton from '../components/FalseButton';
import SpeechBubble from '../components/SpeechBubble';
import { ThemedText } from '../components/ThemedText';
import BackDrop from '../components/BackDrop';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page7() {
  const title = " ";
  const description = (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        {/* Left section with shark and speech bubble */}
        <View style={styles.leftSection}>
          <View style={styles.sharkContainer}>
            <Shark />
          </View>
        </View>
        
        <View style={styles.speechBubbleContainer}>
          <SpeechBubble>
            <ThemedText style={styles.questionText}>
              Is this photo{'\n'}good or bad?
            </ThemedText>
          </SpeechBubble>
        </View>

        {/* Center content with image and buttons */}
        <View style={styles.centerContent}>
          <View style={styles.imageContainer}>
            <View style={styles.cuteSharkContainer}>
              <CuteShark />
            </View>
            <View style={styles.redBorderFrame} />
          </View>
          
          {/* Buttons Row - moved inside centerContent */}
          <View style={styles.buttonsRow}>
            <CorrectButton />
            <FalseButton />
          </View>
        </View>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Link href="/page6" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page8" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={7} title=" " description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  leftSection: {
    width: '30%',
    position: 'relative',
    paddingTop: 100,
  },
  sharkContainer: {
    right: 190,
    bottom: 150,
    transform: [{ scale: 0.65 }, { rotate: '20deg'}],
  },
  speechBubbleContainer: {
    position: 'absolute',
    left: -90,
    top: -350,
    transform: [{ scale: 0.25 }],
    zIndex: 20,
  },
  questionText: {
    fontSize: 70,
    fontWeight: 'bold',
    lineHeight: 36,
    textAlign: 'center',
    color: 'black',
    lineHeight: 100,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    marginRight: 450,
    // marginLeft: 100, // Remove or comment this out
    maxWidth: 800,
    transform: [{ scale: 1.1 }],
  },
  
  imageContainer: {
    width: 700, // Use fixed width instead of percentage
    height: 420, // Use fixed height instead of percentage
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'visible',
    borderWidth: 1,          // Add this
    borderColor: '#E5E5E5',  // Add this - a light gray border
    shadowColor: '#000',
  },
  
  cuteSharkContainer: {
    position: 'absolute',
    transform: [{ scale: 0.8 }], // Make shark larger relative to container
  },
  
  redBorderFrame: {
    position: 'absolute',
    width: 400, // Fixed width
    height: 220, // Fixed height
    borderWidth: 2,
    borderColor: '#F87171',
    borderRadius: 8,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -50,
    width: '100%',
    gap: 90, // Space between buttons
    transform: [{ scale: 0.7 }],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});
