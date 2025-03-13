import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import SpeechBubble from '../components/SpeechBubble';
import { ThemedText } from '../components/ThemedText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page11() {
  const title = " ";
  const description = (
    <View style={styles.container}>
      {/* Main Content: Shark and Speech Bubble */}
      <View style={styles.mainContent}>
        <View style={styles.sharkSection}>
          {/* Wrapper View with margins for positioning the shark */}
          <View style={{ marginLeft: 500, marginTop: 200 }}>
            <Shark />
          </View>
        </View>
        <View style={styles.speechSection}>
          {/* Wrapper View with margins for positioning */}
          <View style={{ marginLeft: 50, marginTop: -200 }}>
            <SpeechBubble width={400} height={400} scale={0.85}>
              <View style={styles.questionsContainer}>
                <ThemedText style={styles.questionText}>You got it right!</ThemedText>
              </View>
            </SpeechBubble>
          </View>
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
  questionsContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // Add responsive padding based on platform
    paddingHorizontal: Platform.OS === 'web' ? 20 : 10,
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
  speechSection: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  questionText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 4,
    textAlign: 'center',
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});