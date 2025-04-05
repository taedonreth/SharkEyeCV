import React from 'react';
import { View, StyleSheet, Image, Dimensions, Platform } from 'react-native';
import BasePage from './BasePage';
import DumbShark from '../components/dumbshark';
import SpeechBubble from '../components/SpeechBubble';
import { ThemedText } from '../components/ThemedText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page8() {
  const title = " ";
  const description = (
    <View style={styles.container}>
      {/* Main Content: Shark and Speech Bubble */}
      <View style={styles.mainContent}>
        <View style={styles.sharkSection}>
          {/* Wrapper View with margins for positioning the shark */}
          <View style={styles.sharkContainer}>
            <DumbShark />
          </View>
        </View>
        <View style={styles.speechBubbleContainer}>
          <Image
            source={require('../assets/images/page8bubble.png')}
            style={styles.speechBubbleImage}
            resizeMode="contain"
          />
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

  return <BasePage pageNumber={8} title=" " description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sharkContainer: {
    marginTop: 200,
    left: -200,
    transform: [{ scale: 1.3 }],
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sharkSection: {
    // Changed from marginRight to flex to give it proper space allocation
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  speechBubbleContainer: {
    position: 'absolute',
    left: 660,
    bottom: 100,
    zIndex: 2, // Ensure speech bubble appears above other elements
    width: 400,
  },
  speechBubbleImage: {
    width: '100%',
    height: 400,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});