import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Colors, Mixins, Typography} from '@style';

const AddCard = ({
  onPress = () => {},
  text = 'Tambah Perawatan',
  styleRoot = {},
  styleText = {},
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          borderRadius: 8,
          padding: 12,
          width: '100%',
          borderStyle: 'dashed',
          borderWidth: 2,
          borderColor: Colors.LIGHT_GREY,
          justifyContent: 'center',
          alignItems: 'center',
          ...styleRoot,
        }}>
        <Text
          style={{
            fontFamily: Typography.FONT_FAMILY_BOLD,
            color: Colors.BLACK80,
            ...styleText,
          }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AddCard;
