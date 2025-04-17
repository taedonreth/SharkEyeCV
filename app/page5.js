import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import TeacherShark from '../components/TeacherShark';
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
                  text="Here's what the review process is like!"
                  style={styles.speechText}
                  typingSpeed={250}
                  />
              </SpeechBubble>
            </View>
            {/* Shark below the speech bubble */}
            <View style={styles.sharkContainer}>
              <SharkWrapper>
                <TeacherShark />
              </SharkWrapper>
            </View>
          </View>

          {/* Right side container for Flip Cards Grid */}
          <View style={styles.rightContainer}>
            {/* Arrow pointing to the cards */}
            <View style={styles.gridContainer}>
              <View style={[styles.row, styles.firstRow]}>
                <FlipCard 
                  frontContent="1. What is Data Collection?"
                  backTitle="Data Collection"
                  backContent="We gather lots of pictures and videos—like homework for the computer!"
                  frontImage={require('../assets/icons/image.png')}
                />
                <FlipCard 
                  frontContent="2. What is Annotation?"
                  backTitle="Annotation"
                  backContent="We label the pictures to show the computer what’s what—like saying, “This is a shark!”"
                  frontImage={require('../assets/icons/scanning.png')}
                />
              </View>
              <View style={[styles.row, styles.threeCardRow]}>
                <FlipCard 
                  frontContent="3. What is Training?"
                  backTitle="Training"
                  backContent="The computer studies the pictures and tries to learn how to spot things on its own."
                  frontImage={require('../assets/icons/detection.png')}
                />
                <FlipCard 
                  frontContent="4. Verification?"
                  backTitle="Verification"
                  backContent="We test the computer with new pictures to see if it learned the right stuff—like a little quiz!"
                  frontImage={require('../assets/icons/verification.png')}
                />
                <FlipCard 
                  frontContent="5. What is Deployment?"
                  backTitle="Deployment"
                  backContent="Now it’s ready to help in real life—like in an app that knows what it’s looking at!"
                  frontImage={require('../assets/icons/modeltraining.png')}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Navigation Footer */}
      <View style={styles.footerContainer}>
        <Link href="/page3" asChild>
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
