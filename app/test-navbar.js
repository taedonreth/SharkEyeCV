import React from 'react';
import { View, SafeAreaView, Text, StyleSheet } from 'react-native';
import NavigationBar from '../components/NavigationBar'; // Adjust path based on your file structure


export default function TestNavScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Navigation Bar Test</Text>
      
      {/* Your NavigationBar component */}
      <NavigationBar />
      
      <View style={styles.content}>
        <Text>Content below navbar</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
});