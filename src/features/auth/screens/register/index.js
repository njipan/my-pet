import React, {useState} from 'react';
import {View, ToastAndroid, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Screens} from '@constant';
import RegisterForm from './../../components/form/register-form';
import {AuthService} from '@service';
import {validate, isObjectValuesNull, singleValidate} from '@util/validate';
import {RegisterSchema} from './../../schemas';
import * as Modal from '@util/modal';

const initState = {
  fullName: null,
  email: null,
  phone: null,
  password: null,
  confirmPassword: null,
  type: null,
};

const RegisterScreen = ({navigation}) => {
  const {type} = navigation.state.params;
  const [data, setData] = useState({...initState, type});
  const [errorMessages, setErrorMessages] = useState({...initState});

  const onFullNameChange = (value) => {
    setErrorMessages({
      ...errorMessages,
      fullName: singleValidate(value, RegisterSchema.fullName),
    });
    setData({...data, fullName: value});
  };
  const onEmailChange = (value) => {
    setErrorMessages({
      ...errorMessages,
      email: singleValidate(value, RegisterSchema.email),
    });
    setData({...data, email: value});
  };
  const onPhoneNumberChange = (value) => {
    setErrorMessages({
      ...errorMessages,
      phone: singleValidate(value, RegisterSchema.phone),
    });
    setData({...data, phone: value});
  };
  const onPasswordChange = (value) => {
    setErrorMessages({
      ...errorMessages,
      password: singleValidate(value, RegisterSchema.password),
    });
    setData({...data, password: value});
  };
  const onConfirmPasswordChange = (value) => {
    setData({...data, confirmPassword: value});
    let message = '';
    if (value !== data.password) message = 'Kata sandi tidak sama!';
    setErrorMessages({
      ...errorMessages,
      confirmPassword: message,
    });
  };

  const onSubmit = async () => {
    if (isObjectValuesNull({...data})) {
      ToastAndroid.show(
        'Oops..\nLengkapi form yang tersedia',
        ToastAndroid.LONG,
      );
      return;
    }

    try {
      Modal.confirm({isLoading: true});
      const response = await AuthService.register({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        type: data.type,
      });
      ToastAndroid.show('Daftar berhasil!', ToastAndroid.LONG);
      navigation.navigate(Screens.LOGIN_SCREEN);
    } catch (err) {
      console.log(err.response.data);
      navigation.goBack(null);
      let message = 'Oops..\nLengkapi form yang tersedia';
      if (err.response.status == 422) message = 'Pengguna telah terdaftar!';
      ToastAndroid.show(message, ToastAndroid.LONG);
    }
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
