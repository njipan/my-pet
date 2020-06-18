import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native';
import {Colors, Mixins, Typography} from '@style';

const BoxButton = ({
  icon = null,
  onPress = () => {},
  text = '',
  focus = false,
  focusBackgroundColor = 'rgba(0, 95, 190, 0.1)',
  focusBorderColor = Colors.GREY,
  styleText = {},
}) => {
  const backgroundColor = focus ? focusBackgroundColor : null;
  const color = focus ? focusBorderColor : null;
  const borderWidth = focus ? 3 : 2;
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: backgroundColor || 'transparent',
          borderColor: color || Colors.LIGHT_GREY,
          borderWidth,
          ...Mixins.padding(4, 0, 16, 0),
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
        }}>
        {icon}
        <Text style={{...Typography.FONT_REGULAR, ...styleText}}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

BoxButton.propTypes = {
  icon: PropTypes.element,
  onPress: PropTypes.func,
  text: PropTypes.string,
  focus: PropTypes.bool,
  focusBackgroundColor: PropTypes.string,
  styleText: PropTypes.object,
};

export default BoxButton;
