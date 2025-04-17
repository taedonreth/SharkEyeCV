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
import FlipCard from '../components/FlipCard';

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
              <SpeechBubble scale={1.7}>
                <TypewriterText
                  text="The review process is long ..."
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
            <View style={styles.gridContainer}>
              <View style={styles.row}>
                <FlipCard 
                  frontContent="1. Image Collection"
                  backContent="We use drones, helicopters, or satellites to capture views of the ocean from way up high."
                  frontImage={require('../assets/icons/image.png')}
                />
                <FlipCard 
                  frontContent="2. Initial Scanning"
                  backContent="Researchers look through the videos to see if any sharks show up."
                  frontImage={require('../assets/icons/scanning.png')}
                />
              </View>
              <View style={styles.row}>
                <FlipCard 
                  frontContent="3. Detection & Flagging"
                  backContent="If they think they see a shark, they flag that image or video segment to take a closer look later!"
                  frontImage={require('../assets/icons/detection.png')}
                />
                <FlipCard 
                  frontContent="4. Verification"
                  backContent="Ocean experts look closely at the marked videos to see if it’s really a shark—or just a dolphin, surfer, or even a shadow."
                  frontImage={require('../assets/icons/verification.png')}
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
    top: 100,
    left: 250,
    zIndex: 2,
    width: 250,
  },
  sharkContainer: {
    marginTop: 200,
    zIndex: 1,
    marginLeft: -340,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});
