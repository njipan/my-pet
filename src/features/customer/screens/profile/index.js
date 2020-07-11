import {createStackNavigator} from 'react-navigation-stack';
import {Screens} from '@constant';
import ProfileSummary from './summary';

export default createStackNavigator({
  [Screens.PROFILE_SUMMARY_CUSTOMER]: ProfileSummary,
});
