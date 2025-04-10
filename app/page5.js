import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import DumbShark from '../components/dumbshark';
import ReviewProcess from '../components/ReviewProcessPage5';
import ReviewProcessAI from '../components/ReviewProcessAI';
import Arrow from '../components/Arrow';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import SharkWrapper from '../components/SharkWrapper';

export default function Page5() {
  const title = " ";
  const description = (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.mainContent}>
        {/* Arrow at the top */}
        <View style={styles.arrowContainer}>
          <Arrow />
        </View>

        {/* Review process components side by side */}
        <View style={styles.reviewContainer}>
          <View style={styles.reviewProcess}>
            <ReviewProcess />
          </View>

          {/* Shark and Speech Bubble positioned in the middle */}
          <View style={styles.sharkBubbleContainer}>
            <SharkWrapper>
              <DumbShark style={styles.shark} />
            </SharkWrapper>
            <View style={styles.speechBubbleContainer}>
              <SpeechBubble scale={1.5}>
                <TypewriterText
                  text="AI can help us review data much faster!"
                  style={styles.speechText}
                  typingSpeed={40}
                />
              </SpeechBubble>
            </View>
          </View>

          <View style={styles.reviewProcessAI}>
            <ReviewProcessAI />
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
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  arrowContainer: {
    position: 'absolute',
    paddingBottom: 200,
  },
  reviewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 0,
    transform: [{ scale: 0.74 }],
    gap: 700,
  },
  reviewProcess: {
    flex: 1,
    alignItems: 'center',
  },
  reviewProcessAI: {
    flex: 1,
    alignItems: 'center',
  },
  sharkBubbleContainer: {
    position: 'absolute',
    top: '50%',
    left: '8%',
    transform: [{ translateX: -100 }, { translateY: -50 }],
    alignItems: 'center',
    zIndex: 1,
    paddingTop: 150,
  },
  speechText: {
    fontSize: 36,
    textAlign: 'center',
    color: 'black',
    lineHeight: 44,
    fontWeight: '500',
  },
  shark: {
    transform: [{ scale: 1.5 }],
    bottom: 30,
    left: 50,
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: 0,
    left: 500,
    zIndex: 2,
    width: 250,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});
