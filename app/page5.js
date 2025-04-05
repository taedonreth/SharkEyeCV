import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import BasePage from './BasePage';
import DumbShark from '../components/dumbshark';
import ReviewProcess from '../components/ReviewProcessPage5';
import ReviewProcessAI from '../components/ReviewProcessAI';
import Arrow from '../components/Arrow';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';

export default function Page5() {
  const title = " ";
  const description = (
    <View style={styles.container}>
      {/* Main content area */}
      <View style={styles.mainContent}>
        {/* Arrow at the top */}
        <View style={styles.arrowContainer}>
          <Arrow />
        </View>

        {/* Review process components side by side */}
        <View style={styles.reviewContainer}>
          <View style={styles.reviewProcess}>
            <ReviewProcess />
          </View>

          {/* Shark and Speech Bubble positioned in the middle */}
          <View style={styles.sharkBubbleContainer}>
            <DumbShark style={styles.shark} />
            <View style={styles.speechBubbleContainer}>
              <Image
                source={require('../assets/images/page5bubble.png')}
                style={styles.speechBubbleImage}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={styles.reviewProcessAI}>
            <ReviewProcessAI />
          </View>
        </View>
      </View>

      {/* Footer with navigation buttons */}
      <View style={styles.footerContainer}>
        <Link href="/page4" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page6" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={5} title={title} description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  arrowContainer: {
    position: 'absolute', // Makes sure it does not affect other elements
    paddingBottom: 200,

  },
  reviewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 0,
    transform: [{ scale: 0.74 }],
    gap: 700,
  },
  reviewProcess: {
    flex: 1,
    alignItems: 'center',
  },
  reviewProcessAI: {
    flex: 1,
    alignItems: 'center',
  },
  sharkBubbleContainer: {
    position: 'absolute',
    top: '50%', // Keep it centered vertically
    left: '8%', // Move it to the left (adjust as needed)
    transform: [{ translateX: -100 }, { translateY: -50 }], // Adjust positioning
    alignItems: 'center',
    zIndex: 1, // Keep it behind other elements if necessary
    paddingTop: 150,
  },
  speechText: {
    fontSize: 110,
    fontWeight: 'bold',
    marginVertical: 4,
    textAlign: 'center',
    lineHeight: 100,
    color: 'black',
  },
  shark: {
    transform: [{ scale: 1.5 }],
    bottom: 100,
    left: 50,
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: -100,
    left: 500,
    zIndex: 2, // Ensure speech bubble appears above other elements
    width: 400,
    transform: [{ scale: 0.9 }], // Increased scale to make it more visible
  },
  speechBubbleImage: {
    width: '100%',
    height: 400,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});

