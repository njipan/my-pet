import React from 'react';
import {Image} from 'react-native';
import {Mixins} from '@style';

const AddIcon = ({size = 'large'}) => {
  return (
    <Image
      style={{...Mixins.iconSize(size)}}
      source={require('./../../assets/icons/add-black54.png')}
    />
  );
};

export default AddIcon;
