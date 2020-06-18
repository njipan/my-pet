import React from 'react';
import {View, Text, Button, Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import TabIcon from './components/tab-icon';
import HeaderMerchant from './components/layouts/header';

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

const MerchantBottomTabNavigator = createBottomTabNavigator(
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
        height: 64,
        backgroundColor: '#ffffff',
      },
    },
  },
);

export const Navigator = createStackNavigator({
  MerchantBottomTabNavigator: {
    screen: MerchantBottomTabNavigator,
    navigationOptions: (props) => {
      return {
        header: <HeaderMerchant {...props} />,
      };
    },
  },
});
