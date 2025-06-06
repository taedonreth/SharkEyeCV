import React from 'react';
import { Image } from 'react-native';

const Shark = (props) => {
  return (
    <Image
      source={require('../assets/images/shark.png')}
      style={{
        width: 714,
        height: 492,
        ...props.style
      }}
      resizeMode="contain"
    />
  );
};

export default Shark;