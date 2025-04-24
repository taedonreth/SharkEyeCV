import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';

// Kid-friendly overview cards with the smart goggles theme
const overviewCards = [
  {
    id: 1,
    title: "Smart Goggles",
    content: "These special goggles help me see things! They can learn to spot my shark family in the big ocean."
  },
  {
    id: 2,
    title: "Learning to Look",
    content: "I need to teach my goggles what sharks look like by showing them lots of pictures. It's like teaching a friend to spot my family!"
  },
  {
    id: 3,
    title: "Spotting Practice",
    content: "My goggles need to practice finding sharks in new pictures. Sometimes they make mistakes, but that's okay!"
  },
  {
    id: 4,
    title: "Finding My Family",
    content: "Once my goggles learn really well, they'll help me find my shark family in the big ocean so we can swim together again!"
  }
];

// FlipCard component
const FlipCard = ({ card }) => {
  // Animation values for the flip effect
  const [flipAnimation] = useState(new Animated.Value(0));
  const [flipped, setFlipped] = useState(false);

  // Interpolate the animation value to create the flip effect
  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  // Toggle flip animation
  const flipCard = () => {
    if (flipped) {
      Animated.timing(flipAnimation, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(flipAnimation, {
        toValue: 180,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
    setFlipped(!flipped);
  };

  return (
    <TouchableOpacity 
      style={styles.flipCardContainer} 
      onPress={flipCard}
      activeOpacity={0.8}
    >
      <Animated.View style={[styles.flipCard, frontAnimatedStyle, styles.flipCardFront]}>
        <Text style={styles.cardNumber}>{card.id}.</Text>
        <Text style={styles.cardTitle}>{card.title}</Text>
        <Text style={styles.tapHint}>Tap to learn more!</Text>
      </Animated.View>
      <Animated.View style={[styles.flipCard, backAnimatedStyle, styles.flipCardBack, { backfaceVisibility: 'hidden' }]}>
        <Text style={styles.cardContent}>{card.content}</Text>
        <Text style={styles.tapHintBack}>Tap to flip back!</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Main component
const FlipCardOverview = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Smart Goggles Help Me See!</Text>
      <View style={styles.cardsContainer}>
        {overviewCards.map(card => (
          <FlipCard 
            key={card.id} 
            card={card}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 868,
    height: 700,
    borderWidth: 1,
    borderColor: '#AAA',
    borderRadius: 30,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#064160',
  },
  cardsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  flipCardContainer: {
    width: '100%',
    height: 115,
    marginVertical: 15,
    perspective: 1000,
  },
  flipCard: {
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 20,
  },
  flipCardFront: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
  },
  flipCardBack: {
    backgroundColor: '#4CC0B9',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3A9A94',
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 15,
    width: 40,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  cardContent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 26,
    textAlign: 'center',
  },
  tapHint: {
    fontSize: 12,
    color: '#888',
    position: 'absolute',
    bottom: 5,
    right: 10,
  },
  tapHintBack: {
    fontSize: 12,
    color: '#E0E0E0',
    position: 'absolute',
    bottom: 5,
    right: 10,
  }
});

export default FlipCardOverview; 