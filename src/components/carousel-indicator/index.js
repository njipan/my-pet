import React from 'react';
import {View, Text} from 'react-native';

import {Colors, Mixins, Typography} from '@style';

const CarouselIndicatorItem = (props) => {
  const {
    color = Colors.BLACK10,
    activeColor = Colors.SECONDARY,
    active = false,
    styleActive = {},
    styleInactive = {},
  } = props;

  return active ? (
    <View
      style={{
        width: 18,
        height: 8,
        backgroundColor: activeColor,
        borderRadius: 100,
        marginHorizontal: 3,
        ...styleActive,
      }}
    />
  ) : (
    <View
      style={{
        width: 8,
        height: 8,
        backgroundColor: color,
        borderRadius: 100,
        marginHorizontal: 3,
        ...styleInactive,
      }}
    />
  );
};

const CarouselIndicator = (props) => {
  const {
    color = Colors.BLACK10,
    activeColor = Colors.SECONDARY,
    length = 0,
    activeIndex = 0,
    styleIndicatorInactive = {},
    styleIndicatorActive = {},
    rightSide = null,
  } = props;

  const makeArray = (n) => {
    const arrs = [];
    for (let i = 0; i < n; i++) {
      arrs.push(true);
    }
    return arrs;
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        {makeArray(length).map((item, idx) => (
          <CarouselIndicatorItem
            key={idx}
            {...{
              color,
              activeColor,
              active: activeIndex == idx,
              styleActive: styleIndicatorActive,
              styleInactive: styleIndicatorInactive,
            }}
          />
        ))}
      </View>
      <View>{rightSide}</View>
    </View>
  );
};

export default CarouselIndicator;
