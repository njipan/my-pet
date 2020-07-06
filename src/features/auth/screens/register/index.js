import React, {useState} from 'react';
import {View, ToastAndroid, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Heading,
  ButtonFluid,
  PasswordInput,
  TextInput,
  Icons,
} from '@component';
import {Screens} from '@constant';
import RegisterForm from './../../components/form/register-form';
import {AuthService} from '@service';
import {validate, validator} from '@util/validate';

const initState = {
  fullName: null,
  email: null,
  phoneNumber: null,
  password: null,
  confirmPassword: null,
  type: null,
};

const RegisterScreen = ({navigation}) => {
  const [data, setData] = useState({...initState});
  const [errorMessages, setErrorMessages] = useState({...initState});

  const onFullNameChange = async (text) => {
    setData({...data, fullName: text});
    const message = await validate(text, [
      [validator.isEmpty, 'Nama lengkap tidak boleh kosong!', true],
    ]);
    setErrorMessages({...errorMessages, fullName: message});
  };
  const onEmailChange = async (text) => {
    setData({...data, email: text});
    const message = await validate(text, [
      [validator.isEmpty, 'Email tidak boleh kosong!', true],
      [validator.isEmail, 'Email tidak valid!'],
    ]);
    setErrorMessages({...errorMessages, email: message});
  };
  const onPhoneNumberChange = async (text) => {
    setData({...data, phoneNumber: text});
    const message = await validate(text, [
      [validator.isEmpty, 'Nomor Handphone tidak boleh kosong!', true],
      [validator.isNumeric, 'Nomor Handphone tidak valid!'],
    ]);
    setErrorMessages({...errorMessages, phoneNumber: message});
  };
  const onPasswordChange = async (text) => {
    setData({...data, password: text});
    const message = await validate(text, [
      [validator.isEmpty, 'Password tidak boleh kosong!', true],
      [(text) => text.length >= 6, 'Minimum 6 karakter!'],
    ]);
    setErrorMessages({...errorMessages, password: message});
  };
  const onConfirmPasswordChange = async (text) => {
    setData({...data, confirmPassword: text});
    const message = await validate(text, [
      [(text) => text == data.password, 'Tidak boleh berbeda dengan password!'],
    ]);
    setErrorMessages({...errorMessages, confirmPassword: message});
  };

  const onSubmit = () => {
    ToastAndroid.show('Please Wait ...', ToastAndroid.LONG);
    setData({...data, type: navigation.state.params.type || 1});
    AuthService.register(data)
      .then((response) => {
        ToastAndroid.show('Berhasil!', ToastAndroid.LONG);
      })
      .catch((err) => {
        ToastAndroid.show(
          err.response.data.message || 'Oops..\nLengkapi form yang tersedia',
          ToastAndroid.LONG,
        );
      });
  };

  return (
    <ScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
          width: '100%',
        }}>
        <RegisterForm
          navigation={navigation}
          type={navigation.state.params.type || 1}
          {...{
            errorMessages,
            onFullNameChange,
            onEmailChange,
            onPhoneNumberChange,
            onPasswordChange,
            onConfirmPasswordChange,
            onSubmit,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
