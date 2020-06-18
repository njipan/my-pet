import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Colors, Mixins, Typography} from './../../../../styles';
import {Heading} from './../../../../components';

const UserTypeBox = ({
  icon = null,
  onPress = () => {},
  text = '',
  focus = false,
}) => {
  const backgroundColor = focus ? 'rgba(0, 95, 190, 0.1)' : null;
  const color = focus ? Colors.GREY : null;
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: backgroundColor || 'transparent',
          borderColor: color || Colors.LIGHT_GREY,
          borderWidth: 3,
          ...Mixins.padding(4, 0, 16, 0),
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
        }}>
        {icon}
        <Heading text={text} type="h5" color={color || Colors.LIGHT_GREY} />
      </View>
    </TouchableOpacity>
  );
};

export default UserTypeBox;
