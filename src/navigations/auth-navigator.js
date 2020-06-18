import {createStackNavigator} from 'react-navigation-stack';

import {Screens} from './../constants';
import {Auth} from './../features';

const AuthNavigatorConfig = {
  initialRouteName: Screens.LOGIN_SCREEN,
  header: null,
  headerMode: 'none',
};

const RouteConfigs = {
  [Screens.LOGIN_SCREEN]: Auth.Scenes.LoginScreen,
  [Screens.SPLASH_SCREEN]: Auth.Scenes.SplashScreen,
};

const AuthNavigator = createStackNavigator(RouteConfigs, AuthNavigatorConfig);

export default AuthNavigator;
