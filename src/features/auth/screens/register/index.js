import React, {useState} from 'react';
import {StackActions, NavigationActions} from 'react-navigation';
import {StatusBar, View, ToastAndroid, Text} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import {Screens, Navigators} from '@constant';
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

  const onSave = async (navigation) => {
    try {
      const fcmToken = await AuthService.getFcmToken();
      const response = await AuthService.register({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        type: data.type,
        token: fcmToken,
      });
      console.log(response);
      await AuthService.setToken(response.data.data.token);
      await AuthService.setType(`${data.type}`);
      await AuthService.setUser(response.data.data);
      let navigationName = Navigators.CUSTOMER_NAVIGATOR;
      if (data.type == 2) navigationName = Navigators.MERCHANT_NAVIGATOR;
      await AuthService.check(response.data.data.token, data.type);
      navigation.dispatch(
        StackActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({routeName: navigationName})],
        }),
      );
      ToastAndroid.show('Daftar berhasil!', ToastAndroid.LONG);
    } catch (err) {
      console.log(err);
      let message = 'Oops..\nLengkapi form yang tersedia';
      if (err.response.status == 422) message = 'Pengguna telah terdaftar!';
      ToastAndroid.show(message, ToastAndroid.LONG);
    }
    navigation.goBack();
  };

  const onSubmit = async () => {
    try {
      const messages = await validate(data, RegisterSchema);
      setErrorMessages({...messages});
      if (!isObjectValuesNull(messages)) {
        ToastAndroid.show(
          'Oops..\nLengkapi form yang tersedia',
          ToastAndroid.LONG,
        );
        return;
      }

      Modal.confirm({isLoading: true, onLoad: onSave});
    } catch (err) {}
  };

  return (
    <ScrollView>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
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
