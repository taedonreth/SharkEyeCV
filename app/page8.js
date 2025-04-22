import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import DumbShark from '../components/dumbshark';
import Goggles from '../components/goggles';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import SharkWrapper from '../components/SharkWrapper';

export default function Page8() {
  // Add a meaningful title for the navigation bar
  const title = "Training the Model";
  
  const description = (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.sharkSection}>
          <View style={styles.sharkContainer}>
            <SharkWrapper>
              <Goggles />
            </SharkWrapper>
          </View>
        </View>
        <View style={styles.speechBubbleContainer}>
          <SpeechBubble scale={2}>
            <TypewriterText
              text="Now that I know what a shark looks like, we should also learn what everything else in the ocean looks like, so I don't get confused! "
              style={styles.speechText}
              typingSpeed={70}
              />
          </SpeechBubble>
        </View>
      </View>
      
      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Link href="/page7" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page9" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );
  
  return <BasePage pageNumber={8} title={title} description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sharkContainer: {
    marginTop: 200,
    left: -200,
    transform: [{ scale: 0.7 }],
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sharkSection: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    right: 50,
  },
  speechBubbleContainer: {
    position: 'absolute',
    right: 570,
    bottom: 300,
    zIndex: 2,
    width: 250,
  },
  speechText: {
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
    lineHeight: 44,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});