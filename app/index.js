import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import { Link } from 'expo-router';
import ContinueButton from '../components/ContinueButton';
import DumbShark from '../components/dumbshark';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import SharkWrapper from '../components/SharkWrapper';

export default function Index() {
  const title = "Welcome";
  const description = (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.mainContent}>
        {/* Shark + Bubble in the same wrapper, using relative positioning */}
        <View style={styles.sharkBubbleWrapper}>
          {/* Wrap Shark in SharkWrapper for animation */}
          <SharkWrapper style={styles.sharkPosition}>
            <DumbShark />
          </SharkWrapper>

          <View style={styles.speechBubbleContainer}>
            <SpeechBubble scale={2.2}>
              <TypewriterText
                text={`Welcome!\n My name is Sharkbot.\n Ready to learn about\n computer vision?...`}
                style={styles.speechText}
                typingSpeed={250}
              />
            </SpeechBubble>
          </View>
        </View>
      </View>

      {/* Footer with the Continue button */}
      <View style={styles.footerContainer}>
        <Link href="/overview" asChild>
          <ContinueButton isNavigation={false} />
        </Link>
      </View>
    </View>
  );

  return (
    <BasePage
      pageNumber={1}
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
    alignItems: 'center',
  },
  sharkBubbleWrapper: {
    width: 300,
    height: 250,
    position: 'relative',
    marginTop: 90,
  },
  sharkPosition: {
    marginLeft: -400,
    marginTop: 25,
    transform: [{ scale: 2 }],
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: -120,
    right: 0,
    width: 250,
    zIndex: 2,
  },
  speechText: {
    fontSize: 36,
    textAlign: 'center',
    color: 'black',
    lineHeight: 44,
    fontWeight: '500',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 120,
  },
});
