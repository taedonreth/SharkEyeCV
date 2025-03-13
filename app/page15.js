import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import SpeechBubble from '../components/SpeechBubble';
import BackDrop from '../components/BackDropPage15';
import YesButton from '../components/YesButton';
import NoButton from '../components/NoButton';
import Question from '../components/QuestionPage15';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page15() {
  const description = (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        {/* Top section: Shark */}
        <View style={styles.sharkContainer}>
          <Shark />
        </View>

        {/* Middle section: BackDrop, SpeechBubble and Question */}
        <View style={styles.middleContent}>
          <BackDrop style={styles.backdrop} />
          <SpeechBubble style={styles.speechBubble}>
            {/* You can insert any children if needed */}
          </SpeechBubble>
          <Question style={styles.question} />
        </View>

        {/* Bottom section: Yes and No buttons */}
        <View style={styles.buttonsRow}>
          <YesButton />
          <NoButton />
        </View>
      </View>

      {/* Footer navigation similar to Page16 */}
      <View style={styles.footerContainer}>
        <Link href="/page14" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page16" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={15} description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
  },
  sharkContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  middleContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    marginBottom: 20,
    // additional styling if needed
  },
  speechBubble: {
    marginBottom: 20,
    // additional styling if needed
  },
  question: {
    // additional styling if needed
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});
