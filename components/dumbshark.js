import React from 'react';
import { Image } from 'react-native';

const DumbShark = (props) => {
  return (
    <Image
      source={require('../assets/images/dumbshark.png')}
      style={{
        width: 714,
        height: 492,
        ...props.style
      }}
      resizeMode="contain"
    />
  );
};

export default DumbShark;