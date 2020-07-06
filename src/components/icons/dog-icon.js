import React from 'react';
import {Image} from 'react-native';
import {Mixins} from '@style';

const DogIcon = ({focus = false, size = 'large'}) => {
  const focusIcon = () => {
    if (focus) {
      return (
        <Image
          style={{...Mixins.iconSize(size)}}
          source={require('./../../assets/icons/animal/dog-focus.png')}
        />
      );
    } else {
      return (
        <Image
          style={{...Mixins.iconSize(size)}}
          source={require('./../../assets/icons/animal/dog-unfocus.png')}
        />
      );
    }
  };

  return <>{focusIcon()}</>;
};

export default DogIcon;
