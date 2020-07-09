import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {Colors} from '@style';

const Badge = ({
  text = '',
  icon = null,
  renderIcon = null,
  styleIcon = {},
  styleText = {},
  styleRoot = {},
}) => {
  return (
    <View
      style={{
        ...styles.root,
        ...styleRoot,
      }}>
      {React.isValidElement(renderIcon) ? (
        renderIcon
      ) : icon ? (
        <Image source={icon} style={{...styles.image, ...styleIcon}} />
      ) : null}
      <Text style={{...styles.text, ...styleText}}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.BLACK10,
    alignSelf: 'flex-start',
  },
  image: {width: 16, height: 16, marginRight: 1},
  text: {color: Colors.PRIMARY, fontFamily: 'sans-serif-medium', fontSize: 12},
});

export default Badge;
