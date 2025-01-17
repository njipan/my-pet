import React from 'react';
import {TouchableOpacity, Image, Text, View} from 'react-native';

import {Box, Colors, Typography} from '@style';

const RateStar = (props) => {
  const {
    max = 5,
    value = null,
    onPress = (v) => {},
    activeIcon = (
      <Image
        source={require('@asset/icons/star/star-large.png')}
        style={{width: 40, height: 40}}
      />
    ),
    inactiveIcon = (
      <Image
        source={require('@asset/icons/star/star-border-normal.png')}
        style={{width: 40, height: 40}}
      />
    ),
    editable = true,
  } = props;

  const makeArray = (n) => {
    const arrs = [];
    for (let i = 0; i < n; i++) {
      arrs.push(true);
    }
    return arrs;
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {makeArray(value).map((item, idx) =>
          editable ? (
            <TouchableOpacity onPress={() => onPress(idx + 1)}>
              {activeIcon}
            </TouchableOpacity>
          ) : (
            activeIcon
          ),
        )}
        {makeArray(max - value).map((item, idx) =>
          editable ? (
            <TouchableOpacity onPress={() => onPress(idx + 1)}>
              {inactiveIcon}
            </TouchableOpacity>
          ) : (
            inactiveIcon
          ),
        )}
      </View>
    </View>
  );
};

export default RateStar;
