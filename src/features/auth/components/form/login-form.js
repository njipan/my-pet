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
      style={{width: 48, height: 48, marginTop: 6}}
      source={require('./../../../../assets/icons/users/customer.png')}
    />
  );
};

const VeterinarianIcon = () => {
  return (
    <Image
      style={{
        width: 36,
        height: 36,
        marginLeft: 12,
        marginTop: 6,
        marginBottom: 12,
      }}
      source={require('./../../../../assets/icons/users/veterinarian.png')}
    />
  );
};

const LoginForm = ({
  navigation,
  onTypePress = (type) => {},
  onEmailChange = (text) => {},
  onPasswordChange = (text) => {},
  onSubmit = () => {},
  onRegister = () => {},
  errorMessages = {},
  type = 0,
  ...props
}) => {
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
          <BoxButton
            text="Customer"
            color={null}
            icon={<CustomerIcon />}
            focus={type == 1}
            onPress={() => {
              onTypePress(1);
            }}
          />
        </View>
        <View style={{flex: 1, marginLeft: 10}}>
          <BoxButton
            text="Veterinarian"
            color={null}
            icon={<VeterinarianIcon />}
            focus={type == 2}
            onPress={() => {
              onTypePress(2);
            }}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          ...Mixins.margin(0, 0, 20, 0),
        }}>
        <TextInput
          icon={<Icons.MailOutlineFormIcon />}
          label="Email"
          onChangeText={onEmailChange}
          error={errorMessages.email || false}
        />
        <PasswordInput
          icon={<Icons.KeyFormIcon />}
          label="Kata Sandi"
          toggle={false}
          onChangeText={onPasswordChange}
          error={errorMessages.password || false}
        />

        <View
          style={{
            ...Mixins.padding(20, 0),
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <ButtonFluid
            styleRoot={{width: '100%'}}
            text="Masuk"
            onPress={() => onSubmit()}
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
          <TouchableOpacity onPress={onRegister}>
            <Heading type="h5" text={Texts.ASK_NOT_REGISTERED_ANSWER} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default LoginForm;
