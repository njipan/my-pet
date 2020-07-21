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

export default transform;
