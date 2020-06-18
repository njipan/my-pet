import React from 'react';
import {Colors, Typography} from './../../styles';
import {Text} from 'react-native';

const LabelError = (props) => {
  const isEmpty = props.text || false;
  return (
    <>
      {isEmpty && (
        <Text
          style={{
            marginTop: 4,
            marginLeft: 6,
            color: Colors.ERROR,
            fontSize: Typography.FONT_SIZE_14,
          }}>
          {props.text || ''}
        </Text>
      )}
    </>
  );
};

export default LabelError;
