import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {
  Heading,
  ButtonFluid,
  PasswordInput,
  TextInput,
  Icons,
} from '@component';
import {Screens, Texts} from '@constant';
import {Colors, Typography} from '@style';

const RegisterForm = ({navigations, ...props}) => {
  const rootStyleInput = {marginBottom: 10};
  return (
    <>
      <View
        style={{
          width: '100%',
          marginBottom: 20,
        }}>
        <Heading text=" Daftar Sebagai Customer" type="h2" />
      </View>
      <View
        style={{
          width: '100%',
        }}>
        <TextInput
          label="Nama Lengkap"
          icon={<Icons.UserFormIcon />}
          style={rootStyleInput}
        />
        <TextInput
          label="Email"
          icon={<Icons.MailOutlineFormIcon />}
          style={rootStyleInput}
        />
        <TextInput
          label="Nomor Handphone"
          icon={<Icons.PhoneFormIcon />}
          style={rootStyleInput}
        />
        <PasswordInput
          label="Kata Sandi"
          icon={<Icons.KeyFormIcon />}
          style={rootStyleInput}
        />
        <PasswordInput
          label="Ulangi Kata Sandi"
          icon={<Icons.KeyFormIcon />}
          style={rootStyleInput}
        />
        <View
          style={{
            width: '100%',
            marginTop: 10,
            marginBottom: 10,
          }}>
          <ButtonFluid text="Daftar" />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'nowrap',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: Typography.FONT_SIZE_H5,
              color: Colors.GREY,
              marginRight: 4,
            }}>
            {Texts.ASK_ALREADY_REGISTERED}
          </Text>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate(Screens.LOGIN_SCREEN);
            }}>
            <Heading type="h5" text={Texts.ASK_ALREADY_REGISTERED_ANSWER} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default RegisterForm;
