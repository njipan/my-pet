import ProfileSummaryScreen from './summary';
import ProfileDetailScreen from './detail';
import ProfileEditScreen from './edit';
import {ChangePasswordScreen} from '@shared/screens';

import {Screens} from '@constant';

const nav = {
  [Screens.PROFILE_DETAIL_CUSTOMER]: ProfileDetailScreen,
  [Screens.PROFILE_EDIT_CUSTOMER]: ProfileEditScreen,
  [Screens.CHANGE_PASSWORD_SCREEN]: ChangePasswordScreen,
};

export default nav;

export {ProfileSummaryScreen, ProfileDetailScreen, ProfileEditScreen};
