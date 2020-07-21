import React from 'react';
import {Image} from 'react-native';
import Normal from '@asset/icons/medicine/primary/normal.png';
import Large from '@asset/icons/medicine/primary/large.png';

const MedicinePrimaryIcon = (props) => {
  const {size = 24, type = 'normal'} = props;
  const types = {
    normal: Normal,
    large: Large,
  };
  return <Image style={{width: size, height: size}} source={types[type]} />;
};

export default MedicinePrimaryIcon;
