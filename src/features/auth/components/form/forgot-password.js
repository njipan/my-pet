import React from 'react';
import {View} from 'react-native';
import {ButtonFluid, TextInput, Icons} from '@component';

const ForgotPasswordForm = ({
  errors = {},
  defaultForm = {},
  onEmailChange = () => {},
  onSubmit = () => {},
}) => {
  return (
    <View
      style={{
        width: '100%',
      }}>
      <TextInput
        icon={<Icons.MailOutlineFormIcon />}
        label="Email"
        value={defaultForm.email || null}
        error={errors.email || false}
        placeholder="Your email"
        onChangeText={(text) => onEmailChange(text)}
      />
      <View
        style={{
          marginTop: 20,
        }}>
        <ButtonFluid onPress={onSubmit} text="Atur Ulang Kata Sandi" />
      </View>
    </View>
  );
};

export default ForgotPasswordForm;
