import React from 'react';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import SharkWrapper from '../components/SharkWrapper';
import { View, StyleSheet } from 'react-native';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import ProgressiveCards from '../components/ProgressiveCards';

export default function Page14() {
  const description = (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.mainContent}>
        <View style={styles.contentRow}>
          <View style={styles.leftContainer}>
            <View style={styles.speechBubbleContainer}>
              <SpeechBubble scale={1.5}>
                <TypewriterText
                  text="Let me explain how we train our model!"
                  style={styles.speechText}
                  typingSpeed={250}
                  />
              </SpeechBubble>
            </View>
            <View style={styles.sharkContainer}>
              <SharkWrapper>
                <Shark />
              </SharkWrapper>
            </View>
          </View>

          <View style={styles.rightContainer}>
            <View style={styles.cardsContainer}>
              <ProgressiveCards />
            </View>
          </View>
        </View>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Link href="/page13" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page15" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={14} title=" " description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 10,
    position: 'relative',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  cardsContainer: {
    position: 'absolute',
    right: 50,
    top: -290,
  },
  sharkContainer: {
    marginTop: 200,
    zIndex: 1,
    marginLeft: -340,
    transform: [{ scale: 0.9 }],
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: 75,
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
  },
});
