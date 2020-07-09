import React from 'react';
import {StyleSheet, View} from 'react-native';

const Card = (props) => {
  const {styleRoot = {}} = props;
  return (
    <View style={{...styles.container, ...styleRoot}}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 28,
    width: '80%',
    padding: 28,
    backgroundColor: 'white',
  },
});

export default Card;
