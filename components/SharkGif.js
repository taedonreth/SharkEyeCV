import React from 'react';
import { Image } from 'react-native';

const SharkGif = (props) => {
  return (
    <Image
      source={require('../assets/images/sharkgif.png')}
      style={{
        width: 714,
        height: 492,
        ...props.style
      }}
      resizeMode="contain"
    />
  );
};

export default SharkGif;