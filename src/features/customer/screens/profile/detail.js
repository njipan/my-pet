import React from 'react';
import moment from 'moment';
import {ScrollView, View, Text, Image} from 'react-native';

import {Mixins, Colors, Typography} from '@style';
import {Screens} from '@constant';
import {RightMenu, Icons, Heading} from '@component';

import ProfileInfo from './../../components/profile-info';

const PersonalInfoItem = ({label = '', text = ''}) => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: Colors.BLACK10,
        paddingVertical: 10,
      }}>
      <Text style={{fontSize: 12, color: Colors.LIGHT_GREY, marginBottom: 2}}>
        {label}
      </Text>
      <Text style={{fontSize: 16}}>{text}</Text>
    </View>
  );
};

const ProfileDetailScreen = ({navigation, ...props}) => {
  const {me, picture} = navigation.state.params;

  return (
    <ScrollView>
      <View
        style={{
          ...Mixins.padding(14, 16),
          backgroundColor: 'white',
        }}>
        <ProfileInfo {...{title: me.full_name, text: 'Customer', picture}} />
      </View>

      <View style={{padding: 16}}>
        <Text
          style={{
            ...Typography.heading('h3'),
            fontFamily: 'sans-serif-normal',
            marginBottom: 2,
          }}>
          Personal Info
        </Text>
        <PersonalInfoItem label="Email" text={me.email} />
        <PersonalInfoItem label="Nomor Telepon" text={me.phone} />
        <PersonalInfoItem
          label="Tanggal Lahir"
          text={me.birth_date == 'Invalid date' ? '' : me.birth_date}
        />
        <PersonalInfoItem label="Tempat Lahir" text={me.birth_place} />
        <PersonalInfoItem label="Jenis Kelamin" text={me.sex} />
      </View>
    </ScrollView>
  );
};

ProfileDetailScreen.navigationOptions = ({navigation}) => {
  const rightMenus = [
    {
      label: 'Ubah',
      onPress: (ref) => {
        navigation.navigate(Screens.PROFILE_EDIT_CUSTOMER);
        ref.hide();
      },
    },
  ];

  return {
    title: 'Detail Profil',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
    headerRight: (
      <RightMenu
        icon={<Icons.MoreVertIcon size="small" />}
        navigation={navigation}
        items={rightMenus}
      />
    ),
  };
};

export default ProfileDetailScreen;
