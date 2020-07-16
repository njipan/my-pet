import React from 'react';
import {ScrollView, ToastAndroid} from 'react-native';
import {Typography} from '@style';
import {useSchema} from '@shared/hooks';
import {validate, isObjectValuesNull} from '@util/validate';
import * as Modal from '@util/modal';
import {CustomerService} from '@service';

import ChangePasswordForm from './../components/change-password-form';
import {ChangePasswordSchema} from './../schemas';

const ChangePasswordScreen = ({navigation, ...props}) => {
  const {data, messages, setMessages, setFormAndValidate} = useSchema(
    {},
    {},
    ChangePasswordSchema,
  );

  const onSave = async (navigation) => {
    try {
      const body = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };
      const response = await CustomerService.updatePassword(body);
      ToastAndroid.show('Perubahan berhasil disimpan!', ToastAndroid.LONG);
    } catch (err) {
      ToastAndroid.show('Kata Sandi tidak sesuai!', ToastAndroid.LONG);
    }
    navigation.goBack(null);
  };

  const onSubmit = async () => {
    try {
      const errs = await validate(data, ChangePasswordSchema);
      setMessages(errs);
      if (!isObjectValuesNull(errs)) return;
      if (data.confirmNewPassword != data.newPassword) {
        setMessages({
          ...messages,
          confirmNewPassword: 'Tidak sama dengan Kata Sandi Baru!',
        });
        return;
      }

      Modal.confirm({isLoading: true, onLoad: onSave});
    } catch (err) {
      ToastAndroid.show('Terjadi Kesalahan!');
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ChangePasswordForm
        {...{
          data,
          messages,
          onFormValueChange: setFormAndValidate,
          onSubmit,
        }}
      />
    </ScrollView>
  );
};

ChangePasswordScreen.navigationOptions = {
  title: 'Ubah Kata Sandi',
  headerTitleStyle: Typography.FONT_HEADER_TITLE,
};

export default ChangePasswordScreen;
