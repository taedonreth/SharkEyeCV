import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import DumbShark from '../components/dumbshark';
import Arrow from '../components/Arrow';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import SharkWrapper from '../components/SharkWrapper';
import FlipCard from '../components/FlipCard';

export default function Page5() {
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
              <SpeechBubble scale={1.7}>
                <TypewriterText
                  text="AI can help us review data much faster!"
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

          {/* Right side container for Flip Cards Grid */}
          <View style={styles.rightContainer}>
            {/* Arrow pointing to the cards */}
            <View style={styles.arrowContainer}>
              <Arrow />
            </View>
            <View style={styles.gridContainer}>
              <View style={[styles.row, styles.firstRow]}>
                <FlipCard 
                  frontContent="1. Image Collection"
                  backContent="Aerial images or videos are captured."
                  frontImage={require('../assets/icons/image.png')}
                />
                <FlipCard 
                  frontContent="2. Initial Scanning with AI"
                  backContent="The AI quickly scans through all the videos looking for anything that might be a shark."
                  frontImage={require('../assets/icons/scanning.png')}
                />
              </View>
              <View style={[styles.row, styles.threeCardRow]}>
                <FlipCard 
                  frontContent="3. Detection & Flagging with AI"
                  backContent="The AI flags pictures or videos that might have sharks, filtering out the irrelevant data."
                  frontImage={require('../assets/icons/detection.png')}
                />
                <FlipCard 
                  frontContent="4. Verification"
                  backContent="Now the experts only need to look at the videos that probably have sharks!"
                  frontImage={require('../assets/icons/verification.png')}
                />
                <FlipCard 
                  frontContent="5. Model Training"
                  backContent=" Each verified detection is fed back into the system to improve the AI's accuracy."
                  frontImage={require('../assets/icons/modeltraining.png')}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Navigation Footer */}
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
  speechText: {
    fontSize: 36,
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
    position: 'relative',
  },
  gridContainer: {
    width: '100%',
    position: 'absolute',
    right: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  firstRow: {
    marginRight: -280,
  },
  threeCardRow: {
    marginTop: 20,
    gap: 10,
    marginRight: -140,
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: 100,
    left: 200,
    zIndex: 2,
    width: 250,
  },
  sharkContainer: {
    marginTop: 200,
    zIndex: 1,
    marginLeft: -340,
  },
  arrowContainer: {
    position: 'absolute',
    top: '50%',
    left: -400,
    transform: [{ translateY: -23 }],
    zIndex: 3,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});
