import React from 'react';
import {TouchableHighlight, StyleSheet, Text, View} from 'react-native';

import {Colors, Mixins, Typography} from '@style';

const NotificationCard = (props) => {
  const {picture, text = null, description = null, onPress = () => {}} = props;
  return (
    <TouchableHighlight underlayColor="transparent" onPress={onPress}>
      <View
        style={{
          backgroundColor: 'white',
          borderColor: Colors.SHADOW,
          borderWidth: 1,
          ...Mixins.padding(14, 18),
          borderRadius: 6,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 8,
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
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  shadow: {
    elevation: 10,
  },
});

export default NotificationCard;
