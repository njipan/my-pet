import React from 'react';
import {Image} from 'react-native';
import {Mixins} from '@style';

const ProfileInactiveIcon = ({size = 'large'}) => {
  return (
    <Image
      style={{...Mixins.iconSize(size)}}
      source={require('@asset/icons/menu-bar/profile-inactive.png')}
    />
  );
};

export default ProfileInactiveIcon;
