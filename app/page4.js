import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import DumbShark from '../components/dumbshark';
import Goggles from '../components/goggles';
import FlipCardReviewProcess from '../components/FlipCardReviewProcess';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import SharkWrapper from '../components/SharkWrapper';

export default function Page4() {
  const title = "Review Process";
  const description = (
    <View style={styles.container}>
      {/* Main scene content */}
      <View style={styles.mainContent}>
        <View style={styles.contentRow}>
          {/* Left side container for Shark and Speech Bubble */}
          <View style={styles.leftContainer}>
            {/* Speech bubble positioned above the shark */}
            <View style={styles.speechBubbleContainer}>
            <SpeechBubble scale={1.7}>
              <TypewriterText
                text="I need to learn what sharks look like! How should I learn?"
                style={styles.speechText}
                typingSpeed={100} // Slowed down as discussed
                />
            </SpeechBubble>
             </View>
            {/* Shark below the speech bubble */}
            <View style={styles.sharkContainer}>
              <SharkWrapper>
                <View style={styles.gogglesContainer}>
                  <Goggles />
                </View>
              </SharkWrapper>
            </View>
          </View>
          
          {/* Right side container for Review Process */}
          <View style={styles.rightContainer}>
            <View style={styles.reviewProcessContainer}>
              <FlipCardReviewProcess />
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
    marginTop: 130,
    zIndex: 1,
    marginLeft: -450,
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: -150,
    left: 200,
    zIndex: 2,
    width: 250,
  },
  reviewProcessContainer: {
    transform: [{ scale: 0.78 }],
    right: 60,
    top: 5,
  },
  gogglesContainer: {
    position: 'absolute',
    zIndex: 3,
    // You may need to adjust these values to position the goggles correctly on the shark
    top: -200,  // Adjust this value to move goggles up/down
    left: -350, // Adjust this value to move goggles left/right
    transform: [
      { scaleX: -1 }, // This flips the goggles horizontally
      { scale: 0.7 }  // This makes the goggles 70% of their original size
    ],
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});