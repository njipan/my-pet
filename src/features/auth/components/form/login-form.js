import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {Colors, Mixins, Typography} from './../../../../styles';
import {Texts, Screens} from '@constant';
import {
  TextInput,
  PasswordInput,
  Heading,
  ButtonFluid,
  Icons,
  BoxButton,
} from './../../../../components';

const CustomerIcon = () => {
  return (
    <Image
      style={{width: 64, height: 64}}
      source={require('./../../../../assets/icons/users/customer.png')}
    />
  );
};

const VeterinarianIcon = () => {
  return (
    <Image
      style={{width: 64, height: 64, marginLeft: 12}}
      source={require('./../../../../assets/icons/users/veterinarian.png')}
    />
  );
};

const LoginForm = ({navigation, ...props}) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'nowrap',
          marginBottom: 6,
        }}>
        <View style={{flex: 1, marginRight: 10}}>
          <BoxButton text="Customer" color={null} icon={<CustomerIcon />} />
        </View>
        <View style={{flex: 1, marginLeft: 10}}>
          <BoxButton
            text="Veterinarian"
            color={null}
            icon={<VeterinarianIcon />}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          ...Mixins.margin(0, 0, 20, 0),
        }}>
        <TextInput icon={<Icons.MailOutlineFormIcon />} label="Email" />
        <PasswordInput
          icon={<Icons.KeyFormIcon />}
          label="Kata Sandi"
          toggle={false}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate(Screens.FORGOT_PASSWORD_SCREEN)}>
          <View
            style={{
              ...Mixins.padding(10, 0),
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Heading text="Lupa Kata Sandi" type="h5" />
          </View>
        </TouchableOpacity>
        <View
          style={{
            ...Mixins.padding(20, 0),
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <ButtonFluid
            text="Masuk"
            onPress={() => navigation.navigate('Profile')}
          />
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
            {Texts.ASK_NOT_REGISTERED}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Heading type="h5" text={Texts.ASK_NOT_REGISTERED_ANSWER} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default LoginForm;
