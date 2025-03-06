import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import NavigationBar from '../../components/NavigationBar';
import ProgressBar1 from '../../components/ProgressBar1';

export default function BasePage({ pageNumber, title, description }) {
  // Calculate progress percentage based on current page
  // Total pages is 17, and we start from page 1
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
      
      <View style={styles.pageContent}>
        <ThemedText type="title" style={styles.pageTitle}>
          {title || `Page ${pageNumber}`}
        </ThemedText>
        <ThemedText style={styles.pageDescription}>
          {description || `This is a placeholder for page ${pageNumber} content.`}
        </ThemedText>
      </View>
    </View>
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
  pageContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  pageTitle: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
  },
  pageDescription: {
    textAlign: 'center',
    color: 'black',
  },
});
