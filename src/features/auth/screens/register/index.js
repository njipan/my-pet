import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Heading,
  ButtonFluid,
  PasswordInput,
  TextInput,
  Icons,
} from '@component';
import {Screens, Texts} from '@constant';
import {Colors, Mixins, Typography} from '@style';
import RegisterForm from './../../components/form/register-form';

const RegisterScreen = ({navigation}) => {
  return (
    <ScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
          width: '100%',
        }}>
        <RegisterForm navigation={navigation} />
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
