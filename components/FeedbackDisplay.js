// Add this new component to your game for more reliable feedback display
// It's a separate component to ensure it renders independently of other state changes

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const FeedbackDisplay = ({ message, visible, duration = 6000 }) => {
  const [localVisible, setLocalVisible] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible && message) {
      setLocalVisible(true);
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.delay(duration - 600),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start(() => {
        setLocalVisible(false);
      });
    }
  }, [visible, message, fadeAnim, duration]);

  if (!localVisible) return null;

  return (
    <Animated.View 
      style={[
        styles.container,
        { opacity: fadeAnim }
      ]}
      pointerEvents="none"
    >
      <View style={styles.box}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  box: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    minWidth: 200,
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default FeedbackDisplay;

// Then in your main component, replace your feedback popup with:
// <FeedbackDisplay 
//   message={feedbackState.message} 
//   visible={feedbackState.visible} 
//   duration={6000}
// />