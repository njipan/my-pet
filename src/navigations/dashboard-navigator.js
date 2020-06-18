import React from 'react';
import {View, Text, Image} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {Screens} from './../constants';
import DashboardScene from './../features/dashboard/scenes/Dashboard';

const Profile = ({navigation}) => {
  return (
    <View>
      <Text>PROFILE</Text>
    </View>
  );
};

const Setting = ({navigation}) => {
  return (
    <View>
      <Text>Setting</Text>
    </View>
  );
};

const DashboardTabNavigator = createBottomTabNavigator(
  {
    [Screens.DASHBOARD_SCREEN]: {
      screen: DashboardScene,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <Image
              source={require('./../assets/icons/bookmark_24px.png')}
              style={{width: 20, height: 20}}
            />
          );
        },
      },
    },
    Profile,
    Setting,
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

const DashboardNavigatorConfig = {
  header: null,
  headerMode: 'none',
};

const RouteConfigs = {
  DashboardTabNavigator,
};

const DashboardNavigator = createStackNavigator(
  RouteConfigs,
  DashboardNavigatorConfig,
);

export default DashboardNavigator;
