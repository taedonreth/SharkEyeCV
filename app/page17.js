import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import SpeechBubble from '../components/SpeechBubble';
import Resources from '../components/Resources';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import { ThemedText } from '../components/ThemedText';


export default function Page17() {
  const title = ' '; // Or any title you'd like
  const description = (
    <View style={styles.container}>
      {/* Main content: shark + speech bubble + resources */}
      <View style={styles.mainContent}>
        <View style={styles.contentRow}>
          {/* Left side container for Shark and Speech Bubble */}
          <View style={styles.leftContainer}>
            {/* Speech bubble positioned above the shark */}
        <View style={styles.speechBubbleContainer}>
          <Image
            source={require('../assets/images/page17bubble.png')}
            style={styles.speechBubbleImage}
            resizeMode="contain"
          />
        </View>
            {/* Shark 
            {/* Shark below the speech bubble */}
            <View style={styles.sharkContainer}>
              <Shark />
            </View>
          </View>

          {/* Right side container for Overview */}
          <View style={styles.rightContainer}>
            <View style={styles.resourcesContainer}>
              <Resources />
            </View>
          </View>
        </View>
      </View>

      {/* Footer with Back button only */}
      <View style={styles.footerContainer}>
        <Link href="/page16" asChild>
          <BackButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  // Render BasePage with custom description
  return <BasePage pageNumber={17} title={title} description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Fills available space (below the title/description in BasePage)
  mainContent: {
    flex: 1,
    flexDirection: 'row',    // Place items in a row
    alignItems: 'center',
    justifyContent: 'center',
    // If you want them stacked vertically, do flexDirection: 'column'
  },
  contentRow: {
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center',
  },
  speechText: {
    fontSize: 90,
    fontWeight: 'bold',
    marginVertical: 4,
    textAlign: 'center',
    lineHeight: 100,
    color: 'black',
  },
  leftContainer: {
    flex: 1, // Takes up half the available width
    alignItems: 'center',
    justifyContent: 'flex-end', // Align items at the bottom of container
    paddingRight: 10,
    position: 'relative',
  },
  rightContainer: {
    flex: 1, // Takes up half the available width
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
  },
  speechBubbleContainer: {
    position: 'absolute',
    left: 230,
    bottom: 300,
    zIndex: 2, // Ensure speech bubble appears above other elements
    width: 400,
    transform: [{ scale: 0.8 }],
  },
  speechBubbleImage: {
    width: '100%',
    height: 400,
  },
  sharkContainer: {
    marginTop: 200, // Add space above the shark to make room for speech bubble
    zIndex: 1,
    marginLeft: -340,
  },
  bubbleContainer: {
    transform: [{ scale: 0.3 }, { rotate: '5deg' }],
    marginBottom: 200,
  },
  resourcesContainer: {
    // Additional styling if needed
    transform: [{ scale: 0.8 }],
    top: 20,
    left: 70,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Or 'center' / 'space-between'
    paddingVertical: 25,
    // If you need it pinned truly at the bottom, you can do:
    // alignSelf: 'stretch',
  },
});
