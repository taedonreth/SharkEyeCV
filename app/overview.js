import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import BasePage from './BasePage';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import DumbShark from '../components/dumbshark';
import FlipCardOverview from '../components/FlipCardOverview';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import SharkWrapper from '../components/SharkWrapper';

export default function OverviewPage() {
  const title = "Overview";
  const description = (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.mainContent}>
        <View style={styles.contentRow}>
          {/* Left side container for Shark and Speech Bubble */}
          <View style={styles.leftContainer}>
            {/* Speech bubble positioned above the shark */}
            <View style={styles.speechBubbleContainer}>
              <SpeechBubble scale={1.5}>
                <TypewriterText
                  text={"Oh no! I can't see very well...\nI need these special goggles\nto find my family!"}
                  style={styles.speechText}
                  typingSpeed={100} // Slowed down as discussed
                  />
              </SpeechBubble> 
            </View>
            {/* Shark below the speech bubble */}
            <View style={styles.sharkContainer}>
              <SharkWrapper>
                <DumbShark />
              </SharkWrapper>
            </View>
          </View>

          {/* Right side container for Overview */}
          <View style={styles.rightContainer}>
            <View style={styles.overviewContainer}>
              <FlipCardOverview />
            </View>
          </View>
        </View>
      </View>

      {/* Footer with navigation buttons */}
      <View style={styles.footerContainer}>
        <Link href="/" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page3" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return (
    <BasePage
      pageNumber={2}
      title={title}
      description={description}
    />
  );
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
    fontSize: 25,
    textAlign: 'center',
    color: 'black',
    lineHeight: 44,
    fontWeight: '500',
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
  speechBubbleContainer: {
    position: 'absolute',
    top: 120,
    left: 210,
    zIndex: 2,
    width: 250,
  },
  speechBubbleImage: {
    width: '100%',
    height: 400,
  },
  sharkContainer: {
    marginTop: 200,
    zIndex: 1,
    marginLeft: -340,
    transform: [{ scale: 1.1 }],
  },
  overviewContainer: {
    width: '100%',
    position: 'absolute',
    right: 160,
    transform: [{ scale: 0.8 }],
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});