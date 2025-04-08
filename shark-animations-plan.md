# Shark Animation Enhancement Plan

## 1. Basic Bobbing Animation
- Create a new SharkWrapper component
- Use Animated.Value for vertical movement
- Implement smooth, infinite animation loop
- Add subtle rotation for natural feel

## 2. Speech Bubble Enhancement
- Add entrance animation for bubble
- Sequence bubble appearance with text
- Animate decorative bubbles appearing

## 3. Implementation Steps
1. Create SharkWrapper component
2. Add vertical animation
3. Test performance and adjust timing
4. Add entrance animations for speech bubble
5. Fine-tune all animations

## Code Structure

```typescript
// SharkWrapper component
const SharkWrapper = ({ children }) => {
  const yOffset = useRef(new Animated.Value(0)).current;
  const rotation = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Create bobbing animation
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          // Move up
          Animated.timing(yOffset, {
            toValue: -10,
            duration: 2000,
            easing: Easing.inOut(Easing.sine)
          }),
          // Slight rotation
          Animated.timing(rotation, {
            toValue: 2,
            duration: 2000,
            easing: Easing.inOut(Easing.sine)
          })
        ]),
        Animated.parallel([
          // Move down
          Animated.timing(yOffset, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.sine)
          }),
          // Return rotation
          Animated.timing(rotation, {
            toValue: 0,
            duration: 2000,
            easing: Easing.inOut(Easing.sine)
          })
        ])
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        transform: [
          { translateY: yOffset },
          { rotate: rotation.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '360deg']
          })}
        ]
      }}
    >
      {children}
    </Animated.View>
  );
};
```

## Enhanced Speech Bubble
- Add scale animation on mount
- Sequence the small bubbles to appear one after another
- Fade in text after bubble appears

## Testing
- Test on different screen sizes
- Verify performance
- Ensure animations are subtle and professional