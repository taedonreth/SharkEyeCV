import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import BasePage from './BasePage';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import TeacherShark from '../components/TeacherShark';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import SharkWrapper from '../components/SharkWrapper';
import FlipCard from '../components/FlipCard';

export default function OverviewPage() {
  const title = " ";
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
                  text={"So... what is\n computer vision?"}
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
            <View style={styles.gridContainer}>
              <View style={styles.row}>
                <FlipCard 
                  frontContent="What is Computer Vision?"
                  backTitle="Computer Vision"
                  backContent="Computer vision is when computers learn to “see” and understand/ recognize pictures or videos—just like people do."
                />
                <FlipCard 
                  frontContent="How Does It Work?"
                  backTitle="How does it work?"
                  backContent="The computer looks at lots of pictures, learns what things are (like a shark or a dog), and gets better at spotting them on its own."
                />
              </View>
              <View style={styles.row}>
                <FlipCard 
                  frontContent="3. Why Is It Useful?"
                  backTitle="Why is it useful?"
                  backContent="It helps us find things quickly, stay safe, or learn new things—without having to look through every picture ourselves."
                />
                <FlipCard 
                  frontContent="An Example!"
                  backTitle="Example"
                  backContent="It can be used to find sharks in ocean videos or tell you what kind of dog is in a photo!"
                />
              </View>
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
  },
  gridContainer: {
    width: '100%',
    position: 'absolute',
    right: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: 120,
    left: 210,
    zIndex: 2,
    width: 250,
  },
  sharkContainer: {
    marginTop: 200,
    zIndex: 1,
    marginLeft: -340,
    transform: [{ scale: 1.1 }],
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});