import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

export default function WaveBackground() {
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
        <View style={styles.container}>
            {[...Array(3)].map((_, index) => (
                <Animated.View
                    key={index}
                    style={[
                        styles.wave,
                        {
                            transform: [{
                                translateY: animation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 10 + index * 5]
                                })
                            }],
                            opacity: 0.3 - index * 0.1
                        }
                    ]}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 200,
        overflow: 'hidden',
    },
    wave: {
        position: 'absolute',
        bottom: 0,
        left: -50,
        right: -50,
        height: 200,
        backgroundColor: '#93C5FD',
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
    },
});