import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Navigators} from './../constants';
import {Auth, Customer, Merchant} from './../features';
import GlobalNavigation from './../utils/navigation';
import {Modal} from './../shared';
import {Colors} from '@style';

const RootNavigator = createStackNavigator(
  {
    [Navigators.AUTH_NAVIGATOR]: Auth.Navigator,
    [Navigators.MERCHANT_NAVIGATOR]: Merchant.Navigator,
    [Navigators.CUSTOMER_NAVIGATOR]: Customer.Navigator,
    [Modal.Type.CONFIRMATION]: Modal.Confirmation,
    [Modal.Type.SELECT]: Modal.Select,
  },
  {
    mode: 'modal',
    headerMode: 'none',
    cardStyle: {opacity: 1, backgroundColor: Colors.MODAL},
    initialRouteName: Navigators.AUTH_NAVIGATOR,
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
