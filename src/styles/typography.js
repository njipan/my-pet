import {scaleFont} from './mixins';
import * as Colors from './colors';

// FONT FAMILY
export const FONT_FAMILY_REGULAR = 'OpenSans-Regular';
export const FONT_FAMILY_BOLD = 'OpenSans-Bold';

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_BOLD = '700';

export const FONT_SIZE_H1 = scaleFont(36);
export const FONT_SIZE_H2 = scaleFont(28);
export const FONT_SIZE_H3 = scaleFont(24);
export const FONT_SIZE_H4 = scaleFont(20);
export const FONT_SIZE_H5 = scaleFont(16);
export const FONT_SIZE_H6 = scaleFont(12);

// FONT SIZE
export const FONT_SIZE_20 = scaleFont(20);
export const FONT_SIZE_18 = scaleFont(18);
export const FONT_SIZE_16 = scaleFont(16);
export const FONT_SIZE_14 = scaleFont(14);
export const FONT_SIZE_12 = scaleFont(12);

export const FONT_SIZE_REGULAR = scaleFont(18);

// LINE HEIGHT
export const LINE_HEIGHT_24 = scaleFont(24);
export const LINE_HEIGHT_20 = scaleFont(20);
export const LINE_HEIGHT_16 = scaleFont(16);

// FONT STYLE
export const FONT_REGULAR = {
  fontFamily: FONT_FAMILY_REGULAR,
  fontWeight: FONT_WEIGHT_REGULAR,
  fontSize: FONT_SIZE_REGULAR,
  color: Colors.BLACK54,
};

export const FONT_BOLD = {
  fontFamily: FONT_FAMILY_BOLD,
  fontWeight: FONT_WEIGHT_BOLD,
};

export const FONT_SCREEN_DESCRIPTION = {
  fontSize: FONT_SIZE_REGULAR,
  color: Colors.BLACK54,
};

export const FONT_HEADER_TITLE = {
  fontSize: FONT_SIZE_H5,
  color: Colors.PRIMARY,
  fontWeight: FONT_WEIGHT_REGULAR,
};
