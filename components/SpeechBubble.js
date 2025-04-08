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

  React.useEffect(() => {
    // Sequence the animations
    Animated.sequence([
      // Main bubble pops in
      Animated.spring(mainBubbleScale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true
      }),
      // Small bubbles appear in sequence
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
  }, []);
  
  return (
    <View style={{ 
      width: scaledWidth, 
      height: scaledHeight,
      position: 'relative'
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

      {/* Decorative bubbles for thought bubble effect */}
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
        transform: [{ scale: bubble1Scale }]
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
        transform: [{ scale: bubble2Scale }]
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
        transform: [{ scale: bubble3Scale }]
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
        opacity: mainBubbleScale // Fade in content with main bubble
      }}>
        {children}
      </Animated.View>
    </View>
  );
};

export default SpeechBubble;