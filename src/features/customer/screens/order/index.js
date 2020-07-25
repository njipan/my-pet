import React from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import TopTabHeader from '@component/header/top-tab';

import ProgressScreen from './progress';
import HistoryScreen from './history';

import {Screens} from '@constant';
import {Typography} from '@style';

const CustomerOrderTopTabNavigator = createMaterialTopTabNavigator(
  {
    [Screens.ORDER_ON_PROGRESS_CUSTOMER]: ProgressScreen,
    [Screens.ORDER_HISTORY_CUSTOMER]: HistoryScreen,
  },
  {
    tabBarComponent: TopTabHeader,
    tabBarOptions: {
      activeTintColor: '#1BA1F3',
      inactiveTintColor: '#000',
    },
  },
);

CustomerOrderTopTabNavigator.navigationOptions = {
  title: 'Pesanan',
  headerTitleStyle: {...Typography.FONT_HEADER_TITLE, elevation: 0},
  headerStyle: {
    elevation: 0,
  },
};

export default createStackNavigator({
  CustomerOrderTopTabNavigator,
});
