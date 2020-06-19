import React from 'react';
import {Image} from 'react-native';

const ProfileTabBarIcon = ({focused, ...props}) => {
  return (
    <>
      {focused && (
        <Image source={require('@asset/icons/menu-bar/profile-active.png')} />
      )}
      {!focused && (
        <Image source={require('@asset/icons/menu-bar/profile-inactive.png')} />
      )}
    </>
  );
};

export default ProfileTabBarIcon;
