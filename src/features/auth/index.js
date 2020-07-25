import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';

import {Screens} from './../../constants';
import {
  LoginScreen,
  ForgotPasswordScreen,
  SplashScreen,
  RegisterScreen,
} from './screens';

const AuthNavigatorConfig = {
  initialRouteName: Screens.SPLASH_SCREEN,
  mode: 'card',
};

const RouteConfigs = {
  [Screens.LOGIN_SCREEN]: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
      headerMode: 'none',
    },
  },
  [Screens.REGISTER_SCREEN]: {
    screen: RegisterScreen,
    navigationOptions: {
      header: null,
      headerMode: 'none',
    },
  },
  [Screens.SPLASH_SCREEN]: {
    screen: SplashScreen,
    navigationOptions: {
      header: null,
      headerMode: 'none',
    },
  },
  [Screens.FORGOT_PASSWORD_SCREEN]: ForgotPasswordScreen,
};

export const Navigator = createStackNavigator(
  {
    AuthStackNavigator: createStackNavigator(RouteConfigs, AuthNavigatorConfig),
  },
  {
    mode: 'modal',
    headerMode: 'none',
    cardStyle: {opacity: 1, backgroundColor: '#0c0d0e7d'},
  },
);
