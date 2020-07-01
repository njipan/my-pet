import React from 'react';
import {Image} from 'react-native';
import {Mixins} from '@style';

const VetServiceIcon = ({size = 'large'}) => {
  return (
    <Image
      style={{...Mixins.iconSize(size)}}
      source={require('./../../assets/icons/vet-service.png')}
    />
  );
};

export default VetServiceIcon;
