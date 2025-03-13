import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import SpeechBubble from '../components/SpeechBubble';
import IntroToBenioff from '../components/IntroToBenioff';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page3() {
  useEffect(() => {
    console.log("Page 3 Loaded");
  }, []);

  const title = "Page 3";
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
          <View style={styles.introContainer}>
            <IntroToBenioff />
          </View>
        </View>
      </View>

      {/* Footer with navigation buttons */}
      <View style={styles.footerContainer}>
        <Link href="/overview" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page4" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={3} title={title} description={description} />;
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
    // Optional: adjust scale or rotation as needed:
    // transform: [{ scale: 0.75 }, { rotate: '-5deg' }],
  },
  speechBubbleContainer: {
    marginBottom: 20,
    // Optional: adjust scale or rotation as needed:
    // transform: [{ scale: 0.3 }, { rotate: '5deg' }],
  },
  introContainer: {
    marginBottom: 20,
    // Optional: adjust scale if desired:
    // transform: [{ scale: 0.70 }],
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});
