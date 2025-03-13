import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../components/ThemedText';
import NavigationBar from '../components/NavigationBar';
import ProgressBar1 from '../components/ProgressBar1';
import Wave from '../components/Wave';

export default function BasePage({ pageNumber, title, description }) {
  // Calculate progress percentage based on current page
  const totalPages = 17;
  const progressPercentage = ((pageNumber - 1) / (totalPages - 1)) * 100;

  return (
    <View style={styles.container}>
      {/* Navigation Bar at the top */}
      <NavigationBar />

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <ProgressBar1 percentage={progressPercentage} />
      </View>

      {/* Wave in the background (behind all content) */}
      <View style={styles.waveWrapper}>
        <Wave />
      </View>

      {/* Main page content */}
      <View style={styles.pageContent}>
        {/* If a title is passed, show it; otherwise show "Page X" */}
        {title ? (
          <ThemedText type="title" style={styles.pageTitle}>
            {title}
          </ThemedText>
        ) : (
          <ThemedText type="title" style={styles.pageTitle}>
            Page {pageNumber}
          </ThemedText>
        )}

        {/* Description can be text or any custom layout */}
        <View style={styles.descriptionContainer}>
          {description || (
            <ThemedText style={styles.pageDescription}>
              This is a placeholder for page {pageNumber} content.
            </ThemedText>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                // Fill the screen
    backgroundColor: 'white',
  },
  progressContainer: {
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  waveWrapper: {
    position: 'absolute',
    bottom: -100,
    left: -100,
    right: 0,
    zIndex: -1,            // Behind all other content
    transform: [{ scale: 0.9 }],
  },
  pageContent: {
    flex: 1,
    // Remove justifyContent/alignItems if you want custom layouts
  },
  descriptionContainer: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
    textAlign: 'center',
  },
  pageDescription: {
    textAlign: 'center',
    color: 'black',
  },
});
