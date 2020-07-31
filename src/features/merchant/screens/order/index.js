import React from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import TopTabHeader from '@component/header/top-tab';
import HeaderMerchant from './../../components/layouts/header';

import ProgressScreen from './progress';
import HistoryScreen from './history';
import IncomingScreen from './incoming';
import IncomingDetailScreen from './incoming-detail';
import StatusDetailScreen from './status-detail';
import ProgressDetailScreen from './progress-detail';
import CheckoutDetailScreen from './checkout';
import HistoryDetailScreen from './history-detail';
import CreateTreatmentScreen from './create-treatment';
import UpdateTreatmentScreen from './update-treatment';
import ChooseTreatmentScreen from './choose-treatment';

import {Screens} from '@constant';
import {Typography} from '@style';

const MerchantOrderTopTabNavigator = createMaterialTopTabNavigator(
  {
    [Screens.ORDER_COMING_MERCHANT]: IncomingScreen,
    [Screens.ORDER_ON_PROGRESS_MERCHANT]: ProgressScreen,
    [Screens.ORDER_HISTORY_MERCHANT]: HistoryScreen,
  },
  {
    tabBarComponent: (props) => <TopTabHeader fontSize={14} {...props} />,
    tabBarOptions: {
      activeTintColor: '#1BA1F3',
      inactiveTintColor: '#000',
    },
  },
);

MerchantOrderTopTabNavigator.navigationOptions = (props) => {
  return {
    headerTitleStyle: {...Typography.FONT_HEADER_TITLE, elevation: 0},
    headerStyle: {
      elevation: 0,
    },
    header: <HeaderMerchant {...props} />,
  };
};

export const MerchantOrderScreens = {
  [Screens.ORDER_COMING_DETAIL_MERCHANT]: IncomingDetailScreen,
  [Screens.ORDER_STATUS_DETAIL_MERCHANT]: StatusDetailScreen,
  [Screens.ORDER_ON_PROGRESS_DETAIL_MERCHANT]: ProgressDetailScreen,
  [Screens.ORDER_CHECKOUT_DETAIL_MERCHANT]: CheckoutDetailScreen,
  [Screens.ORDER_HISTORY_DETAIL_MERCHANT]: HistoryDetailScreen,
  [Screens.ORDER_CREATE_TREATMENT_MERCHANT]: CreateTreatmentScreen,
  [Screens.ORDER_EDIT_TREATMENT_MERCHANT]: UpdateTreatmentScreen,
  [Screens.ORDER_CHOOSE_TREATMENT_MERCHANT]: ChooseTreatmentScreen,
};
// export {ProgressScreen, HistoryScreen, HistoryDetailScreen};

export default createStackNavigator({
  MerchantOrderTopTabNavigator,
});
