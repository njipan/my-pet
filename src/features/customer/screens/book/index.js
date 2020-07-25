import DetailScreen from './detail';
import ChoosePetScreen from './choose-pet';
import ChooseTreatmentScreen from './choose-treatment';
import CheckoutScreen from './checkout';
import CheckoutSuccessScreen from './checkout-success';
import OrderDetailScreen from './order';

import {Screens} from '@constant';

export default {
  [Screens.ORDER_BOOKING_DETAIL_CUSTOMER]: DetailScreen,
  [Screens.ORDER_BOOKING_CHOOSE_PET_CUSTOMER]: ChoosePetScreen,
  [Screens.ORDER_BOOKING_CHOOSE_TREATMENT_CUSTOMER]: ChooseTreatmentScreen,
  [Screens.ORDER_BOOKING_CHECKOUT_CUSTOMER]: CheckoutScreen,
  [Screens.ORDER_BOOKING_CHECKOUT_SUCCESS_CUSTOMER]: CheckoutSuccessScreen,
  [Screens.ORDER_DETAIL_CUSTOMER]: OrderDetailScreen,
};

export {DetailScreen, ChoosePetScreen, ChooseTreatmentScreen, CheckoutScreen};
