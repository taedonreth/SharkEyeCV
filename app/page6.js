import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import SharkIcon from '../components/SharkIcon';
import Surfer from '../components/surfer';
import CorrectButton from '../components/CorrectButton';
import FalseButton from '../components/FalseButton';
import SpeechBubble from '../components/SpeechBubble';
import { ThemedText } from '../components/ThemedText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page6() {
  const title = " ";
  const description = (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Shark with Speech Bubble */}
        <View style={styles.sharkBubbleWrapper}>
          <View style={styles.sharkPosition}>
            <Shark />
          </View>
          <View style={styles.speechBubbleContainer}>
            <SpeechBubble>
              <ThemedText style={styles.questionText}>What is data?</ThemedText>
              <ThemedText style={styles.questionText}>How is data collected?</ThemedText>
              <ThemedText style={styles.questionText}>What is good vs bad data?</ThemedText>
            </SpeechBubble>
          </View>
        </View>

        {/* Cards Section */}
        <View style={styles.cardsSection}>
          {/* Good Data Card */}
          <View style={[styles.card, styles.goodCard]}>
            <View style={styles.cardImage}>
              <SharkIcon />
              <View style={styles.correctButton}>
                <CorrectButton />
              </View>
            </View>
            <View style={styles.label}>
              <ThemedText style={styles.labelText}>Easy, recognizable</ThemedText>
              <ThemedText style={styles.labelText}>photo!</ThemedText>
            </View>
          </View>

          {/* Bad Data Card */}
          <View style={[styles.card, styles.badCard]}>
            <View style={styles.cardImage}>
              <Surfer />
              <View style={styles.falseButton}>
                <FalseButton />
              </View>
            </View>
            <View style={styles.label}>
              <ThemedText style={styles.labelText}>Bad, irrelevant</ThemedText>
              <ThemedText style={styles.labelText}>photo</ThemedText>
            </View>
          </View>
        </View>
      </View>

      {/* Footer Navigation - Now at the same level as mainContent */}
      <View style={styles.footer}>
        <Link href="/page5" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page7" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={6} title={title} description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardsSection: {
    flexDirection: 'row',
    justifyContent: 'center', // Changed from space-around to center
    marginTop: 150,
    width: '100%',
    padding: 10,
    gap: 30, // Added gap to control space between cards
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '40%',
    height: 'auto',
    minHeight: 300,
    // Use flexbox for layout within the card
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // This pushes content to top and bottom
    alignItems: 'center',
    // Other styles remain the same
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goodCard: {
    // You may change the background if needed
  },
  badCard: {
    // For example, you could use a different background color here
  },
  cardImage: {
    position: 'relative',
    height: 150,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  correctButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: [{ scale: 0.8 }],
  },
  falseButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: [{ scale: 0.8 }],
  },
  label: {
    backgroundColor: '#4FD1C5',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    width: '100%', // This ensures the label spans the full width of the card
    // Optional - to ensure it sits at the bottom
    marginTop: 'auto', // This pushes the label to the bottom if you use flexbox
  },
  labelText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
  // New sharkBubbleWrapper replacing sharkSpeechSection
  sharkBubbleWrapper: {
    width: 300,
    height: 250,
    position: 'relative',
    marginLeft: 150,
    marginTop: -200,
    zIndex: 10,
    transform: [{ scale: 0.9 }],
    //borderWidth: 1, 
    //borderColor: 'red' // Uncomment for debugging
  },
  // Styling for Shark position
  sharkPosition: {
    marginLeft: -340,
    marginTop: 190,
    transform: [{ scale: 0.8 }],
    //borderWidth: 1,
    //borderColor: 'blue'
  },
  // Absolutely position the bubble so it can overlap the Shark
  speechBubbleContainer: {
    position: 'absolute',
    top: -110,
    right: -350,
    zIndex: 2,
    transform: [{ scale: 0.35, rotate: '5deg' }],
  },
  // Keep the original styles for the text inside the bubble
  questionText: {
    fontSize: 50,
    fontWeight: 'bold',
    marginVertical: 4,
    lineHeight: 100,
    color: 'black',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
    paddingHorizontal: 0,
  },
});
