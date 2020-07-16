import validator from 'validator';

const schema = {
  name: {
    messageRequired: 'Nama tidak boleh kosong!',
  },
  email: {
    messageRequired: 'Email tidak boleh kosong!',
    validators: [
      {
        handler: validator.isEmail,
        message: 'Email tidak valid!',
      },
    ],
  },
  phone: {
    messageRequired: 'Nomor Telepon tidak boleh kosong!',
    validators: [
      {
        handler: validator.isNumeric,
        message: 'Nomor Telepon tidak valid!',
      },
    ],
  },
  birthDate: {
    required: false,
  },
  birthPlace: {
    required: false,
  },
  sex: {
    required: false,
    messageRequired: 'Jenis kelamin harus dipilih!',
    validators: [
      {
        handler: (value) => value != 'MALE' && value != 'FEMALE',
        message: 'Jenis kelamin tidak valid!',
        result: true,
      },
    ],
  },
};

export default schema;
