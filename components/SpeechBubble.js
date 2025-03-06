import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

const SpeechBubble = ({ text }) => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../assets/speech-bubble.png")}
                style={styles.bubble}
                resizeMode="contain"
            >
                <Text style={styles.text}>{text}</Text>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 100, // adjust as needed
        left: 80, // adjust as needed
    },
    bubble: {
        width: 250,
        height: 120,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
    },
});

export default SpeechBubble;
