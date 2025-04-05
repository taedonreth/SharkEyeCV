import React from 'react';
import BasePage from './BasePage';
import Shark from '../components/Shark';
import { View, StyleSheet, Image } from 'react-native';
import TextBox from '../components/TextBoxPage14';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page14() {
  const description = (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.mainContent}>
        {/* Content row with shark and text */}
        <View style={styles.contentRow}>
          {/* Left side with shark */}
          <View style={styles.leftContainer}>
            <View style={styles.speechBubbleContainer}>
              <Image
                source={require('../assets/images/page14bubble.png')}
                style={styles.speechBubbleImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.sharkContainer}>
              <Shark />
            </View>
          </View>

          {/* Right side with speech bubble and text box */}
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
    flex: 1, // Pushes footer to the bottom
    justifyContent: 'center',
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
    top: 50,
    left: 300,
    zIndex: 2, // Ensure speech bubble appears above other elements
    width: 400,
    transform: [{ scale: 0.8 }], // Increased scale to make it more visible
  },
  speechBubbleImage: {
    width: '100%',
    height: 400,
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
