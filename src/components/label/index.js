import React from 'react';
import {Text, View} from 'react-native';

import {Box, Colors} from '@style';

const Label = (props) => {
  const {
    styleRoot = {},
    styleLabel = {},
    styleText = {},
    title = null,
    text = null,
  } = props;

  return (
    <View
      style={{
        paddingTop: 10,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.BLACK10,
        ...styleRoot,
      }}>
      <Text style={{...Box.LABEL_TITLE, ...styleLabel}}>{title}</Text>
      <Text style={{...Box.LABEL_VALUE, ...styleText}}>{text}</Text>
    </View>
  );
};

export default Label;
