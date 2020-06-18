import React from 'react';
import {Image} from 'react-native';
import {Mixins} from '@style';

const UserFormIcon = ({size = 'large'}) => {
  return (
    <Image
      style={{...Mixins.iconSize(size)}}
      source={require('./../../assets/icons/form/user.png')}
    />
  );
};

export default UserFormIcon;
