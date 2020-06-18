import React, {useState, useEffect} from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import {Colors} from './../../../../styles';

const DashboardScene = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>DASHBOARD PAGE</Text>
      <Button
        onPress={() => {
          navigation.navigate('Splash');
        }}
        title="Splash Screen"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.SPLASH_SCREEN,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DashboardScene;
