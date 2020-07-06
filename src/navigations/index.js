import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {Navigators} from './../constants';
import {Auth, Customer, Merchant} from './../features';
import GlobalNavigation from './../utils/navigation';

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

const AppContainer = createAppContainer(RootNavigator);

export default class Navigator extends React.Component {
  render() {
    return (
      <AppContainer
        ref={(navigatorRef) => {
          GlobalNavigation.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
