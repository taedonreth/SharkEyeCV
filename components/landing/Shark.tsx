import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import Svg, { Path } from 'react-native-svg';

export default function Shark() {
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                })
            ])
        ).start();
    }, [animation]);

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{
                        translateY: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 10]
                        })
                    }]
                }
            ]}
        >
            <Svg width={120} height={80} viewBox="0 0 120 80">
                <Path
                    d="M60 10c30 0 50 15 50 30s-20 30-50 30S10 55 10 40s20-30 50-30z"
                    fill="#60A5FA"
                />
                <Path
                    d="M85 35c0 2.76-2.24 5-5 5s-5-2.24-5-5 2.24-5 5-5 5 2.24 5 5z"
                    fill="#1E3A8A"
                />
                <Path
                    d="M40 45c10 0 20-5 20-5s-10-5-20-5c-10 0-20 5-20 5s10 5 20 5z"
                    fill="#93C5FD"
                />
            </Svg>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});