import React, {useState, useEffect} from 'react';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import {Icons} from '@component';
import {Screens} from '@constant';
import {ChangePasswordScreen} from '@shared/screens';

import BottomTabBar from './components/layouts/bottom-tab';
import MerchantProfileStackNavigator, {
  MerchantProfileNavigator,
} from './screens/profile';
import {MerchantTreatmentNavigator} from './screens/treatment';
import MerchantOrderNavigator, {MerchantOrderScreens} from './screens/order';

export const MerchantBottomTabNavigator = createBottomTabNavigator(
  {
    MerchantOrderNavigator: {
      screen: MerchantOrderNavigator,
      navigationOptions: {
        tabBarIcon: Icons.OrderTabBarIcon,
        title: 'Pesanan',
      },
    },
    MerchantProfileStackNavigator: {
      screen: MerchantProfileStackNavigator,
      navigationOptions: {
        tabBarIcon: Icons.ProfileTabBarIcon,
        title: 'Profil',
      },
    },
  },
  {
    tabBarComponent: BottomTabBar,
    tabBarOptions: {
      style: {
        height: 72,
        backgroundColor: '#ffffff',
      },
    },
  },
);

export const Navigator = createStackNavigator({
  MerchantBottomTabNavigator: {
    screen: MerchantBottomTabNavigator,
    navigationOptions: () => {
      return {
        header: null,
      };
    },
  },
  ...MerchantProfileNavigator,
  ...MerchantTreatmentNavigator,
  ...MerchantOrderScreens,
  [Screens.CHANGE_PASSWORD_MERCHANT]: ChangePasswordScreen,
});
