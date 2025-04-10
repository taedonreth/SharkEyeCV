import * as React from "react";
import { View, Animated, Easing } from "react-native";

const SpeechBubble = ({ 
  width = 250, 
  height = 120, 
  scale = 1, 
  children,
  backgroundColor = "white",
  ...props 
}) => {
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;
  
  // Animation values
  const [mainBubbleScale] = React.useState(new Animated.Value(0));
  const [bubble1Scale] = React.useState(new Animated.Value(0));
  const [bubble2Scale] = React.useState(new Animated.Value(0));
  const [bubble3Scale] = React.useState(new Animated.Value(0));
  // New animation values for continuous effects
  const [floatValue] = React.useState(new Animated.Value(0));
  const [rotateValue] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    // Initial pop-in animations
    Animated.sequence([
      Animated.spring(mainBubbleScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true
      }),
      Animated.stagger(150, [
        Animated.spring(bubble1Scale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true
        }),
        Animated.spring(bubble2Scale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true
        }),
        Animated.spring(bubble3Scale, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true
        })
      ])
    ]).start();

    // Start continuous floating animation
    Animated.loop(
      Animated.parallel([
        // Vertical floating
        Animated.sequence([
          Animated.timing(floatValue, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true
          }),
          Animated.timing(floatValue, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true
          })
        ]),
        // Subtle rotation
        Animated.sequence([
          Animated.timing(rotateValue, {
            toValue: 1,
            duration: 2400, // Slightly different timing for natural feel
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true
          }),
          Animated.timing(rotateValue, {
            toValue: 0,
            duration: 2400,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true
          })
        ])
      ])
    ).start();
  }, []);

  // Interpolate animation values
  const translateY = floatValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8] // Subtle 8px float
  });

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['-1deg', '1deg'] // Subtle rotation
  });
  
  return (
    <Animated.View style={{ 
      width: scaledWidth, 
      height: scaledHeight,
      position: 'relative',
      transform: [
        { translateY },
        { rotate }
      ]
    }}>
      {/* Main bubble */}
      <Animated.View style={{
        width: '100%',
        height: '100%',
        backgroundColor: backgroundColor,
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#000',
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        transform: [
          { scale: mainBubbleScale },
          { scale: 0.98 }
        ],
      }} />

      {/* Decorative bubbles */}
      <Animated.View style={{
        position: 'absolute',
        left: '15%',
        bottom: -22,
        width: 25,
        height: 25,
        backgroundColor: backgroundColor,
        borderRadius: 15,
        borderWidth: 3,
        borderColor: '#000',
        transform: [
          { scale: bubble1Scale }
        ]
      }} />
      
      <Animated.View style={{
        position: 'absolute',
        left: '8%',
        bottom: -40,
        width: 18,
        height: 18,
        backgroundColor: backgroundColor,
        borderRadius: 12,
        borderWidth: 3,
        borderColor: '#000',
        transform: [
          { scale: bubble2Scale }
        ]
      }} />

      <Animated.View style={{
        position: 'absolute',
        left: '3%',
        bottom: -55,
        width: 12,
        height: 12,
        backgroundColor: backgroundColor,
        borderRadius: 8,
        borderWidth: 3,
        borderColor: '#000',
        transform: [
          { scale: bubble3Scale }
        ]
      }} />

      {/* Content container */}
      <Animated.View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        opacity: mainBubbleScale
      }}>
        {children}
      </Animated.View>
    </Animated.View>
  );
};

export default SpeechBubble;