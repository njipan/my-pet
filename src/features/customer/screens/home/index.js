import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {Screens} from '@constant';
import HeaderCustomer from './../../components/layouts/header';
import HomeScreen from './home';

export const HomeStackNavigator = createStackNavigator({
  [Screens.HOME_CUSTOMER]: {
    screen: HomeScreen,
    navigationOptions: (props) => ({
      header: <HeaderCustomer {...props} />,
    }),
  },
});

export {HomeScreen};
