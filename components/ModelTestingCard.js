import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const ModelTestingCard = () => {
  // Define all card content as an array of objects
  const cardContent = [
    {
      title: null,
      content:[
        "Model testing is the process of evaluating how well an AI model performs on new, unseen data after training!"
      ]
    },
    {
      title: "It finds mistakes like:",
      content: [
        "• False positives (detecting a shark when there isn't one)",
        "• False negatives (missing a real shark)"
      ]
    },
    {
      title: "It shows if the model can generalize beyond the training data, and helps us identify where the model needs improvement (e.g., better data, tuning, or design changes).",
      content: null
    },
    {
      title: "How it works:",
      content: [
        "1. Feed the trained model testing data (images it hasn't seen before).",
        "2. The model makes predictions.",
        "3. Compare predictions to the real labels to see what's right or wrong.",
        "4. Measure performance using metrics like accuracy, precision, and recall.",
        "5. Analyze errors and use the insights to improve the model."
      ]
    }
  ];

  // State to track current card index
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Function to handle card click - move to next card or loop back to start
  const handleCardClick = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cardContent.length);
  };

  // Get current card content
  const currentCard = cardContent[currentCardIndex];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleCardClick}
      activeOpacity={0.9}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{currentCard.title}</Text>
        
        {currentCard.content && (
          <View style={styles.contentContainer}>
            {currentCard.content.map((item, index) => (
              <Text key={index} style={styles.contentItem}>
                {item}
              </Text>
            ))}
          </View>
        )}
        
        <View style={styles.pageIndicator}>
          {cardContent.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.dot, 
                index === currentCardIndex ? styles.activeDot : null
              ]} 
            />
          ))}
        </View>
        
        <Text style={styles.tapPrompt}>Tap to continue</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    minHeight: 400,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  contentContainer: {
    marginBottom: 20,
  },
  contentItem: {
    fontSize: 18,
    marginBottom: 10,
    lineHeight: 28,
    color: '#555',
  },
  pageIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#4FD1C5',
  },
  tapPrompt: {
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
    marginTop: 10,
  },
});

export default ModelTestingCard;