import React from 'react';
import {Image} from 'react-native';

const MiniStar = ({size = 'large'}) => {
  return (
    <Image
      style={{width: 22, height: 22}}
      source={require('./../../assets/icons/star_24px.png')}
    />
  );
};

export default MiniStar;
