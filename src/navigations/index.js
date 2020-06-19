import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {Navigators} from './../constants';
import {Auth, Merchant} from './../features';

const RootNavigator = createSwitchNavigator(
  {
    [Navigators.MERCHANT_NAVIGATOR]: Merchant.Navigator,
    [Navigators.AUTH_NAVIGATOR]: Auth.Navigator,
  },
  {
    initialRouteName: Navigators.MERCHANT_NAVIGATOR,
  },
);

export default createAppContainer(RootNavigator);
