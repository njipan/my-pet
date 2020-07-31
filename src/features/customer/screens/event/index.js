import EventListScreen from './list';
import EventDetailScreen from './detail';

import {Screens} from '@constant';

const EventNavigator = {
  [Screens.EVENT_LIST_CUSTOMER]: EventListScreen,
  [Screens.EVENT_DETAIL_CUSTOMER]: EventDetailScreen,
};

export default EventNavigator;
