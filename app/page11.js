import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import SpeechBubble from '../components/SpeechBubble';
import { ThemedText } from '../components/ThemedText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page11() {
  const description = (
    <View style={styles.container}>

      {/* Main content with Shark and SpeechBubble */}
      <View style={styles.mainContent}>
        <View style={styles.sharkSection}>
          <Shark />
        </View>
        <View style={styles.bubbleSection}>
          <SpeechBubble>
            <ThemedText style={styles.questionText}>What is data?</ThemedText>
            <ThemedText style={styles.questionText}>How is data collected?</ThemedText>
            <ThemedText style={styles.questionText}>What is good vs bad data?</ThemedText>
          </SpeechBubble>
        </View>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Link href="/page10" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page12" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={11} title=" " description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  waveSection: {
    flex: 0.2,
    justifyContent: 'flex-end',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sharkSection: {
    marginRight: 20,
  },
  bubbleSection: {
    flex: 1,
  },
  questionText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});
