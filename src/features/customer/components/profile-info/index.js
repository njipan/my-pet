import React from 'react';
import {TouchableWithoutFeedback, View, Image, Text} from 'react-native';
import {Typography, Colors} from '@style';

const ProfileInfo = (props) => {
  const {
    picture = null,
    text = null,
    title = null,
    textStyle = {},
    pictureStyle = {},
    titleStyle = {},
    onTextPress = null,
  } = props;

  const isClickable = () => {
    return typeof onTextPress === 'function';
  };

  const textStyles = () => {
    return isClickable()
      ? Typography.CLICKABLE_TEXT
      : {color: Colors.LIGHT_GREY};
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <Image
        source={picture}
        style={{
          width: 72,
          height: 72,
          borderRadius: 10,
          backgroundColor: 'white',
          ...pictureStyle,
        }}
      />
      <View
        style={{
          flex: 1,
          paddingLeft: 16,
          paddingRight: 16,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            ...Typography.heading('h3'),
            fontFamily: 'sans-serif-normal',
            marginBottom: 2,
            ...titleStyle,
          }}>
          {title}
        </Text>
        <TouchableWithoutFeedback
          onPress={() => (isClickable() ? onTextPress() : null)}>
          <Text
            style={{
              ...Typography.CLICKABLE_TEXT,
              ...textStyles(),
              ...textStyle,
            }}>
            {text}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default ProfileInfo;
