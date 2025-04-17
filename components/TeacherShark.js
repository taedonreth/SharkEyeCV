import React from 'react';
import { Image } from 'react-native';

const TeacherShark = (props) => {
  return (
    <Image
      source={require('../assets/images/teachershark.png')}
      style={{
        width: 714,
        height: 492,
        transform: [{ rotate: '-30deg' }],
        ...props.style
      }}
      resizeMode="contain"
    />
  );
};

export default TeacherShark;