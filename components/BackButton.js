import * as React from 'react';
import { useState, forwardRef } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const BackButton = forwardRef((props, ref) => {
  const [isHovered, setIsHovered] = useState(false);

  const normalColor = "#064160";
  const hoverColor = "#042E44"; // Darker shade for hover state

  const isNavigation = props.isNavigation || false;

  return (
    <TouchableOpacity
      ref={ref} // forward the ref here
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
      <Text style={styles.buttonText}>BACK</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  button: {
    width: 255,
    height: 92,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  navigationButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0,
    width: 180,
    height: 60,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default BackButton;
