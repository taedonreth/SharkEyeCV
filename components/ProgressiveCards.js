import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const ProgressiveCards = () => {
  const [visibleCards, setVisibleCards] = useState(1);

  const cards = [
    {
      title: "What is Model Testing?",
      content: "Model testing is how we check if the computer really learned by giving it new pictures it hasn't seen before."
    },
    {
      title: "Why is it Important?",
      content: "Model testing helps us find mistakes, like:\nFalse alarms – It thinks there's a shark, but there isn't one! 🐬\nMissed sharks – It doesn't see a shark that's really there! 🦈\nThis helps us see if the computer can handle new stuff—not just the practice pictures."
    },
    {
      title: "How does it work?",
      content: "We give the trained computer new pictures it hasn’t seen before and ask it to guess what’s in them. Then, we check if its answers are right or wrong. This helps us see how well it's doing—like giving it a test!"
    }
  ];

  const handleNext = () => {
    if (visibleCards < cards.length) {
      setVisibleCards(prev => prev + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {cards.slice(0, visibleCards).map((card, index) => (
          <View key={index} style={styles.cardWrapper}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardContent}>{card.content}</Text>
            </View>
          </View>
        ))}
      </View>
      {visibleCards < cards.length && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.nextButton}
            onPress={handleNext}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#3A9A94'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#4CC0B9'}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  cardWrapper: {
    opacity: 1,
    transform: [{ scale: 1 }],
    transition: 'all 0.3s ease',
  },
  card: {
    width: 650,
    minHeight: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    borderWidth: 5,
    borderColor: '#1E3D59',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3D59',
    marginBottom: 15,
    textAlign: 'center',
  },
  cardContent: {
    fontSize: 20,
    color: '#1E3D59',
    textAlign: 'center',
    lineHeight: 28,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#4CC0B9',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
    width: 120,
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default ProgressiveCards;