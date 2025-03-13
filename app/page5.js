import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import SpeechBubble from '../components/SpeechBubble';
import ReviewProcess from '../components/ReviewProcessPage5';
import ReviewProcessAI from '../components/ReviewProcessAI';
import Arrow from '../components/Arrow';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page5() {
  const title = " ";
  const description = (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.mainContent}>
        {/* Optionally show an arrow at the top */}
        <View style={styles.arrowContainer}>
          <Arrow />
        </View>
        {/* Shark and SpeechBubble in a vertical stack */}
        <View style={styles.sharkBubbleContainer}>
          <View style={styles.sharkContainer}>
            <Shark />
          </View>
          <View style={styles.speechBubbleContainer}>
            <SpeechBubble />
          </View>
        </View>
        {/* Review process components side by side */}
        <View style={styles.reviewContainer}>
          <View style={styles.reviewProcess}>
            <ReviewProcess />
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
    marginBottom: 20,
  },
  sharkBubbleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sharkContainer: {
    marginBottom: 20,
    // Uncomment and adjust if you need scaling or rotation:
    // transform: [{ scale: 0.75 }, { rotate: '-5deg' }],
  },
  speechBubbleContainer: {
    marginBottom: 20,
    // Uncomment and adjust if you need scaling or rotation:
    // transform: [{ scale: 0.3 }, { rotate: '5deg' }],
  },
  reviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  reviewProcess: {
    flex: 1,
    alignItems: 'center',
    // Optionally add transforms here if needed:
    // transform: [{ scale: 0.65 }],
  },
  reviewProcessAI: {
    flex: 1,
    alignItems: 'center',
    // Optionally add transforms here if needed:
    // transform: [{ scale: 0.65 }],
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});
