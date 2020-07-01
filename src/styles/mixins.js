import {Dimensions, PixelRatio, Platform} from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const guidelineBaseWidth = 375;

export const scaleSize = (size) => (WINDOW_WIDTH / guidelineBaseWidth) * size;

export const scaleFont = (size) => size * PixelRatio.getFontScale();

function dimensions(top, right = top, bottom = top, left = right, property) {
  let styles = {};

  styles[`${property}Top`] = top;
  styles[`${property}Right`] = right;
  styles[`${property}Bottom`] = bottom;
  styles[`${property}Left`] = left;

  return styles;
}

export function margin(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'margin');
}

export function padding(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'padding');
}

export function boxShadow(
  color,
  offset = {height: 2, width: 2},
  radius = 8,
  opacity = 0.2,
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}

export function iconSize(type = 'large') {
  const size = {
    small: {
      width: 24,
      height: 24,
    },
    medium: {
      width: 28,
      height: 28,
    },
    large: {
      width: 32,
      height: 32,
    },
  }[type || 'large'];

  return size;
}

const font = {
  OpenSans: {
    weights: {
      ExtraBold: '800',
      Bold: '700',
      SemiBold: '600',
      Light: '300',
      Normal: '400',
    },
    styles: {
      Italic: 'italic',
    },
  },
};

export const fontMaker = (options = {}) => {
  let {weight, style, family} = Object.assign(
    {
      weight: null,
      style: null,
      family: 'OpenSans',
    },
    options,
  );

  const {weights, styles} = font[family];

  if (Platform.OS === 'android') {
    weight = weights[weight] ? weight : '';
    style = styles[style] ? style : '';

    const suffix = weight + style;

    return {
      fontFamily: family + (suffix.length ? `-${suffix}` : ''),
    };
  } else {
    weight = weights[weight] || weights.Normal;
    style = styles[style] || 'normal';

    return {
      fontFamily: family,
      fontWeight: weight,
      fontStyle: style,
    };
  }
};
