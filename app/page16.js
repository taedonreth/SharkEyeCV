import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import BasePage from './BasePage';
import DumbShark from '../components/dumbshark';
import GoggleShark from '../components/GoggleShark';
import Seaweed from '../components/Seaweed';
import SpeechBubble from '../components/SpeechBubble';
import TypewriterText from '../components/TypewriterText';
import { Link } from 'expo-router';
import BackButton from '../components/BackButton';
import ContinueButton from '../components/ContinueButton';
import SharkWrapper from '../components/SharkWrapper';

export default function Page16() {
  const messages = [
    "Whoa! These goggles are incredible — I can finally recognize the seaweed and coral around me!",
    "The training and testing we did is similar to Computer Vision Models!",
    "Computer vision helps identify objects in images, like sharks!",
    "Thanks for learning with me about AI and computer vision!"
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const timerRef = useRef(null);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    startAutoAdvanceTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (userInteracted) {
      startAutoAdvanceTimer();
      setUserInteracted(false);
    }
  }, [currentMessageIndex]);

  const startAutoAdvanceTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setCurrentMessageIndex(prevIndex => (prevIndex + 1) % messages.length);
    }, 6500);
  };

  const handleSpeechBubbleClick = () => {
    setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    setUserInteracted(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    startAutoAdvanceTimer();
  };

  const sharkPositions = [
    { top: 0, left: 350, scale: 1, rotation: 0 },      // Main shark
    { top: 150, left: 200, scale: 0.8, rotation: 15 },
    { top: 0, left: -200, scale: 0.7, rotation: -10 },
    { top: 180, left: 450, scale: 0.6, rotation: 5 },
    { top: 80, left: -50, scale: 0.9, rotation: -5 },
    { top: 50, left: 100, scale: 0.5, rotation: 20 },
  ];

  const description = (
    <View style={styles.container}>
      {/* Seaweed in the background */}
      <View style={styles.seaweedContainer}>
        <Seaweed />
      </View>

      {/* Main Content: Sharks and Speech Bubble */}
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
                    { rotate: `${position.rotation}deg` }
                  ]
                }
              ]}
            >
              <SharkWrapper>
                {index === 0 ? <GoggleShark /> : <DumbShark />}
              </SharkWrapper>
            </View>
          ))}
        </View>

        {/* Speech Bubble */}
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
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <Link href="/page15" asChild>
          <BackButton isNavigation={true} />
        </Link>
        <Link href="/review" asChild>
          <ContinueButton isNavigation={true} />
        </Link>
      </View>
    </View>
  );

  return <BasePage pageNumber={16} title="The End" description={description} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  speechText: {
    fontSize: 36,
    textAlign: 'center',
    color: 'black',
    lineHeight: 44,
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
  seaweedContainer: {
    position: 'absolute',
    bottom: 100,
    left: -200,
    zIndex: 0,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 25,
    zIndex: 20,
  },
});
