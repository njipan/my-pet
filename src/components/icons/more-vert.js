import React from 'react';
import {Image} from 'react-native';
import {Mixins} from '@style';

const MoreVertIcon = ({size = 'large'}) => {
  return (
    <Image
      style={{...Mixins.iconSize(size)}}
      source={require('./../../assets/icons/navigation/more-vert.png')}
    />
  );
};

export default MoreVertIcon;
