import React from 'react';
import { Image } from 'react-native';

const BadSharkIcon = (props) => {
    return (
        <Image
            source={require('../assets/images/badsharkicon.png')}
            style={{
                width: 188,
                height: 188,
                ...props.style
            }}
            resizeMode="contain"
        />
    );
};

export default BadSharkIcon;