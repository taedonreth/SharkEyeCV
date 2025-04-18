import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import DumbShark from '../components/dumbshark';
import SimplifiedCVWorkflow from '../components/SimplifiedCVWorkflow';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import SharkWrapper from '../components/SharkWrapper';

export default function Page5() {
  const title = "Computer Vision Workflow";
  const description = (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.mainContent}>
        <View style={styles.contentRow}>
          {/* Left side container for Shark and Speech Bubble */}
          <View style={styles.leftContainer}>
            {/* Speech bubble positioned above the shark */}
            <View style={styles.speechBubbleContainer}>
              <SpeechBubble scale={1.7}>
                <TypewriterText
                  text="Here's how we teach computers to see like we do!"
                  style={styles.speechText}
                  typingSpeed={250}
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

          {/* Right side container for Workflow */}
          <View style={styles.rightContainer}>
            <View style={styles.workflowContainer}>
              <SimplifiedCVWorkflow />
            </View>
          </View>
        </View>
      </View>

      {/* Footer with navigation buttons */}
      <View style={styles.footerContainer}>
        <Link href="/page4" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page6" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={5} title={title} description={description} />;
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
  speechText: {
    fontSize: 36,
    textAlign: 'center',
    color: 'black',
    lineHeight: 44,
    fontWeight: '500',
  },
  sharkContainer: {
    marginTop: 200,
    zIndex: 1,
    marginLeft: -340,
    transform: [{ scale: 1.1 }],
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: 120,
    left: 210,
    zIndex: 2,
    width: 250,
  },
  workflowContainer: {
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
