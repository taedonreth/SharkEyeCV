import React from 'react';
import { Image } from 'react-native';

const Surfer = (props) => {
    return (
        <Image
            source={require('../assets/images/surfer.png')}
            style={{
                width: 256,
                height: 211,
                ...props.style
            }}
            resizeMode="contain"
        />
    );
};

export default Surfer;