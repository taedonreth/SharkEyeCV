import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import SpeechBubble from '../components/SpeechBubble';
import { ThemedText } from '../components/ThemedText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page16() {
  const title = " "; // or any title you want
  const description = (
    <View style={styles.container}>
      {/* Main content (shark + bubble) */}
      <View style={styles.mainContent}>
        <View style={styles.sharkContainer}>
          <Shark />
        </View>

        <View style={styles.bubbleContainer}>
          <SpeechBubble>
            <ThemedText style={styles.questionText}>What is data?</ThemedText>
            <ThemedText style={styles.questionText}>How is data collected?</ThemedText>
            <ThemedText style={styles.questionText}>What is good vs bad data?</ThemedText>
          </SpeechBubble>
        </View>
      </View>

      {/* Footer container pinned to the bottom by flex layout */}
      <View style={styles.footerContainer}>
        <Link href="/page15" asChild>
          <BackButton isNavigation={true} />
        </Link>

        <Link href="/page17" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={16} title={title} description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,            // Fill all available space in BasePage's descriptionContainer
  },
  mainContent: {
    flex: 1,            // Push footer to the bottom
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // If you want to shift the shark or bubble, you can use margin or transforms
  },
  sharkContainer: {
    marginRight: 30,

    // If you want the shark partly off-screen, you could do negative margin
    // e.g. marginLeft: -50
  },
  bubbleContainer: {
    transform: [{ scale: 0.4 }],
  },
  questionText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
    backgroundColor: 'transparent', // or any color
  },
});
