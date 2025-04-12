import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import BasePage from './BasePage';
import DumbShark from '../components/dumbshark';
import SpeechBubble from '../components/SpeechBubble';
import BackDrop from '../components/BackDropPage15';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import { ThemedText } from '../components/ThemedText';
import SharkWrapper from '../components/SharkWrapper';
import TypewriterText from '../components/TypewriterText';

export default function Page11() {
  // State for tracking current image and what shark says
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sharkSaying, setSharkSaying] = useState('');

  // Images array
  const images = ['fish.jpg', 'shark1.jpg', 'shark2.jpg', 'turtle.jpg', 'whale.jpg'];

  // Pre-load all images to reduce lag
  const imageRefs = {
    'fish.jpg': require('../assets/images/page15-game/fish.jpg'),
    'shark1.jpg': require('../assets/images/page15-game/shark1.jpg'),
    'shark2.jpg': require('../assets/images/page15-game/shark2.jpg'),
    'turtle.jpg': require('../assets/images/page15-game/turtle.jpg'),
    'whale.jpg': require('../assets/images/page15-game/whale.jpg')
  };

  // Helper function to get display name
  const getImageDisplayName = (imageName) => {
    const baseName = imageName.split('.')[0];
    if (baseName === 'shark1' || baseName === 'shark2') {
      return 'shark';
    }
    return baseName;
  };

  // Effect to update the image periodically
  useEffect(() => {
    // Pick a random image only once when component mounts
    const randomIndex = Math.floor(Math.random() * images.length);
    setCurrentImageIndex(randomIndex);

    // No interval or timeout needed, just set once
  }, []); // Empty dependency array means this runs once on mount

  // Effect to make shark say something wrong whenever image changes
  useEffect(() => {
    const actualImageName = getImageDisplayName(images[currentImageIndex]);

    // Always make wrong guesses
    const options = ['shark', 'turtle', 'whale'].filter(name => name !== actualImageName);
    const randomOption = options[Math.floor(Math.random() * options.length)];
    setSharkSaying(randomOption);
  }, [currentImageIndex]);

  const description = (
    <View style={styles.container}>
      {/* Main scene content */}
      <View style={styles.mainContent}>
        <View style={styles.contentRow}>
          {/* Left side container for Shark and Speech Bubble */}
          <View style={styles.leftContainer}>
            {/* Speech bubble positioned above the shark */}
            <View style={styles.speechBubbleContainer}>
              <SpeechBubble style={styles.speechBubble}>
                <TypewriterText
                  text={`Hmmm..\nI see a ${sharkSaying}!`}
                  style={styles.bubbleText}
                  typingSpeed={40}
                />
              </SpeechBubble>
            </View>

            {/* Shark below the speech bubble */}
            <View style={styles.sharkSection}>
              <SharkWrapper>
                <DumbShark />
              </SharkWrapper>
            </View>
          </View>

          {/* Right side container for BackDrop and Question */}
          <View style={styles.rightContainer}>

            {/* Image container */}
            <View style={styles.backdropContainer}>
              <BackDrop
                style={styles.backdrop}
                currentImage={images[currentImageIndex]}
                imageRefs={imageRefs}
              />
            </View>


            {/* Explanatory text about model needing training */}
            <View style={styles.explanationContainer}>
              <ThemedText style={styles.explanationTitle}>
                Model Is Incorrect
              </ThemedText>
              <ThemedText style={styles.explanationText}>
                Our AI has identified this {getImageDisplayName(images[currentImageIndex])} as a {sharkSaying}, which is incorrect.
                Computer vision models need a lot of training to make accurate identifications.
                Move onto the next slide to continue training our model!
              </ThemedText>
            </View>
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

// Update styles to include completion styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 10,
    position: 'relative',
  },
  speechBubbleContainer: {
    position: 'absolute',
    bottom: 350,
    left: 375,
    zIndex: 2,
    transform: [{ scale: 1.4 }],
  },
  speechBubble: {
    width: 350,
    padding: 20,
  },
  bubbleText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    lineHeight: 40,
  },
  rightContainer: {
    flex: 1.5,
    alignItems: 'center',
    paddingRight: 10,
  },
  backdropContainer: {
    width: 600,
    height: 400,
    marginTop: 20,
    marginBottom: 20,
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  explanationContainer: {
    width: 600,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  explanationTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#d32f2f', // Red color to indicate error
  },
  explanationText: {
    fontSize: 18,
    lineHeight: 24,
    color: '#333',
  },
  sharkSection: {
    transform: [{ scale: 1.2 }],
    top: 75,
    right: 100,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
});
