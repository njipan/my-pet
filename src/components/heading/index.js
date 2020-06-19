import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text} from 'react-native';
import {Colors, Typography} from '@style';

const Heading = ({
  color = Colors.PRIMARY,
  type = 'h1',
  text = '',
  padding = {},
  margin = {},
  styleText = {},
}) => {
  const mergeStyles = {
    ...styles[type],
    ...Typography.FONT_BOLD,
    color,
    ...padding,
    ...margin,
    ...styleText,
  };
  return <Text style={mergeStyles}>{text}</Text>;
};

const styles = StyleSheet.create({
  h1: {
    fontSize: Typography.FONT_SIZE_H1,
    letterSpacing: -1.5,
  },
  h2: {
    fontSize: Typography.FONT_SIZE_H2,
    letterSpacing: -0.5,
  },
  h3: {
    fontSize: Typography.FONT_SIZE_H3,
    letterSpacing: -0,
  },
  h4: {
    fontSize: Typography.FONT_SIZE_H4,
    letterSpacing: 0.25,
  },
  h5: {
    fontSize: Typography.FONT_SIZE_H5,
    letterSpacing: 0,
  },
  h6: {
    fontSize: Typography.FONT_SIZE_H6,
    letterSpacing: 0.25,
  },
});

Heading.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string,
  margin: PropTypes.object,
  padding: PropTypes.object,
};

export default Heading;
