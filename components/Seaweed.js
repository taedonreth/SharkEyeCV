import React from 'react';
import { Image } from 'react-native';

const Seaweed = (props) => {
  return (
    <Image
      source={require('../assets/images/seaweed.png')}
      style={{
        width: 714,
        height: 492,
        ...props.style
      }}
      resizeMode="contain"
    />
  );
};

export default Seaweed;