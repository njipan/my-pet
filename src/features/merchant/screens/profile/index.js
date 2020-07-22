import {createStackNavigator} from 'react-navigation-stack';
import {Screens} from '@constant';

import ProfileDetailScreen from './detail';
import ProfileEditScreen from './edit';
import ProfilePreviewScreen from './preview';

const MerchantProfileStackNavigator = createStackNavigator({
  [Screens.PROFILE_DETAIL_MERCHANT]: ProfileDetailScreen,
});

export default MerchantProfileStackNavigator;

export const MerchantProfileNavigator = {
  [Screens.PROFILE_EDIT_MERCHANT]: ProfileEditScreen,
  [Screens.PROFILE_PREVIEW_MERCHANT]: ProfilePreviewScreen,
};
