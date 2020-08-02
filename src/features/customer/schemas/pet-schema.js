import validator from 'validator';
import moment from 'moment';

const schema = {
  name: {
    messageRequired: 'Nama tidak boleh kosong!',
  },
  breed: {
    required: false,
  },
  sex: {
    messageRequired: 'Jenis kelamin harus dipilih!',
    validators: [
      {
        handler: (value) => value != 'MALE' && value != 'FEMALE',
        message: 'Jenis kelamin tidak valid!',
        result: true,
      },
    ],
  },
  weight: {
    required: false,
    validators: [
      {
        handler: validator.isFloat,
        message: 'Berat badan tidak valid!',
      },
    ],
  },
  dateOfBirth: {
    validators: [
      {
        handler: (value) => moment(value, 'DD-MM-YYYY').isValid(),
        message: 'Tanggal lahir tidak valid!',
      },
    ],
  },
  bodyColor: {
    required: true,
    messageRequired: 'Warna badan tidak boleh kosong!',
  },
  eyeColor: {
    required: true,
    messageRequired: 'Warna mata harus dipilih!',
  },
};

export default schema;
