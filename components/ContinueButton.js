import * as React from "react";
import { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

const ContinueButton = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  const normalColor = "#4CC0B9";
  const hoverColor = "#3A9A94"; // Darker shade for hover effect
  
  // Determine if this is a navigation button (flat on right side) or regular button
  const isNavigation = props.isNavigation || false;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isNavigation ? styles.navigationButton : null,
        { backgroundColor: isHovered ? hoverColor : normalColor },
        props.style
      ]}
      onPress={props.onPress}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>CONTINUE</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 258,
    height: 92,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  navigationButton: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0,
    width: 180, // Wider for navigation
    height: 60, // Shorter height
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default ContinueButton;
