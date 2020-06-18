import React, {useState, useEffect} from 'react';
import {StyleSheet, Image, View, Text, Button} from 'react-native';
import {Colors, Mixins, Typography} from './../../../../styles';
import {Texts} from './../../../../constants';
import {
  Heading,
  ButtonFluid,
  TextInput,
  PasswordInput,
} from './../../../../components';
import {ScrollView} from 'react-native-gesture-handler';
import LoginForm from './../../components/form/login-form';

const SignInIcon = () => {
  return (
    <Image
      style={{width: 220, height: 220}}
      source={require('./../../../../assets/images/illustrations/sign-in.png')}
    />
  );
};

const LoginScreen = ({navigation, ...props}) => {
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
          <Heading text="Halo!" type="h3" margin={Mixins.margin(8, 0)} />
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
          <LoginForm navigation={navigation} />
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
