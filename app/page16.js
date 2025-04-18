import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import DumbShark from '../components/dumbshark';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import SharkWrapper from '../components/SharkWrapper';

export default function Page16() {
  const description = (
    <View style={styles.container}>
      {/* Main Content: Shark and Speech Bubble */}
      <View style={styles.mainContent}>
        <View style={styles.sharkSection}>
          <View style={styles.sharkContainer}>
            <SharkWrapper>
              <DumbShark />
            </SharkWrapper>
          </View>
        </View>
        <View style={styles.speechBubbleContainer}>
          <SpeechBubble scale={1.8}>
            <TypewriterText
              text="Now you know how computer vision works!"
              style={styles.speechText}
              typingSpeed={250}
              />
          </SpeechBubble>
        </View>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Link href="/page15" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page17" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={16} title="The End" description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  speechText: {
    fontSize: 36,
    textAlign: 'center',
    color: 'black',
    lineHeight: 44,
    fontWeight: '500',
  },
  sharkContainer: {
    marginTop: 300,
    right: 200,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sharkSection: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    right: 50,
  },
  speechBubbleContainer: {
    position: 'absolute',
    left: 660,
    bottom: 300,
    zIndex: 2,
    width: 250,
  },
  speechBubbleImage: {
    width: '100%',
    height: 400,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});