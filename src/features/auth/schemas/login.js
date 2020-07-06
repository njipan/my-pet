import validator from 'validator';

const LoginValidator = {
  email: [
    [validator.isEmpty, 'Email harus diisi!', true],
    [validator.isEmail, 'Email tidak valid!'],
  ],
  password: [
    [validator.isEmpty, 'Password harus diisi!', true],
    [(text) => text.length >= 6, 'Minimum 6 karakter', false],
  ],
  type: [
    [validator.isEmpty, 'Tipe harus dipilih!', true],
    [(text) => type == 1 || type == 2, 'Tipe yang dipilih tidak valid!', false],
  ],
};

export default LoginValidator;
