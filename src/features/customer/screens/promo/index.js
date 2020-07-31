import PromoListScreen from './list';
import PromoDetailScreen from './detail';

import {Screens} from '@constant';

const PromoNavigator = {
  [Screens.PROMO_LIST_CUSTOMER]: PromoListScreen,
  [Screens.PROMO_DETAIL_CUSTOMER]: PromoDetailScreen,
};

export default PromoNavigator;
