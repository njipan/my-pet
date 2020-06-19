import React from 'react';
import {Image} from 'react-native';
import {Mixins} from '@style';

const ProfileActiveIcon = ({size = 'large'}) => {
  return (
    <Image
      style={{...Mixins.iconSize(size)}}
      source={require('@asset/icons/menu-bar/profile-active.png')}
    />
  );
};

export default ProfileActiveIcon;
