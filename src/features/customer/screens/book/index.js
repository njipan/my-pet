import DetailScreen from './detail';
import ChoosePetScreen from './choose-pet';
import ChooseTreatmentScreen from './choose-treatment';

import {Screens} from '@constant';

export default {
  [Screens.ORDER_BOOKING_DETAIL_CUSTOMER]: DetailScreen,
  [Screens.ORDER_BOOKING_CHOOSE_PET_CUSTOMER]: ChoosePetScreen,
  [Screens.ORDER_BOOKING_CHOOSE_TREATMENT_CUSTOMER]: ChooseTreatmentScreen,
};
