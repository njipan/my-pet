import validator from 'validator';

const schema = {
  fullName: {
    messageRequired: 'Nama tidak boleh kosong!',
  },
  email: {
    messageRequired: 'Email tidak boleh kosong!',
  },
  phone: {
    messageRequired: 'Nomor Telepon tidak boleh kosong!',
  },
  address: {
    messageRequired: 'Alamat Klinik tidak boleh kosong!',
  },
  operationalHour: {
    messageRequired: 'Jam Operasional tidak boleh kosong!',
  },
};

export default schema;
