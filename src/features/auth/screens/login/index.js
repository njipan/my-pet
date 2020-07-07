import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, View, Text, ToastAndroid} from 'react-native';
import {Colors, Mixins, Typography} from './../../../../styles';
import {Texts} from './../../../../constants';
import {Heading} from './../../../../components';
import {ScrollView} from 'react-native-gesture-handler';
import LoginForm from './../../components/form/login-form';
import {AuthService} from '@service';
import validate, {validator} from '@util/validate';
import {Screens} from '@constant';

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
  const onEmailChange = async (text) => {
    try {
      setData({...data, email: text});
      const message = await validate(text, [
        [validator.isEmpty, 'Email harus diisi!', true],
        [validator.isEmail, 'Email tidak valid!'],
      ]);
      setErrorMessages({...errorMessages, email: message || ''});
    } catch (e) {}
  };
  const onPasswordChange = async (text) => {
    setData({...data, password: text});
    const message = await validate(text, [
      [validator.isEmpty, 'Password harus diisi!', true],
      [(text) => text.length >= 6, 'Minimum 6 karakter!'],
    ]);
    setErrorMessages({...errorMessages, password: message || ''});
  };
  const onRegister = () => {
    if (data.type !== 1 && data.type !== 2) {
      ToastAndroid.show('Tipe harus dipilih!', ToastAndroid.LONG);
      return;
    }
    navigation.navigate(Screens.REGISTER_SCREEN, {type: data.type});
  };
  const onSubmit = () => {
    if (data.type !== 1 && data.type !== 2) {
      ToastAndroid.show('Tipe harus dipilih!', ToastAndroid.LONG);
      return null;
    }

    AuthService.login(data)
      .then(async (response) => {
        ToastAndroid.show('Berhasil!', ToastAndroid.LONG);
        await AuthService.setToken(response.data.data.token || '');
        if (data.type == 2) navigation.navigate(Screens.ORDER_MERCHANT);
        else {
          navigation.navigate(Screens.HOME_CUSTOMER);
        }
      })
      .catch((error) => {
        ToastAndroid.show(
          'Gagal, periksa kembali email dan password!',
          ToastAndroid.LONG,
        );
      });
  };

  return (
    <View style={{...styles.container, width: '100%'}}>
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