import React from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';

import {Colors, Typography} from '@style';

const ButtonSave = ({onPress, ...props}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {typeof onPress != 'function' ? null : (
        <View
          style={{
            paddingHorizontal: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={{width: 14, height: 14, marginRight: 8}}
            source={require('@asset/icons/indicators/check-success.png')}
          />
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                color: Colors.SUCCESS,
                fontFamily: Typography.FONT_FAMILY_BOLD,
                fontSize: 16,
              }}>
              {props.text || 'Simpan'}
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ButtonSave;
