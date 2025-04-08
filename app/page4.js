import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import DumbShark from '../components/dumbshark';
import ReviewProcess from '../components/ReviewProcess';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page4() {
  const title = " ";
  const description = (
    <View style={styles.container}>
      {/* Main scene content */}
      <View style={styles.mainContent}>
        <View style={styles.contentRow}>
          {/* Left side container for Shark and Speech Bubble */}
          <View style={styles.leftContainer}>
            {/* Speech bubble positioned above the shark */}
            <View style={styles.speechBubbleContainer}>
              <SpeechBubble scale={2.2}>
                <TypewriterText
                  text="Let me show you how we review data!"
                  style={styles.speechText}
                  typingSpeed={40}
                />
              </SpeechBubble>
            </View>
            {/* Shark below the speech bubble */}
            <View style={styles.sharkContainer}>
              <DumbShark />
            </View>
          </View>

          {/* Right side container for Overview */}
          <View style={styles.rightContainer}>
            <View style={styles.reviewProcessContainer}>
              <ReviewProcess />
            </View>
          </View>
        </View>
      </View>
      {/* Navigation Footer */}
      <View style={styles.footerContainer}>
        <Link href="/page3" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page5" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={4} title={title} description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  speechText: {
    fontSize: 36,
    textAlign: 'center',
    color: 'black',
    lineHeight: 44,
    fontWeight: '500',
  },
  sceneContainer: {
    alignItems: 'center',
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
  sharkContainer: {
    marginTop: 200,
    zIndex: 1,
    marginLeft: -340,
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: 80,
    left: 210,
    zIndex: 2,
    width: 250,
  },
  reviewProcessContainer: {
    transform: [{ scale: 0.75 }],
    right: 260,
    top: 5,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});
