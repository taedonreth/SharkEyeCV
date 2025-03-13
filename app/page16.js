import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import SpeechBubble from '../components/SpeechBubble';
import { ThemedText } from '../components/ThemedText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page16() {
  const title = " ";
  const description = (
    <View style={styles.container}>
      {/* Main Content: Shark and Speech Bubble */}
      <View style={styles.mainContent}>
        <View style={styles.sharkSection}>
          {/* Wrapper View with margins for positioning the shark */}
          <View style={styles.sharkContainer}>
            <Shark />
          </View>
        </View>
        <View style={styles.speechBubbleContainer}>
          <SpeechBubble>
            <ThemedText style={styles.speechText}>
              That was wrong, try again!
            </ThemedText>
          </SpeechBubble>
        </View>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Link href="/page15" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page17" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={16} title=" " description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  speechText: {
    fontSize: 110,
    fontWeight: 'bold',
    marginVertical: 4,
    textAlign: 'center',
    lineHeight: 110,
    color: 'black',
  },
  sharkContainer: {
    marginLeft: 500,
    marginTop: 200,
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
    zIndex: 2, // Ensure speech bubble appears above other elements
    transform: [{ scale: 0.4 }], // Adjust scale if needed
    top: -100,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});