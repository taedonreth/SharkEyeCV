import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import BasePage from './BasePage';
import DumbShark from '../components/dumbshark';
import SharkIcon from '../components/SharkIcon';
import Surfer from '../components/surfer';
import CorrectButton from '../components/CorrectButton';
import FalseButton from '../components/FalseButton';
import { ThemedText } from '../components/ThemedText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import SharkWrapper from '../components/SharkWrapper';

export default function Page6() {
  const title = " ";
  const description = (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Shark with Speech Bubble */}
        <View style={styles.sharkBubbleWrapper}>
          <View style={styles.sharkPosition}>
            <SharkWrapper>
              <DumbShark />
            </SharkWrapper>
          </View>
          <View style={styles.speechBubbleContainer}>
            <SpeechBubble scale={2.2}>
              <TypewriterText
                text="Let's look at some examples of good and bad data!"
                style={styles.speechText}
                typingSpeed={40}
              />
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
    justifyContent: 'center',
    marginTop: 150,
    width: '100%',
    padding: 10,
    gap: 100,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#a19f9f',
    padding: 20,
    width: '30%',
    height: 'auto',
    minHeight: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  goodCard: {},
  badCard: {},
  cardImage: {
    position: 'relative',
    height: 150,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  correctButton: {
    position: 'absolute',
    bottom: -35,
    right: 50,
    transform: [{ scale: 0.8 }],
  },
  falseButton: {
    position: 'absolute',
    bottom: 100,
    left: 130,
    transform: [{ scale: 0.8 }],
  },
  label: {
    backgroundColor: '#4FD1C5',
    position: 'absolute',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    width: '50%',
    top: 270,
  },
  labelText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
  sharkBubbleWrapper: {
    width: 300,
    height: 250,
    position: 'relative',
    marginLeft: 150,
    marginTop: -200,
    zIndex: 10,
    transform: [{ scale: 0.9 }],
  },
  sharkPosition: {
    marginLeft: -340,
    marginTop: 250,
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: 100,
    left: 350,
    zIndex: 2,
    width: 250,
  },
  speechText: {
    fontSize: 36,
    textAlign: 'center',
    color: 'black',
    lineHeight: 44,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
    paddingHorizontal: 0,
  },
});
