import React, {useState, useEffect} from 'react';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import HeaderMerchant from './components/layouts/header';
import {Screens} from '@constant';
import {Icons} from '@component';
import * as MerchantScreens from './screens';
import BottomTabBar from './components/layouts/bottom-tab';
import {Text, View} from 'react-native';

const Pesanan = () => {
  return (
    <View>
      <Text>Pesanan</Text>
    </View>
  );
};

const OrderTopNavigator = createMaterialTopTabNavigator(
  {
    [Screens.ORDER_MERCHANT]: {
      screen: Pesanan,
      navigationOptions: {
        title: 'Terbaru(1)',
      },
    },
    Pesanan_2: {
      screen: Pesanan,
      navigationOptions: {
        title: 'Dalam Proses',
      },
    },
    Pesanan_1: {
      screen: Pesanan,
      navigationOptions: {
        title: 'Pesanan 222',
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'black',
      showIcon: false,
      showLabel: true,
      style: {
        backgroundColor: 'white',
      },
    },
  },
);

const OrderStackNavigator = createStackNavigator({
  OrderTopNavigator: {
    screen: OrderTopNavigator,
    navigationOptions: (props) => {
      return {
        header: <HeaderMerchant {...props} />,
      };
    },
  },
});

const ProfileStackNavigator = createStackNavigator({
  [Screens.PROFILE_MERCHANT]: {
    screen: MerchantScreens.ProfileScreen,
    navigationOptions: {
      title: '',
    },
  },
});

export const Navigator = createBottomTabNavigator(
  {
    OrderStackNavigator: {
      screen: OrderStackNavigator,
      navigationOptions: {
        tabBarIcon: Icons.OrderTabBarIcon,
        title: 'Pesanan',
      },
    },
    ProfileStackNavigator: {
      screen: ProfileStackNavigator,
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

// export const Navigator = createStackNavigator({
//   MerchantBottomTabNavigator: {
//     screen: MerchantBottomTabNavigator,
//   },
// });
