import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import NavigationBar from '../../components/NavigationBar'; // Adjust path based on your file structure


export default function BasePage({ pageNumber, title, description }) {
  return (
    <View style={styles.container}>
      {/* Navigation Bar at the top */}
      <NavigationBar />
      
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
