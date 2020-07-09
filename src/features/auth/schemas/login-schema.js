import validator from 'validator';
import moment from 'moment';

const schema = {
  email: {
    required: true,
    messageRequired: 'Nama tidak boleh kosong!',
    validators: [
      {
        handler: validator.isEmail,
        message: 'Email tidak valid!',
      },
    ],
  },
  password: {
    required: false,
    messageRequired: 'Password tidak boleh kosong!',
    validators: [
      {
        handler: (text) => text.length >= 6,
        message: 'Password tidak valid!',
      },
    ],
  },
  type: {
    messageRequired: 'Tipe peliharaan harus dipilih!',
    validators: [
      {
        handler: (text) => type == 1 || type == 2,
        message: 'Tipe yang dipilih tidak valid!',
      },
    ],
  },
};

export default schema;
