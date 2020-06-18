import {createStackNavigator} from 'react-navigation-stack';

import {Screens} from './../../constants';
import {
  LoginScreen,
  ForgotPasswordScreen,
  SplashScreen,
  RegisterScreen,
} from './scenes';

const AuthNavigatorConfig = {
  initialRouteName: Screens.SPLASH_SCREEN,
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
  RouteConfigs,
  AuthNavigatorConfig,
);
