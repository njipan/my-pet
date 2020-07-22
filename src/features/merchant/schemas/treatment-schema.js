import validator from 'validator';

const schema = {
  name: {
    messageRequired: 'Nama tidak boleh kosong!',
  },
  description: {
    messageRequired: 'Deskripsi tidak boleh kosong!',
  },
  price: {
    messageRequired: 'Harga tidak boleh kosong!',
  },
};

export default schema;
