import React from 'react';
import {Image} from 'react-native';
import {Mixins} from '@style';

const HomeActiveIcon = ({size = 'large'}) => {
  return (
    <Image
      style={{...Mixins.iconSize(size)}}
      source={require('@asset/icons/menu-bar/home-active.png')}
    />
  );
};

export default HomeActiveIcon;
