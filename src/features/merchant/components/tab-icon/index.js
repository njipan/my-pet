import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';

const TabIcon = ({navigation, icon, onPress = () => {}}) => {
  return <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>;
};

export default TabIcon;
