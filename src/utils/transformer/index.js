export const toCamel = (str) =>
  str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace('-', '').replace('_', ''),
    );

export const toSnake = (str) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const transform = (data = {}, camel = true) => {
  return Object.keys(data).reduce((result, key) => {
    const transformedKey = camel ? toCamel(key) : toSnake(key);
    result[transformedKey] = data[key];
    return {...result};
  }, {});
};

export const isObject = function (obj) {
  return (
    obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function'
  );
};

export const toNumberFormat = (number, prefix = 'Rp ') => {
  return `${prefix}${new Intl.NumberFormat(['id']).format(number || 0)}`;
};

export const keysToCamel = function (obj) {
  if (isObject(obj)) {
    const n = {};

    Object.keys(obj).forEach((k) => {
      n[toCamel(k)] = keysToCamel(obj[k]);
    });

    return n;
  } else if (Array.isArray(obj)) {
    return obj.map((i) => {
      return keysToCamel(i);
    });
  }

  return obj;
};

export default transform;
