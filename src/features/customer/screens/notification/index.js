import React from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import TopTabHeader from '@component/header/top-tab';

import ProgressOrderScreen from './../order/progress';
import EventNotificationScreen from './event-notification';
import PromoNotificationScreen from './promo-notification';

import {Screens} from '@constant';
import {Typography} from '@style';

const CustomerNotificationTopTabNavigator = createMaterialTopTabNavigator(
  {
    [Screens.NOTIFICATION_ORDER_CUSTOMER]: {
      screen: ProgressOrderScreen,

      navigationOptions: ({navigation, ...props}) => {
        const count = navigation.getParam('count', 0);
        const textCount = count > 0 ? `(${count})` : '';
        return {
          title: 'Pesanan' + textCount,
        };
      },
    },
    [Screens.NOTIFICATION_PROMO_CUSTOMER]: {
      screen: PromoNotificationScreen,
      navigationOptions: ({navigation, ...props}) => {
        const count = navigation.getParam('count', 0);
        const textCount = count > 0 ? `(${count})` : '';
        return {
          title: 'Promo' + textCount,
        };
      },
    },
    [Screens.NOTIFICATION_EVENT_CUSTOMER]: {
      screen: EventNotificationScreen,
      navigationOptions: ({navigation, ...props}) => {
        const count = navigation.getParam('count', 0);
        const textCount = count > 0 ? `(${count})` : '';
        return {
          title: 'Event' + textCount,
        };
      },
    },
  },
  {
    tabBarComponent: (props) => <TopTabHeader fontSize={14} {...props} />,
    tabBarOptions: {
      activeTintColor: '#1BA1F3',
      inactiveTintColor: '#000',
    },
  },
);

export default CustomerNotificationTopTabNavigator;
