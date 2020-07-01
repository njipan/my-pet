import React from 'react';
import {Image} from 'react-native';

const VetServiceTabBarIcon = ({focused, ...props}) => {
  return (
    <>
      {focused && (
        <Image
          source={require('@asset/icons/menu-bar/vet-service-active.png')}
        />
      )}
      {!focused && (
        <Image
          source={require('@asset/icons/menu-bar/vet-service-inactive.png')}
        />
      )}
    </>
  );
};

export default VetServiceTabBarIcon;
