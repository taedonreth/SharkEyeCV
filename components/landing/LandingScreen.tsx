import React from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from './Navbar';
import WaveBackground from './WaveBackground';
import Shark from './Shark';
import SpeechBubble from './SpeechBubble';
import ContinueButton from './ContinueButton';

export default function LandingScreen() {
    return (
        <View style={styles.container}>
            <Navbar />
            <View style={styles.content}>
                <View style={styles.messageContainer}>
                    <SpeechBubble />
                </View>
                <View style={styles.sharkContainer}>
                    <Shark />
                </View>
                <View style={styles.buttonContainer}>
                    <ContinueButton onPress={() => console.log('Continue pressed')} />
                </View>
            </View>
            <WaveBackground />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFF6FF',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 40,
    },
    messageContainer: {
        alignItems: 'center',
        paddingTop: 20,
    },
    sharkContainer: {
        alignItems: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 40,
        zIndex: 1,
    },
});