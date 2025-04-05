import React from 'react';
import { Image } from 'react-native';

const SharkIcon = (props) => {
    return (
        <Image
            source={require('../assets/images/sharkicon.png')}
            style={{
                width: 188,
                height: 188,
                ...props.style
            }}
            resizeMode="contain"
        />
    );
};

export default SharkIcon;