import React from 'react';
import PropTypes from 'prop-types';
import {Colors, Mixins, Typography} from '@style';
import {Types} from '@constant';
import {StyleSheet, TouchableHighlight, Text, View} from 'react-native';

const ButtonFluid = ({
  onPress = () => {},
  type = 'large',
  textColor = Colors.WHITE,
  backgroundColor = Colors.PRIMARY,
  styleText = {},
  underlayColor = null,
  ...props
}) => {
  const fontSize =
    {
      small: Typography.FONT_SIZE_12,
      medium: Typography.FONT_SIZE_14,
    }[props.type || 'large'] || Typography.FONT_SIZE_REGULAR;

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={underlayColor || Colors.WHITE}
      style={styles.outer}>
      <View style={{...styles.container, backgroundColor}}>
        <Text
          style={{...styles.text, fontSize, color: textColor, ...styleText}}>
          {props.text}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  outer: {
    width: '100%',
    borderRadius: 6,
    ...Mixins.margin(5, 0),
  },
  container: {
    ...Mixins.padding(12),
    backgroundColor: Colors.PRIMARY,
    borderRadius: 6,
    width: '100%',
  },
  text: {
    color: Colors.WHITE,
    fontSize: Typography.FONT_SIZE_16,
    textAlign: 'center',
  },
});

ButtonFluid.propsTypes = {
  type: PropTypes.oneOf(Object.values(Types.ButtonType)),
  text: PropTypes.string,
  onPress: PropTypes.func,
};

export default ButtonFluid;
