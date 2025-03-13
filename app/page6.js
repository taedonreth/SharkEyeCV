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

      <View style={styles.mainContent}>
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

        {/* Shark with Speech Bubble */}
        <View style={styles.sharkSpeechSection}>
          <View style={styles.sharkWrapper}>
            <Shark />
          </View>
          <View style={styles.speechWrapper}>
            <SpeechBubble>
              <ThemedText style={styles.questionText}>What is data?</ThemedText>
              <ThemedText style={styles.questionText}>How is data collected?</ThemedText>
              <ThemedText style={styles.questionText}>What is good vs bad data?</ThemedText>
            </SpeechBubble>
          </View>
        </View>
      </View>

      {/* Footer Navigation */}
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

  return <BasePage pageNumber={6} title=" " description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
  cardsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: '45%',
    alignItems: 'center',
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
    width: '100%',
  },
  labelText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
  sharkSpeechSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  sharkWrapper: {
    marginRight: 20,
  },
  speechWrapper: {
    flex: 1,
  },
  questionText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});
