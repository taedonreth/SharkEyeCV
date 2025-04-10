import * as React from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { useProgress } from "./ProgressContext";

const Progressbar1 = ({ percentage = 0 }) => {
  const { lastPercentage, updatePercentage } = useProgress();
  const initialPercentage = lastPercentage;

  const animatedWidth = React.useRef(new Animated.Value(initialPercentage)).current;
  const animatedNumber = React.useRef(new Animated.Value(initialPercentage)).current;
  const [displayedNumber, setDisplayedNumber] = React.useState(Math.round(initialPercentage));

  React.useEffect(() => {
    // Update the context with the new percentage value
    updatePercentage(percentage);

    Animated.parallel([
      Animated.spring(animatedWidth, {
        toValue: percentage,
        tension: 12,
        friction: 8,
        useNativeDriver: false
      }),
      Animated.spring(animatedNumber, {
        toValue: percentage,
        tension: 12,
        friction: 8,
        useNativeDriver: false
      })
    ]).start();

    const listener = animatedNumber.addListener(({ value }) => {
      setDisplayedNumber(Math.round(value));
    });

    return () => {
      animatedNumber.removeListener(listener);
    };
  }, [percentage, updatePercentage]);

  return (
    <View style={styles.container}>
      <Animated.Text style={styles.percentageText}>
        {displayedNumber}%
      </Animated.Text>

      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: animatedWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                  extrapolate: 'clamp'
                })
              }
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    paddingHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  percentageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 10,
    width: 60,
    textAlign: 'right',
  },
  progressContainer: {
    flex: 1,
    height: 28,
  },
  progressBackground: {
    height: 28,
    backgroundColor: '#E6EBEA',
    borderRadius: 14,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CC0B9',
    borderRadius: 14,
  }
});

export default Progressbar1;