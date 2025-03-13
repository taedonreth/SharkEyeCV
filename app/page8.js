import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import Shark from '../components/Shark';
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
          <Shark />
        </View>
        <View style={styles.speechSection}>
          <SpeechBubble>
            <ThemedText style={styles.questionText}>What is data?</ThemedText>
            <ThemedText style={styles.questionText}>How is data collected?</ThemedText>
            <ThemedText style={styles.questionText}>What is good vs bad data?</ThemedText>
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

  return <BasePage pageNumber={8} title=" " description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  speechSection: {
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
