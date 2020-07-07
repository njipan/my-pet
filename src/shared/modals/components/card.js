import React from 'react';
import {StyleSheet, View} from 'react-native';

const Card = (props) => {
  return <View style={styles.container}>{props.children}</View>;
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
