import * as Mixins from './mixins';
import * as Colors from './colors';
import * as Typography from './typography';

export const SHADOW = {
  elevation: 3,
};

export const NO_SHADOW = {
  elevation: 0,
  shadowOpacity: 0,
  borderBottomWidth: 0,
};
export const SPACER_TEXT = {...Mixins.margin(2, 0)};
export const SPACER_CONTAINER = {
  ...Mixins.padding(6, 0),
  backgroundColor: Colors.BLACK10,
};

export const CONTAINER_TITLE = {
  fontFamily: Typography.FONT_FAMILY_REGULAR,
  fontWeight: '700',
  color: Colors.GREY,
  fontSize: 18,
};

export const LABEL_TITLE = {
  fontFamily: Typography.FONT_FAMILY_BOLD,
  fontSize: 11,
  color: Colors.GREY,
  paddingLeft: 1,
};

export const LABEL_VALUE = {
  fontFamily: Typography.FONT_FAMILY_MEDIUM,
  fontWeight: '400',
  fontSize: 14,
  color: Colors.BLACK87,
  textTransform: 'capitalize',
};

export const CONTAINER_CARD = {
  borderRadius: 10,
  shadowColor: Colors.BLACK80,
  shadowOpacity: 0.2,
  shadowRadius: 1,
  elevation: 2,
  ...Mixins.padding(12),
};

export const CONTAINER_ACTION_BOTTOM = {
  height: 72,
  justifyContent: 'center',
  paddingHorizontal: 20,
};
