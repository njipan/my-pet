import React from 'react';
import {TouchableHighlight, Text, View, StyleSheet} from 'react-native';

import {Colors, Typography, Box} from '@style';

const Quantity = (props) => {
  const {value = 0, onPress = () => {}} = props;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableHighlight
        onPress={() => onPress((value || 0) - 1)}
        style={{backgroundColor: 'white'}}
        underlayColor={'white'}>
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: 'white',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#80808012',
          }}>
          <Text
            style={{fontSize: 24, fontFamily: Typography.FONT_FAMILY_MEDIUM}}>
            -
          </Text>
        </View>
      </TouchableHighlight>
      <View
        style={{
          width: 40,
          height: 40,
          marginHorizontal: 10,
          backgroundColor: 'white',
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 18, fontFamily: Typography.FONT_FAMILY_MEDIUM}}>
          {value || 0}
        </Text>
      </View>
      <TouchableHighlight
        onPress={() => onPress((value || 0) + 1)}
        underlayColor={'white'}>
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: 'white',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: Colors.SHADOW,
          }}>
          <Text
            style={{fontSize: 18, fontFamily: Typography.FONT_FAMILY_MEDIUM}}>
            +
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default Quantity;
