import validator from 'validator';

const schema = {
  fullName: {
    required: true,
    messageRequired: 'Nama Lengkap tidak boleh kosong!',
  },
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
  phone: {
    required: true,
    messageRequired: 'Nomor Handphone tidak boleh kosong!',
    validators: [
      {
        handler: validator.isNumeric,
        message: 'Nomor Handphone tidak valid!',
      },
    ],
  },
  password: {
    required: true,
    messageRequired: 'Kata Sandi tidak boleh kosong!',
    validators: [
      {
        handler: (text) => text.length >= 6,
        message: 'Kata Sandi minimum 6 karakter!',
      },
    ],
  },
};

export default schema;
