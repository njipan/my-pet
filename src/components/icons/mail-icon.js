import React from 'react';
import {Image} from 'react-native';
import Normal from '@asset/icons/mail/normal.png';
import Large from '@asset/icons/mail/large.png';

const MailIcon = (props) => {
  const {size = 24, type = 'normal'} = props;
  const types = {
    normal: Normal,
    large: Large,
  };
  return <Image style={{width: size, height: size}} source={types[type]} />;
};

export default MailIcon;
