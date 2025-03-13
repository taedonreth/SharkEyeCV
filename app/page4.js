import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import SpeechBubble from '../components/SpeechBubble';
import ReviewProcess from '../components/ReviewProcess';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page4() {
  const title = "Page 4";
  const description = (
    <View style={styles.container}>
      {/* Main scene content */}
      <View style={styles.mainContent}>
        <View style={styles.sceneContainer}>
          <View style={styles.sharkContainer}>
            <Shark />
          </View>
          <View style={styles.speechBubbleContainer}>
            <SpeechBubble />
          </View>
          <View style={styles.reviewProcessContainer}>
            <ReviewProcess />
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
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sceneContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sharkContainer: {
    marginBottom: 20,
    // Uncomment to adjust size/rotation if desired:
    // transform: [{ scale: 0.75 }, { rotate: '-5deg' }],
  },
  speechBubbleContainer: {
    marginBottom: 20,
    // Uncomment to adjust size/rotation if desired:
    // transform: [{ scale: 0.3 }, { rotate: '5deg' }],
  },
  reviewProcessContainer: {
    // Uncomment to adjust scaling if desired:
    // transform: [{ scale: 0.70 }],
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});
