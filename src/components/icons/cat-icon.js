import React from 'react';
import {Image} from 'react-native';
import {Mixins} from '@style';

const CatIcon = ({focus = false, size = 'large'}) => {
  const focusIcon = () => {
    if (focus) {
      return (
        <Image
          style={{...Mixins.iconSize(size)}}
          source={require('./../../assets/icons/animal/cat-focus.png')}
        />
      );
    } else {
      return (
        <Image
          style={{...Mixins.iconSize(size)}}
          source={require('./../../assets/icons/animal/cat-unfocus.png')}
        />
      );
    }
  };

  return <>{focusIcon()}</>;
};

export default CatIcon;
