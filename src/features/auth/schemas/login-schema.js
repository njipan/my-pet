import validator from 'validator';
import moment from 'moment';

const schema = {
  email: {
    required: true,
    messageRequired: 'Email tidak boleh kosong!',
    validators: [
      {
        handler: validator.isEmail,
        message: 'Email tidak valid!',
      },
    ],
  },
  password: {
    required: true,
    messageRequired: 'Password tidak boleh kosong!',
    validators: [
      {
        handler: (text) => text.length >= 6,
        message: 'Password tidak valid!',
      },
    ],
  },
};

export default schema;
