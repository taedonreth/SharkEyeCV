import React from 'react';
import { Image } from 'react-native';

const GoggleShark = (props) => {
  return (
    <Image
      source={require('../assets/images/goggleshark.png')}
      style={{
        width: 714,
        height: 492,
        ...props.style
      }}
      resizeMode="contain"
    />
  );
};

export default GoggleShark;