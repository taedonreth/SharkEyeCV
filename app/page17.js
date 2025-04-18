import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import BasePage from './BasePage';
import DumbShark from '../components/dumbshark';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import { Link, useRouter } from 'expo-router';
import BackButton from '../components/BackButton';
import SharkWrapper from '../components/SharkWrapper';

export default function Page17() {
  const title = ' ';
  const router = useRouter();

  // Function to handle navigation to the home page
  const handlePlayAgain = () => {
    router.replace('/');
  };

  const description = (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        {/* Left side content */}
        <View style={styles.leftContent}>
          <View style={styles.sharkSection}>
            {/* Speech bubble positioned above the shark */}
            <View style={styles.speechBubbleContainer}>
              <SpeechBubble scale={2}>
                <TypewriterText
                  text="Congratulations on completing the AI Computer Vision game! Click to play again!"
                  style={styles.speechText}
                  typingSpeed={100}
                />
              </SpeechBubble>
            </View>

            {/* Shark below the speech bubble */}
            <View style={styles.sharkContainer}>
              <SharkWrapper>
                <DumbShark />
              </SharkWrapper>
            </View>
          </View>
        </View>

        {/* Right side button */}
        <View style={styles.rightContent}>
          <Pressable
            onPress={handlePlayAgain}
            style={({ pressed }) => [
              styles.playAgainButton,
              pressed && styles.playAgainButtonPressed
            ]}
          >
            <Text style={styles.playAgainText}>PLAY AGAIN</Text>
          </Pressable>
        </View>
      </View>

      {/* Footer with navigation buttons */}
      <View style={styles.footerContainer}>
        <Link href="/page16" asChild>
          <BackButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={17} title="Play Again" description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row', // Horizontal layout
    alignItems: 'center',
  },
  leftContent: {
    flex: 3, // Takes up more space
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContent: {
    flex: 1, // Takes up less space
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 40, // Add some padding from the right edge
  },
  sharkSection: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechBubbleContainer: {
    position: 'absolute',
    top: -60,
    zIndex: 2,
    left: 300,
    width: 600,
    transform: [{ scale: 0.9 }],
  },
  speechText: {
    fontSize: 36,
    textAlign: 'center',
    color: 'black',
    lineHeight: 44,
    fontWeight: '500',
  },
  sharkContainer: {
    zIndex: 1,
    transform: [{ scale: 0.9 }],
    right: 200,
    top: 100,
  },
  playAgainButton: {
    backgroundColor: '#4CC0B9',
    paddingVertical: 50,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderWidth: 3,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 200,
    cursor: 'pointer',
    transform: [{ scale: 1.5 }],
    transition: 'transform 0.2s',
    right: 50,
  },
  playAgainButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  playAgainText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 25,
  },
});
