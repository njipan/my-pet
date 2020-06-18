import React from 'react';
import {Image, Text} from 'react-native';
// import {Screens} from './../../../../constants';

// const config = {
//     [Screens.HOME_MERCHANT] :
// }

const TabIcon = ({navigation}) => {
  return (
    <Image
      source={require('./../../../../assets/icons/bookmark_24px.png')}
      style={{width: 20, height: 20}}
    />
  );
};

export default TabIcon;
