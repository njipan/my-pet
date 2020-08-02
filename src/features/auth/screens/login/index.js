import React, {useState, useEffect} from 'react';
import {NavigationActions, StackActions} from 'react-navigation';
import {
  StatusBar,
  StyleSheet,
  Image,
  View,
  Text,
  ToastAndroid,
} from 'react-native';
import {Colors, Mixins, Typography} from './../../../../styles';
import {Texts} from './../../../../constants';
import {Heading} from './../../../../components';
import {ScrollView} from 'react-native-gesture-handler';
import LoginForm from './../../components/form/login-form';
import {AuthService} from '@service';
import {validate, singleValidate, isObjectValuesNull} from '@util/validate';
import {Screens, Navigators} from '@constant';
import {LoginSchema} from './../../schemas';
import * as Modal from '@util/modal';

import {LocalNotification} from '@util/notification/local';

const SignInIcon = () => {
  return (
    <Image
      style={{width: 220, height: 220}}
      source={require('./../../../../assets/images/illustrations/sign-in.png')}
    />
  );
};

const initSignInData = {
  type: null,
  email: null,
  password: null,
};

const LoginScreen = ({navigation, ...props}) => {
  const [data, setData] = useState(initSignInData);
  const [errorMessages, setErrorMessages] = useState({});
  const onTypePress = (type = 0) => {
    setData({...data, type});
  };
  const onEmailChange = (value) => {
    setErrorMessages({
      ...errorMessages,
      email: singleValidate(value, LoginSchema.email),
    });
    setData({...data, email: value});
  };

  const onPasswordChange = (value) => {
    setErrorMessages({
      ...errorMessages,
      password: singleValidate(value, LoginSchema.password),
    });
    setData({...data, password: value});
  };
  const onRegister = () => {
    if (data.type !== 1 && data.type !== 2) {
      ToastAndroid.show('Tipe harus dipilih!', ToastAndroid.LONG);
      return;
    }
    navigation.navigate(Screens.REGISTER_SCREEN, {type: data.type});
  };

  const doLogin = async (navigation) => {
    try {
      const fcmToken = await AuthService.getFcmToken();
      const response = await AuthService.login({...data, token: fcmToken});
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
    } catch (err) {
      console.log(err);
      ToastAndroid.show(
        'Gagal, periksa kembali email dan password!',
        ToastAndroid.LONG,
      );
    }
    navigation.goBack();
  };

  const onSubmit = async () => {
    if (data.type !== 1 && data.type !== 2) {
      ToastAndroid.show('Tipe harus dipilih!', ToastAndroid.LONG);
      return;
    }
    try {
      const errs = await validate(data, LoginSchema);
      setErrorMessages({...errs});
      if (!isObjectValuesNull(errs)) return;
    } catch (err) {}
    Modal.confirm({isLoading: true, onLoad: doLogin});
  };

  return (
    <View style={{...styles.container, width: '100%'}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView
        style={{
          width: '100%',
          ...Mixins.padding(0, 20),
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 20,
          }}>
          <SignInIcon />
          <Heading text={'Halo!'} type="h3" margin={Mixins.margin(8, 0)} />
          <Text
            style={{
              fontSize: Typography.FONT_SIZE_16,
              textAlign: 'center',
              width: '80%',
              color: Colors.DARK_GREY,
              marginBottom: 20,
            }}>
            {Texts.AUTH_DESCRIPTION}
          </Text>
        </View>
        <View
          style={{
            ...Mixins.padding(10, 0, 20, 0),
          }}>
          <LoginForm
            navigation={navigation}
            onTypePress={onTypePress}
            onEmailChange={onEmailChange}
            onPasswordChange={onPasswordChange}
            onSubmit={onSubmit}
            errorMessages={errorMessages}
            type={data.type || 0}
            onRegister={onRegister}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outer: {
    width: '100%',
    borderRadius: 6,
    ...Mixins.margin(5, 0),
  },
});

export default LoginScreen;
