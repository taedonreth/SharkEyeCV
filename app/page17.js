import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import BasePage from './BasePage';
import DumbShark from '../components/dumbshark';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import { Link, useRouter } from 'expo-router';
import BackButton from '../components/BackButton';
import SharkWrapper from '../components/SharkWrapper';
import GoggleShark from '../components/GoggleShark';
import Goggles from '../components/goggles'; // Component, not image

export default function Page17() {
  const router = useRouter();

  const [playAgainTriggered, setPlayAgainTriggered] = useState(false);
  const fallAnim = useRef(new Animated.Value(0)).current;
  const swayAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (playAgainTriggered) {
      // Fall down animation
      Animated.timing(fallAnim, {
        toValue: 600,
        duration: 2500,
        useNativeDriver: true,
        easing: Easing.out(Easing.quad),
      }).start(() => {
        router.replace('/');
      });

      // Sway left and right repeatedly
      Animated.loop(
        Animated.sequence([
          Animated.timing(swayAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.sin),
          }),
          Animated.timing(swayAnim, {
            toValue: -1,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.sin),
          }),
        ])
      ).start();
    }
  }, [playAgainTriggered]);

  const handlePlayAgain = () => {
    setPlayAgainTriggered(true);
  };

  const swayInterpolation = swayAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-200, 200], // Dramatic sway
  });

  const description = (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.leftContent}>
          <View style={styles.sharkSection}>
            <View style={styles.speechBubbleContainer}>
              <SpeechBubble scale={2}>
                <TypewriterText
                  text="Congratulations on completing the AI Computer Vision game! Click to play again!"
                  style={styles.speechText}
                  typingSpeed={100}
                />
              </SpeechBubble>
            </View>

            <View style={styles.sharkContainer}>
              <SharkWrapper>
                {playAgainTriggered ? <DumbShark /> : <GoggleShark />}
              </SharkWrapper>
            </View>

            {/* Falling goggles with sway and small size */}
            {playAgainTriggered && (
              <Animated.View
                style={[
                  styles.goggles,
                  {
                    transform: [
                      { translateY: fallAnim },
                      { translateX: swayInterpolation },
                      { scale: 0.4 }, // smaller goggles
                    ],
                  },
                ]}
              >
                <Goggles />
              </Animated.View>
            )}
          </View>
        </View>

        {/* Right side Play Again button */}
        <View style={styles.rightContent}>
          <Pressable
            onPress={handlePlayAgain}
            style={({ pressed }) => [
              styles.playAgainButton,
              pressed && styles.playAgainButtonPressed,
            ]}
          >
            <Text style={styles.playAgainText}>PLAY AGAIN</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <Link href="/page3" asChild>
          <BackButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={14} title="Play Again" description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContent: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 40,
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
  goggles: {
    position: 'absolute',
    top: 100,
    right: 250,
    zIndex: 3,
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
    transform: [{ scale: 1.5 }],
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
