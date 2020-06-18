import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {Navigators} from './../constants';
import {Auth, Merchant} from './../features';

const MerchantStackNavigator = createStackNavigator(
  {
    [Navigators.MERCHANT_NAVIGATOR]: Merchant.Navigator,
  },
  {
    header: null,
    headerMode: 'none',
  },
);

const RootNavigator = createSwitchNavigator(
  {
    MerchantStackNavigator,
    [Navigators.AUTH_NAVIGATOR]: Auth.Navigator,
  },
  {
    initialRouteName: Navigators.AUTH_NAVIGATOR,
  },
);

export default createAppContainer(RootNavigator);
