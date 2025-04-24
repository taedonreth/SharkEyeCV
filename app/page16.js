import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import BasePage from './BasePage';
import DumbShark from '../components/dumbshark';
import GoggleShark from '../components/GoggleShark';
import Seaweed from '../components/Seaweed';
import Submarine from '../components/Submarine';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import SharkWrapper from '../components/SharkWrapper';

export default function Page16() {
  const messages = [
    "Whoa! These goggles are incredible – WOAH! Is that a submarine",
    "Have you seen our SharkEye goggles?",
    "We lost it while training the goggles to detect sharks. It uses computer vision models!",
    "I used to be lost, but now I know what's around me – thanks to this \"computer vision model\"!",
    "Thanks for the goggles! They helped me find my family!",
    "Now I am able to roam the beautiful ocean freely again!",
    "We are glad our goggles could help you! You can keep it!",
    "Thank you so much for your help! Goodbye!",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showSpeechBubble, setShowSpeechBubble] = useState(true); // Flag for showing speech bubbles
  const timerRef = useRef(null);
  const submarineAnim = useRef(new Animated.Value(1000)).current;
  const submarineY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(submarineAnim, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    startAutoAdvanceTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (currentMessageIndex === 7) {
      setTimeout(() => {
        setShowSpeechBubble(false); // Hide speech bubbles after the last message
        Animated.parallel([
          Animated.timing(submarineAnim, {
            toValue: -1000,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(submarineY, {
            toValue: -800,
            duration: 3000,
            useNativeDriver: true,
          }),
        ]).start();
      }, 4000);
    }
  }, [currentMessageIndex]);

  const startAutoAdvanceTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentMessageIndex(prev => prev + 1);
    }, 5500);
  };

  const handleSpeechBubbleClick = () => {
    setCurrentMessageIndex(prev => prev + 1);
    if (timerRef.current) clearInterval(timerRef.current);
    startAutoAdvanceTimer();
  };

  const sharkPositions = [
    { top: 0, left: 350, scale: 1, rotation: 0 },
    { top: 150, left: 200, scale: 0.8, rotation: 15 },
    { top: 0, left: -200, scale: 0.7, rotation: -10 },
    { top: 180, left: 450, scale: 0.6, rotation: 5 },
    { top: 80, left: -50, scale: 0.9, rotation: -5 },
    { top: 50, left: 100, scale: 0.5, rotation: 20 },
  ];

  const seaweedPositions = Array.from({ length: 12 }, (_, i) => ({
    left: i * 150 - 250,
    bottom: -150,
  }));

  const description = (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.sharkSection}>
          {sharkPositions.map((position, index) => (
            <View
              key={`shark-${index}`}
              style={[
                styles.sharkContainer,
                {
                  top: position.top,
                  left: position.left,
                  transform: [
                    { scale: position.scale },
                    { rotate: `${position.rotation}deg` },
                  ],
                },
              ]}
            >
              <SharkWrapper>
                {index === 0 ? <GoggleShark /> : <DumbShark />}
              </SharkWrapper>
            </View>
          ))}

          {seaweedPositions.map((pos, idx) => (
            <View key={`seaweed-${idx}`} style={[styles.seaweed, pos]}>
              <Seaweed />
            </View>
          ))}

          <Animated.View
            style={[styles.submarineContainer, {
              transform: [
                { translateX: submarineAnim },
                { translateY: submarineY },
                { scale: 0.8 },
              ],
            }]}
          >
            <SharkWrapper>
              <Submarine label="Benioff Science Laboratory" />
            </SharkWrapper>
            {/* Submarine speech for messages 1, 2, and 6 */}
            {(currentMessageIndex === 1 || currentMessageIndex === 2 || currentMessageIndex === 6) && showSpeechBubble && (
              <TouchableOpacity
                style={styles.submarineSpeech}
                onPress={handleSpeechBubbleClick}
                activeOpacity={0.8}
              >
                <SpeechBubble scale={1.5}>
                  <TypewriterText
                    key={currentMessageIndex}
                    text={messages[currentMessageIndex]}
                    typingSpeed={50}
                    style={styles.submarineSpeechText}
                  />
                </SpeechBubble>
              </TouchableOpacity>
            )}
          </Animated.View>
        </View>

        {/* Shark speech for messages 0, 3, 4, 5, and 7 */}
        {(currentMessageIndex === 0 || currentMessageIndex === 3 || currentMessageIndex === 4 || currentMessageIndex === 5 || currentMessageIndex === 7) && showSpeechBubble && (
          <TouchableOpacity
            style={styles.speechBubbleContainer}
            onPress={handleSpeechBubbleClick}
            activeOpacity={0.8}
          >
            <SpeechBubble scale={1.8}>
              <TypewriterText
                key={currentMessageIndex}
                text={messages[currentMessageIndex]}
                style={styles.speechText}
                typingSpeed={70}
              />
            </SpeechBubble>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.footer}>
        <Link href="/page15" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/page17" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={16} title="The End" description={description} />;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  speechText: {
    fontSize: 36,
    textAlign: 'center',
    color: 'black',
    lineHeight: 44,
    fontWeight: '500',
  },
  submarineSpeechText: {
    fontSize: 22,
    textAlign: 'center',
    color: '#000',
    fontWeight: '500',
  },
  sharkContainer: {
    position: 'absolute',
    zIndex: 1,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sharkSection: {
    flex: 1,
    position: 'relative',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speechBubbleContainer: {
    position: 'absolute',
    right: 300,
    bottom: 300,
    zIndex: 10,
    width: 250,
  },
  seaweed: {
    position: 'absolute',
    zIndex: 0,
  },
  submarineContainer: {
    position: 'absolute',
    top: 20,
    left: 800,
    zIndex: 2,
  },
  submarineSpeech: {
    position: 'absolute',
    top: -90,
    left: 210,
    width: 300,
    zIndex: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
    zIndex: 20,
  },
});
