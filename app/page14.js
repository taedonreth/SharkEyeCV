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
import { ThemedText } from '../components/ThemedText';

export default function Page14() {
  const description = (
    <View style={styles.container}>

      {/* Main content with Shark, SpeechBubble and TextBox */}
      <View style={styles.mainContent}>
        <View style={styles.sharkSection}>
          <Shark />
        </View>
        <View style={styles.contentSection}>
          <ThemedText style={styles.centerText}>
            Moving on to{'\n'}model testing!
          </ThemedText>
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
    position: 'relative',
    top: -525,
    right: -175,
    transform: [{ scale: 0.75 }],
  },
  speechBubble: {
    position: 'relative',
    top: 600,
    left: -500,
    marginBottom: 20,
    transform: [{ scale: 0.50 }],
  },
  textBox: {
    position: 'relative',
    top: 0,
    left: 0,
    transform: [{ scale: 0.75 }],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
  backdrop: {
    position: 'relative',
    top: 0,
    left: 0,
    marginBottom: 20,
    transform: [{ scale: 0.75 }],
  },
  centerText: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -660 }, { translateY: 100 }],
    zIndex: 3,
    lineHeight: 60,
  },
});
