import validator from 'validator';
const validate = async (value, validators) => {
  for (let validator of validators) {
    const fn = validator[0];
    const message = validator[1] || 'null';
    const isError = validator[2] || false;

    if (fn(value || '') == isError) {
      return message;
    }
  }
};
export default validate;
export {validator, validate};
