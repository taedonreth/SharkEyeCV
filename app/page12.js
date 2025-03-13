import React from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import BackDrop from '../components/BackDropPage12';
import AnswerBox from '../components/AnswerBoxPage12';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page12() {
  const description = (
    <View style={styles.container}>

      {/* Main Content: BackDrop, AnswerBox and Shark */}
      <View style={styles.mainContent}>
        <View style={styles.backdropSection}>
          <BackDrop />
        </View>
        <View style={styles.answerBoxSection}>
          <AnswerBox />
        </View>
        <View style={styles.sharkSection}>
          <Shark />
        </View>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Link href="/page11" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page13" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );
  return <BasePage pageNumber={12} description={description} />;
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdropSection: {
    marginBottom: 20,
  },
  answerBoxSection: {
    marginBottom: 20,
  },
  sharkSection: {
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});
