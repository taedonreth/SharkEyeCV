import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';
import NavigationBar from '../../components/NavigationBar';
import ProgressBar1 from '../../components/ProgressBar1';

export default function LandingPage({ onContinue }) {
  // For the landing page (first page), set progress to 0%
  const progressPercentage = 0;
  
  return (
    <ThemedView style={styles.container}>
      <NavigationBar />
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <ProgressBar1 percentage={progressPercentage} />
      </View>
      
      <View style={styles.content}>
        <ThemedText type="title" style={styles.pageTitle}>
          Landing Page
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  progressContainer: {
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
  }
});
