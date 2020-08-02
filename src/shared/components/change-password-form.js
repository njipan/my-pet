import React from 'react';
import {View} from 'react-native';

import {ButtonFluid, Icons, PasswordInput} from '@component';

const ChangePasswordForm = ({navigation, ...props}) => {
  const {
    data = {},
    messages = {},
    onSubmit = () => {},
    onFormValueChange = () => {},
  } = props;
  return (
    <View style={{padding: 20}}>
      <PasswordInput
        value={data.oldPassword}
        icon={<Icons.KeyFormIcon />}
        label="Kata Sandi Lama"
        toggle={true}
        onChangeText={(value) => onFormValueChange('oldPassword', value)}
        error={messages.oldPassword || false}
      />
      <PasswordInput
        value={data.newPassword}
        icon={<Icons.KeyFormIcon />}
        label="Kata Sandi Baru"
        toggle={true}
        onChangeText={(value) => onFormValueChange('newPassword', value)}
        error={messages.newPassword || false}
      />
      <PasswordInput
        value={data.confirmNewPassword}
        icon={<Icons.KeyFormIcon />}
        label="Ulangi Kata Sandi Baru"
        toggle={true}
        onChangeText={(value) => onFormValueChange('confirmNewPassword', value)}
        error={messages.confirmNewPassword || false}
      />
      <View style={{marginVertical: 20}}>
        <ButtonFluid
          styleRoot={{width: '100%'}}
          text="Ubah Kata Sandi"
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};

export default ChangePasswordForm;
