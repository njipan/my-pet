import validator from 'validator';

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
};

export default schema;
