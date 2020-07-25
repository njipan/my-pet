import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';

import {Box, Colors, Mixins, Typography} from '@style';

const NotificationItem = (props) => {
  const {
    picture,
    text = null,
    description = null,
    done = true,
    onPress = null,
  } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          shadowColor: '#000',
          backgroundColor: 'white',
          ...Mixins.padding(14, 18),
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: Colors.BLACK10,
          borderBottomWidth: 0.8,
        }}>
        <View style={{justifyContent: 'center'}}>{picture}</View>
        <View style={{justifyContent: 'center', flex: 1, marginLeft: 14}}>
          <Text
            style={{
              fontFamily: Typography.FONT_FAMILY_REGULAR,
              fontWeight: 'bold',
              fontSize: 16,
              marginBottom: 2,
            }}>
            {text}
          </Text>
          <Text
            style={{
              fontFamily: Typography.FONT_FAMILY_MEDIUM,
              fontSize: 13,
              color: Colors.LIGHT_GREY,
            }}>
            {description}
          </Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text
            style={{
              fontFamily: Typography.FONT_FAMILY_MEDIUM,
              fontSize: 14,
              color: done ? Colors.SUCCESS : Colors.DANGER,
            }}>
            {done ? 'Selesai' : 'Dibatalkan'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shadow: {
    elevation: 10,
  },
});

export default NotificationItem;
