import React from 'react';
import {Image} from 'react-native';
import {Mixins} from '@style';
import Star from '@asset/icons/star/star-normal.png';
import StarLarge from '@asset/icons/star/star-large.png';

const StarIcon = (props) => {
  const {size = 24, type = 'normal'} = props;
  const types = {
    normal: Star,
    large: StarLarge,
  };
  return <Image style={{width: size, height: size}} source={types[type]} />;
};

export default StarIcon;
