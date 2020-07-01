import React from 'react';
import {Image} from 'react-native';

const HomeTabBarIcon = ({focused, ...props}) => {
  return (
    <>
      {focused && (
        <Image source={require('@asset/icons/menu-bar/home-active.png')} />
      )}
      {!focused && (
        <Image source={require('@asset/icons/menu-bar/home-inactive.png')} />
      )}
    </>
  );
};

export default HomeTabBarIcon;
