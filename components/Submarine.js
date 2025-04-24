import React from 'react';
import { Image } from 'react-native';

const Submarine = (props) => {
  return (
    <Image
      source={require('../assets/images/submarine.png')}
      style={{
        width: 714,
        height: 492,
        ...props.style
      }}
      resizeMode="contain"
    />
  );
};

export default Submarine;