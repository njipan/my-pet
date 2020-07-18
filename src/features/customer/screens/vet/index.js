import {createStackNavigator} from 'react-navigation-stack';
import VetServiceListScreen from './list';
import VetServiceDetailScreen from './detail';
import {Screens} from '@constant';

export {VetServiceListScreen, VetServiceDetailScreen};

export const VetStackNavigator = createStackNavigator({
  [Screens.VET_SERVICE_CUSTOMER]: VetServiceListScreen,
});
