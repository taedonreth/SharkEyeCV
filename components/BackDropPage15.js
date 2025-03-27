import * as React from "react";
import { Image, View, StyleSheet } from "react-native";

const BackDropPage15 = (props) => {
  // Get current image from props, default to fish.jpg if not provided
  const currentImage = props.currentImage || 'fish.jpg';
  
  // Dynamic image path mapping with updated filenames
  const imageMap = {
    'fish.jpg': require('../assets/images/page15-game/fish.jpg'),
    'shark1.jpg': require('../assets/images/page15-game/shark1.jpg'),
    'shark2.jpg': require('../assets/images/page15-game/shark2.jpg'),
    'turtle.jpg': require('../assets/images/page15-game/turtle.jpg'),
    'whale.jpg': require('../assets/images/page15-game/whale.jpg'),
  };
  
  // Select the correct image based on the currentImage prop
  const imagePath = imageMap[currentImage];
  
  return (
    <View style={[styles.container, props.style]}>
      {/* Wrap Image in View with black border */}
      <View style={styles.borderContainer}>
        <Image
          source={imagePath}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderContainer: {
    // Black border styling
    borderWidth: 5,
    borderColor: '#000000', // Black border
    borderRadius: 8,        // Slightly rounded corners
    overflow: 'hidden',     // Ensures image doesn't spill outside border
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0', // Light background color for any empty space
  },
  image: {
    width: '100%',
    height: '100%',
  }
});

export default BackDropPage15;
