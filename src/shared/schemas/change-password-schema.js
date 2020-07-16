const schema = {
  oldPassword: {
    required: true,
    messageRequired: 'Kata Sandi Lama tidak boleh kosong!',
    validators: [
      {
        handler: (text) => text.length >= 6,
        message: 'Kata Sandi Lama minimum 6 karakter!',
      },
    ],
  },
  newPassword: {
    required: true,
    messageRequired: 'Kata Sandi Baru tidak boleh kosong!',
    validators: [
      {
        handler: (text) => text.length >= 6,
        message: 'Kata Sandi Baru minimum 6 karakter!',
      },
    ],
  },
  confirmNewPassword: {
    required: true,
    messageRequired: 'Ulang Kata Sandi tidak boleh kosong!',
    validators: [
      {
        handler: (text) => text.length >= 6,
        message: 'Ulang Kata Sandi Baru minimum 6 karakter!',
      },
    ],
  },
};

export default schema;
