import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import BasePage from './BasePage';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import Shark from '../components/Shark';
import SpeechBubble from '../components/SpeechBubble';
import Overview from '../components/Overview';

export default function OverviewPage() {
  const title = "overview";
  const description = (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.mainContent}>
        <View style={styles.sceneContainer}>
          <View style={styles.sharkContainer}>
            <Shark />
          </View>
          <View style={styles.speechBubbleContainer}>
            <SpeechBubble />
          </View>
          <View style={styles.overviewContainer}>
            <Overview />
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
    flex: 1, // Pushes footer to the bottom
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
    // Optionally, apply transforms if needed:
    // transform: [{ scale: 0.75 }, { rotate: '-5deg' }],
  },
  speechBubbleContainer: {
    marginBottom: 20,
    // Optionally, apply transforms if needed:
    // transform: [{ scale: 0.3 }, { rotate: '5deg' }],
  },
  overviewContainer: {
    // Optionally, apply scaling if desired:
    // transform: [{ scale: 0.90 }],
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});
