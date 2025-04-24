import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import DumbShark from './dumbshark'; // Importing your existing DumbShark component

const AnimatedShark = ({ style, onVerificationComplete, targetPosition, isVerifying = false }) => {
  // Animation values
  const moveAnimation = useRef(new Animated.Value(0)).current;
  const [isAtTarget, setIsAtTarget] = useState(false);
  const [message, setMessage] = useState("");
  
  // Start the verification animation when isVerifying changes to true
  useEffect(() => {
    if (isVerifying && targetPosition) {
      // Reset state
      setIsAtTarget(false);
      setMessage("");
      
      // Start swimming animation
      Animated.timing(moveAnimation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true
      }).start(({ finished }) => {
        if (finished) {
          setIsAtTarget(true);
          setMessage("That was embarrassing! You need to be trained more!");
          
          // Notify parent component that verification is complete after showing message
          setTimeout(() => {
            if (onVerificationComplete) {
              onVerificationComplete();
            }
          }, 3000);
        }
      });
    } else {
      // Reset animation when not verifying
      moveAnimation.setValue(0);
      setIsAtTarget(false);
      setMessage("");
    }
  }, [isVerifying, targetPosition, moveAnimation, onVerificationComplete]);
  
  // Calculate the transform based on the target position
  const animatedStyle = {
    transform: [
      {
        translateX: moveAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, targetPosition?.x || 0]
        })
      },
      {
        translateY: moveAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, targetPosition?.y || 0]
        })
      }
    ]
  };
  
  return (
    <Animated.View style={[styles.container, style, animatedStyle]}>
      {isAtTarget && message ? (
        <View style={styles.messageContainer}>
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        </View>
      ) : null}
      <DumbShark style={styles.shark} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  shark: {
    // The DumbShark component already has its own width and height
  },
  messageContainer: {
    position: 'absolute',
    top: -80,
    left: 200,
    zIndex: 10,
  },
  messageBubble: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: '#455A64',
    borderWidth: 2,
    padding: 10,
    maxWidth: 250,
  },
  messageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#455A64',
    textAlign: 'center',
  },
});

export default AnimatedShark;