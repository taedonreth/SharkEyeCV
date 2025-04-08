import React, { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const SharkWrapper = ({ children, style }) => {
  const yOffset = useRef(new Animated.Value(0)).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Create bobbing animation
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          // Move up
          Animated.timing(yOffset, {
            toValue: -10,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true
          }),
          // Slight rotation
          Animated.timing(rotation, {
            toValue: 2,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true
          }),
          // Subtle scale up
          Animated.timing(scale, {
            toValue: 1.02,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true
          })
        ]),
        Animated.parallel([
          // Move down
          Animated.timing(yOffset, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true
          }),
          // Return rotation
          Animated.timing(rotation, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true
          }),
          // Scale back
          Animated.timing(scale, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true
          })
        ])
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [
            { translateY: yOffset },
            { rotate: rotation.interpolate({
              inputRange: [0, 360],
              outputRange: ['0deg', '360deg']
            })},
            { scale }
          ]
        }
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default SharkWrapper;