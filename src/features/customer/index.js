import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import HeaderCustomer from './components/layouts/header';
import {Screens, Navigators} from '@constant';
import {Icons} from '@component';
import * as CustomerScreens from './screens';
import BottomTabBar from './components/layouts/bottom-tab';
import ProfileSummaryScreen from './screens/profile/summary';

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
    [Screens.HOME_CUSTOMER]: {
      screen: CustomerScreens.HomeScreen,
      navigationOptions: (props) => {
        return {
          tabBarIcon: Icons.HomeTabBarIcon,
          title: 'Beranda',
        };
      },
    },
    [Screens.VET_SERVICE_CUSTOMER]: {
      screen: CustomerScreens.VetServiceScreen,
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
      const isHidden =
        navigation.state.routes[navigation.state.index].routeName ==
        Screens.PROFILE_SUMMARY_CUSTOMER;

      return {
        header: isHidden ? null : <HeaderCustomer {...props} />,
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
  [Screens.EDIT_PET_CUSTOMER]: {
    screen: CustomerScreens.Pet.CreateScreen,
    navigationOptions: {
      title: 'Ubah Peliharaan',
      headerTitleStyle: {
        fontFamily: 'sans-serif-medium',
      },
    },
  },
  [Screens.VET_SERVICE_DETAIL_CUSTOMER]: {
    screen: CustomerScreens.VetServiceDetailScreen,
    navigationOptions: (props) => {
      return {
        title: props.navigation.state.params.title,
      };
    },
  },
});
