import React from 'react';
import {Image} from 'react-native';
import Normal from '@asset/icons/phone/phone-normal.png';
import Large from '@asset/icons/phone/phone-large.png';

const PhoneIcon = (props) => {
  const {size = 24, type = 'normal'} = props;
  const types = {
    normal: Normal,
    large: Large,
  };
  return <Image style={{width: size, height: size}} source={types[type]} />;
};

export default PhoneIcon;
