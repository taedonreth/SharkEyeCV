import React from 'react';
import { Image } from 'react-native';

const GoodSharkIcon = (props) => {
    return (
        <Image
            source={require('../assets/images/goodsharkicon.png')}
            style={{
                width: 188,
                height: 188,
                ...props.style
            }}
            resizeMode="contain"
        />
    );
};

export default GoodSharkIcon;