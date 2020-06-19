import React from 'react';
import {Image} from 'react-native';

const OrderTabBarIcon = ({focused, ...props}) => {
  return (
    <>
      {focused && (
        <Image source={require('@asset/icons/menu-bar/order-active.png')} />
      )}
      {!focused && (
        <Image source={require('@asset/icons/menu-bar/order-inactive.png')} />
      )}
    </>
  );
};

export default OrderTabBarIcon;
