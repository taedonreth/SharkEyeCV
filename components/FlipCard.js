import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';

export default function FlipCard({ frontContent, backContent, backTitle, frontImage }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [flipAnim] = useState(new Animated.Value(0));

  const flipCard = () => {
    Animated.spring(flipAnim, {
      toValue: isFlipped ? 0 : 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlipped);
  };

  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  const backAnimatedStyle = {
    transform: [
      {
        rotateY: flipAnim.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '360deg'],
        }),
      },
    ],
  };

  return (
    <TouchableOpacity 
      onPress={flipCard} 
      style={styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Animated.View 
        style={[
          styles.card, 
          styles.frontCard, 
          frontAnimatedStyle,
          isHovered && styles.cardHovered
        ]}
      >
        <View style={styles.contentContainer}>
          {frontImage && (
            <Image 
              source={frontImage}
              style={styles.image}
              resizeMode="contain"
            />
          )}
          <Text style={[styles.text, frontImage ? styles.textWithImage : null]}>{frontContent}</Text>
          <Text style={styles.hintText}>Click to learn more!</Text>
        </View>
      </Animated.View>
      <Animated.View 
        style={[
          styles.card, 
          styles.backCard, 
          backAnimatedStyle,
          isHovered && styles.cardHovered
        ]}
      >
        <View style={styles.backContentContainer}>
          {backTitle && (
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{backTitle}</Text>
            </View>
          )}
          <Text style={styles.backText}>{backContent}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 250,
    margin: 10,
    cursor: 'pointer',
  },
  card: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backfaceVisibility: 'hidden',
    transition: 'border-color 0.2s ease',
    borderWidth: 5,
    borderColor: 'transparent',
  },
  cardHovered: {
    borderColor: '#4CC0B9',
    borderWidth: 8,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  backContentContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  titleContainer: {
    width: '100%',
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(30, 61, 89, 0.3)',
  },
  titleText: {
    color: '#1E3D59',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  frontCard: {
    backgroundColor: '#1E3D59',
  },
  backCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#1E3D59',
    borderWidth: 5,
  },
  text: {
    color: 'white',
    fontSize: 23,
    textAlign: 'center',
    fontWeight: '600',
  },
  backText: {
    color: '#1E3D59',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  textWithImage: {
    marginTop: 10,
    fontSize: 20,
  },
  hintText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
});