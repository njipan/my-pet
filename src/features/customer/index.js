import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {Screens, Navigators} from '@constant';
import {Icons} from '@component';
import {Box, Typography} from '@style';
import * as CustomerScreens from './screens';
import BottomTabBar from './components/layouts/bottom-tab';
import ProfileNavigator, {ProfileSummaryScreen} from './screens/profile';
import {VetStackNavigator, VetServiceDetailScreen} from './screens/vet';
import {HomeStackNavigator} from './screens/home';
import OrderBookingNavigator from './screens/book';

const Pesanan = () => {
  return (
    <View>
      <Text>Pesanan</Text>
    </View>
  );
};

const NotificationTopNavigator = createMaterialTopTabNavigator(
  {
    Pesanan: {
      screen: CustomerScreens.OrderNotificationScreen,
      navigationOptions: {
        title: 'Pesanan(1)',
      },
    },
    Pesanan_2: {
      screen: CustomerScreens.PromoNotificationScreen,
      navigationOptions: {
        title: 'Promo(1)',
      },
    },
    Pesanan_1: {
      screen: CustomerScreens.EventNotificationScreen,
      navigationOptions: {
        title: 'Event(1)',
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

const CustomerTabBottomNavigator = createBottomTabNavigator(
  {
    HomeStackNavigator: {
      screen: HomeStackNavigator,
      navigationOptions: (props) => {
        return {
          tabBarIcon: Icons.HomeTabBarIcon,
          title: 'Beranda',
        };
      },
    },
    VetStackNavigator: {
      screen: VetStackNavigator,
      navigationOptions: (props) => {
        return {
          tabBarIcon: Icons.VetServiceTabBarIcon,
          title: 'Vet Servis',
        };
      },
    },
    [Screens.ORDER_CUSTOMER]: {
      screen: Pesanan,
      navigationOptions: (props) => {
        return {
          tabBarIcon: Icons.OrderTabBarIcon,
          title: 'Pesanan',
        };
      },
    },
    [Screens.PROFILE_SUMMARY_CUSTOMER]: {
      screen: ProfileSummaryScreen,
      navigationOptions: {
        title: 'Profil',
        tabBarIcon: Icons.ProfileTabBarIcon,
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
  CustomerTabBottomNavigator: {
    screen: CustomerTabBottomNavigator,
    navigationOptions: ({navigation, ...props}) => {
      const hideHeader = ['CustomerTabBottomNavigator'].includes(
        navigation.state.routeName,
      );
      const opt = {
        headerTitleStyle: Typography.FONT_HEADER_TITLE,
        headerStyle: Box.NO_SHADOW,
      };
      if (hideHeader) opt.header = null;
      return {
        ...opt,
      };
    },
  },
  [Screens.HOME_NOTIFICATION]: {
    screen: NotificationTopNavigator,
    navigationOptions: {
      title: 'Notification',
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
    },
  },
  [Screens.ADD_PET_CUSTOMER]: {
    screen: CustomerScreens.Pet.CreateScreen,
    navigationOptions: {
      title: 'Tambah Peliharaan',
      headerTitleStyle: {
        fontFamily: 'sans-serif-medium',
      },
    },
  },
  [Screens.DETAIL_PET_CUSTOMER]: CustomerScreens.Pet.DetailScreen,
  [Screens.EDIT_PET_CUSTOMER]: CustomerScreens.Pet.EditScreen,
  [Screens.VET_SERVICE_DETAIL_CUSTOMER]: {
    screen: VetServiceDetailScreen,
    navigationOptions: (props) => {
      return {
        title:
          props.navigation.getParam('data', {}).full_name || 'Veterinarian',
      };
    },
  },
  ...ProfileNavigator,
  ...OrderBookingNavigator,
});
