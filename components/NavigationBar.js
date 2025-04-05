import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Linking, Image } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

const NavigationBar = ({ onAboutPress }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleAboutPress = () => {
    Linking.openURL('https://bosl.ucsb.edu');
  };

  return (
    <ThemedView style={styles.container} lightColor="#FFFFFF">
      <View style={styles.content}>
        {/* Logo and Title Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/images/SharkEyeLogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <ThemedText style={styles.title}>SharkEye Computer Vision Game</ThemedText>
        </View>

        {/* About Benioff Button */}
        <TouchableOpacity
          style={[
            styles.aboutButton,
            isHovered && styles.aboutButtonHovered
          ]}
          activeOpacity={0.7}
          onPress={handleAboutPress}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ThemedText style={styles.aboutButtonText}>About Benioff</ThemedText>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 80,
    borderBottomWidth: 0,
    backgroundColor: 'white',
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: "100%",
  },
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    width: 80,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333333",
  },
  aboutButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  aboutButtonHovered: {
    backgroundColor: "#F5F5F5",
    borderColor: "#AAAAAA",
  },
  aboutButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#064160",
  },
  divider: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(200, 200, 200, 0.5)",
  },
});

export default NavigationBar;