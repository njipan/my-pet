import {createStackNavigator} from 'react-navigation-stack';
import {Screens} from '@constant';

import EditScreen from './edit';
import CreateScreen from './create';

export const MerchantTreatmentNavigator = {
  [Screens.TREATMENT_CREATE_MERCHANT]: CreateScreen,
  [Screens.TREATMENT_EDIT_MERCHANT]: EditScreen,
};
