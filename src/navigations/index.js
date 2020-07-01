import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {Navigators} from './../constants';
import {Auth, Customer, Merchant} from './../features';

const RootNavigator = createSwitchNavigator(
  {
    [Navigators.AUTH_NAVIGATOR]: Auth.Navigator,
    [Navigators.MERCHANT_NAVIGATOR]: Merchant.Navigator,
    [Navigators.CUSTOMER_NAVIGATOR]: Customer.Navigator,
  },
  {
    initialRouteName: Navigators.CUSTOMER_NAVIGATOR,
  },
);

export default createAppContainer(RootNavigator);
