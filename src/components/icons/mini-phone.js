import React from 'react';
import {Image} from 'react-native';

const MiniPhoneIcon = () => {
  return (
    <Image
      style={{width: 20, height: 20}}
      source={require('./../../assets/icons/form/phone.png')}
    />
  );
};

export default MiniPhoneIcon;
