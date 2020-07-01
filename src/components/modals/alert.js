import React, {useState, useEffect} from 'react';
import {
  View,
  Animated,
  Text,
  Dimensions,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import {Mixins} from '@style';

const AlertModal = ({show = false}) => {
  const initialY = -Dimensions.get('window').height;
  const [bounceValue, setBounceValue] = useState(new Animated.Value(initialY));
  const [isHidden, setHidden] = useState(false);

  useEffect(function () {
    _showModal();
  }, []);

  const _hideModal = () => {
    Animated.spring(bounceValue, {
      toValue: initialY,
      velocity: 0,
      tension: 20,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const _showModal = () => {
    Animated.spring(bounceValue, {
      toValue: -(Dimensions.get('window').height / 2),
      velocity: 3,
      tension: 2,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const _toggle = () => {
    if (show) {
      _showModal();
      return;
    }
    _hideModal();
  };

  const {width, height} = Dimensions.get('window');

  return (
    <>
      <TouchableWithoutFeedback onPress={() => _hideModal()}>
        <View
          style={{
            width,
            height,
            position: 'absolute',
            top: 0,
            opacity: 0,
          }}></View>
      </TouchableWithoutFeedback>
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
        <Button
          title="Hide"
          onPress={() => {
            _hideModal();
          }}
        />
      </Animated.View>
    </>
  );
};

export default AlertModal;
