import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import Heading from '@component/heading';
import * as Icons from '@component/icons';
import ButtonFluid from '@component/button-fluid';
import {Colors, Mixins, Typography} from '@style';

export const SettingItem = (props) => {
  const {icon = null, text = null, onPress = null} = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          padding: 16,
          borderBottomWidth: 1,
          borderColor: Colors.BLACK10,
          flexDirection: 'row',
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            style={{
              ...Typography.FONT_SCREEN_DESCRIPTION,
              color: 'black',
              fontSize: 16,
              paddingRight: 10,
            }}>
            {text}
          </Text>
        </View>
        {icon}
      </View>
    </TouchableOpacity>
  );
};

const ProfileSetting = (props) => {
  const {
    onLogout = null,
    onChangePassword = null,
    onFAQ = null,
    onTNC = null,
  } = props;
  return (
    <View>
      <Heading
        type="h4"
        text="Pengaturan Profil"
        color={Colors.BLACK80}
        styleText={{
          fontFamily: 'sans-serif-normal',
          fontSize: 18,
        }}
      />
      <SettingItem
        text="Ubah Kata Sandi"
        icon={<Icons.CatIcon />}
        onPress={onChangePassword}
      />
      <SettingItem text="FAQ" icon={<Icons.CatIcon />} onPress={onFAQ} />
      <SettingItem
        text="Syarat dan Ketentuan"
        icon={<Icons.CatIcon />}
        onPress={onTNC}
      />
      <View style={{marginVertical: 10}} />
      <ButtonFluid
        text="Keluar"
        textColor={Colors.PRIMARY}
        backgroundColor={Colors.WHITE}
        onPress={onLogout}
        styleContainer={{borderColor: Colors.PRIMARY, borderWidth: 1}}
        styleText={{fontFamily: 'sans-serif-medium'}}
      />
    </View>
  );
};

export default ProfileSetting;
