import validator from 'validator';

const validate = async (body, schema) => {
  return Object.keys(schema).reduce((acc, field) => {
    const temp = acc;
    temp[field] = singleValidate((body[field] || '').toString(), schema[field]);
    return temp;
  }, {});
};

const singleValidate = (value, schema) => {
  const isRequired =
    typeof schema.required == 'undefined' ? true : schema.required;
  if (isRequired == true && validator.isEmpty(value || '')) {
    return schema.messageRequired || 'Tidak boleh kosong!';
  }
  if (isRequired == false && validator.isEmpty(value + '' || '')) return null;

  if (!Array.isArray(schema.validators)) return null;
  for (let itemValidator of schema.validators) {
    const result =
      typeof itemValidator.result == 'undefined' ? false : itemValidator.result;
    if (itemValidator.handler(value + '') == result) {
      return itemValidator.message || 'Tidak valid!';
    }
  }

  return null;
};

export const isObjectValuesNull = (data = {}) => {
  return Object.values(data).find((item) => item != null) == undefined;
};

export default validate;
export {validator, singleValidate, validate};
