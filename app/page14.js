import React from 'react';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import { View, StyleSheet } from 'react-native';
import TextBox from '../components/TextBoxPage14';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page14() {
  const description = (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.mainContent}>
        <View style={styles.contentRow}>
          <View style={styles.leftContainer}>
            <View style={styles.speechBubbleContainer}>
              <SpeechBubble scale={2.2}>
                <TypewriterText
                  text="Let me explain how we train our model!"
                  style={styles.speechText}
                  typingSpeed={40}
                />
              </SpeechBubble>
            </View>
            <View style={styles.sharkContainer}>
              <Shark />
            </View>
          </View>

          <View style={styles.rightContainer}>
            <View style={styles.textBoxContainer}>
              <TextBox />
            </View>
          </View>
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

  return <BasePage pageNumber={14} title=" " description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  sceneContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 10,
    position: 'relative',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  sharkContainer: {
    marginTop: 200,
    zIndex: 1,
    marginLeft: -340,
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: 50,
    left: 300,
    zIndex: 2,
    width: 250,
  },
  speechText: {
    fontSize: 36,
    textAlign: 'center',
    color: 'black',
    lineHeight: 44,
    fontWeight: '500',
  },
  textBoxContainer: {
    transform: [{ scale: 0.75 }],
    right: 160,
    top: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});
