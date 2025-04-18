import React from 'react';
import { Image } from 'react-native';

const Goggles = (props) => {
  return (
    <Image
      source={require('../assets/images/goggles.png')}
      style={{
        width: 714,
        height: 492,
        ...props.style
      }}
      resizeMode="contain"
    />
  );
};

export default Goggles;