import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Navbar() {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.content}>
                {/* Logo */}
                <View style={styles.leftSection}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>Logo</Text>
                    </View>
                    <Text style={styles.title}>
                        SharkEye Computer Vision Game
                    </Text>
                </View>

                {/* About Button */}
                <Pressable 
                    style={({ pressed }) => [
                        styles.button,
                        pressed && styles.buttonPressed
                    ]}
                    onPress={() => {
                        console.log('About button pressed');
                    }}
                >
                    <Text style={styles.buttonText}>About SharkEye</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    logoContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 12,
        color: '#6B7280',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    button: {
        backgroundColor: '#F8FAFC',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    buttonPressed: {
        backgroundColor: '#F1F5F9',
    },
    buttonText: {
        color: '#0F172A',
        fontSize: 14,
        fontWeight: '500',
    },
});