import React from 'react';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import { View, StyleSheet } from 'react-native';
import Wave from '../components/Wave';
import SpeechBubble from '../components/SpeechBubble';
import TextBox from '../components/TextBoxPage14';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page14() {
  const description = (
    <View style={styles.container}>

      {/* Main content with Shark, SpeechBubble and TextBox */}
      <View style={styles.mainContent}>
        <View style={styles.sharkSection}>
          <Shark />
        </View>
        <View style={styles.contentSection}>
          <SpeechBubble style={styles.speechBubble} />
          <TextBox style={styles.textBox} />
        </View>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Link href="/page13" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page15" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );
  
  return <BasePage pageNumber={14} description={description} />;
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
  sharkSection: {
    marginBottom: 20,
  },
  contentSection: {
    alignItems: 'center',
    transform: [{ scale: 0.5 }],
  },
  speechBubble: {
    marginBottom: 20,
  },
  textBox: {
    // Additional styling if needed
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});
