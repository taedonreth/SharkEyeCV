import React from 'react';
import { Pressable, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface ContinueButtonProps {
    onPress: (event: GestureResponderEvent) => void;
}

export default function ContinueButton({ onPress }: ContinueButtonProps) {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed
            ]}
            onPress={onPress}
        >
            <Text style={styles.text}>Continue</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4FD1C5',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonPressed: {
        backgroundColor: '#38B2AC',
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});