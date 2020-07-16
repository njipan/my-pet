import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {Screens} from '@constant';

import ChangePasswordScreen from './change-password';

export {ChangePasswordScreen};
export default createStackNavigator({
  [Screens.CHANGE_PASSWORD_SCREEN]: ChangePasswordScreen,
});
