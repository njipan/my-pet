import React from 'react';
import {View, Text, Button} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import TabIcon from './components/tab-icon';

const Home = ({navigation}) => {
  return (
    <View>
      <Text>HOME</Text>
      <Button
        title="Go to Login"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    </View>
  );
};

const Profile = ({navigation}) => {
  return (
    <View>
      <Text>Profile</Text>
      <Button
        title="Go to Home"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

export const Navigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: <TabIcon />,
      },
    },
    Profile,
  },
  {
    tabBarOptions: {
      style: {
        height: 55,
        backgroundColor: '#8e7e7e',
      },
    },
  },
);
