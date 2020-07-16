import React from 'react';
import {View, Text} from 'react-native';

import {ButtonFluid} from '@component';
import {Colors, Typography} from '@style';

const ChangePasswordScreen = () => {
  return (
    <View>
      <Text>Change Password</Text>
    </View>
  );
};

ChangePasswordScreen.navigationOptions = {
  title: 'Ubah Kata Sandi',
};

export default ChangePasswordScreen;
