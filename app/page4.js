import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import BasePage from './BasePage';
import DumbShark from '../components/dumbshark';
import ReviewProcess from '../components/ReviewProcess';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page4() {
  const title = " ";
  const description = (
    <View style={styles.container}>
      {/* Main scene content */}
      <View style={styles.mainContent}>
        <View style={styles.contentRow}>
          {/* Left side container for Shark and Speech Bubble */}
          <View style={styles.leftContainer}>
            {/* Speech bubble positioned above the shark */}
            <View style={styles.speechBubbleContainer}>
              <Image
                source={require('../assets/images/page4bubble.png')}
                style={styles.speechBubbleImage}
                resizeMode="contain"
              />
            </View>
            {/* Shark 
            {/* Shark below the speech bubble */}
            <View style={styles.sharkContainer}>
              <DumbShark />
            </View>
          </View>

          {/* Right side container for Overview */}
          <View style={styles.rightContainer}>
            <View style={styles.reviewProcessContainer}>
              <ReviewProcess />
            </View>
          </View>
        </View>
      </View>
      {/* Navigation Footer */}
      <View style={styles.footerContainer}>
        <Link href="/page3" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page5" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={4} title={title} description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1, // Pushes footer to the bottom
    justifyContent: 'center',
  },
  speechText: {
    fontSize: 90,
    fontWeight: 'bold',
    marginVertical: 4,
    textAlign: 'center',
    lineHeight: 100,
    color: 'black',
  },
  sceneContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center',
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
  sharkContainer: {
    marginTop: 200, // Add space above the shark to make room for speech bubble
    zIndex: 1,
    marginLeft: -340,
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: 80,
    left: 210,
    zIndex: 2, // Ensure speech bubble appears above other elements
    width: 400,
    transform: [{ scale: 0.75 }], // Increased scale to make it more visible
  },
  speechBubbleImage: {
    width: '100%',
    height: 400,
  },
  reviewProcessContainer: {
    transform: [{ scale: 0.75 }],
    right: 260,
    top: 5,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});
