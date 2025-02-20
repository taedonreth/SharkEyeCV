import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SpeechBubble() {
    return (
        <View style={styles.container}>
            <View style={styles.bubble}>
                <Text style={styles.title}>Welcome!</Text>
                <Text style={styles.text}>Ready to learn about computer vision?...</Text>
            </View>
            <View style={styles.pointer} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
        paddingRight: 20,
    },
    bubble: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        maxWidth: '80%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        color: '#4B5563',
    },
    pointer: {
        width: 20,
        height: 20,
        backgroundColor: 'white',
        transform: [{ rotate: '45deg' }],
        marginTop: -10,
        marginRight: 30,
    },
});