import React, {useState, useEffect} from 'react';
import {View, Animated, Text, Dimensions} from 'react-native';
import {Mixins} from '@style';

const AlertModal = () => {
  const [bounceValue, setBounceValue] = useState(new Animated.Value(100));

  useEffect(function () {
    Animated.spring(bounceValue, {
      toValue: -Dimensions.get('window').height / 2,
      velocity: 3,
      tension: 2,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        ...Mixins.margin(0, 40),
        transform: [{translateY: bounceValue}],
        borderRadius: 20,
        padding: 20,
        ...Mixins.boxShadow('black'),
      }}>
      <Text>This is a sub view</Text>
    </Animated.View>
  );
};

export default AlertModal;
