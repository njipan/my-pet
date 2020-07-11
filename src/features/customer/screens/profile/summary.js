import React from 'react';
import {
  TouchableWithoutFeedback,
  ScrollView,
  View,
  Text,
  Button,
} from 'react-native';
import {Screens} from '@constant';
import {Colors, Mixins} from '@style';
import {Heading, ProfileSetting} from '@component';
import ProfileInfo from './../../components/profile-info';
import PetItemCard from './../../components/pet-item-card';
import {AddPetCard} from './../../components/home-pet';
import {AuthService} from '@service';
import * as Modal from '@util/modal';

const MyPet = () => {
  return (
    <View style={{padding: 16, backgroundColor: Colors.WHITE}}>
      <Heading
        type="h4"
        text="Hewan Peliharaan Saya"
        color={Colors.BLACK87}
        styleText={{
          fontFamily: 'sans-serif-normal',
          fontSize: 18,
        }}
      />
      <View style={{marginVertical: 8}} />
      <View>
        <PetItemCard data={{}} />
        <TouchableWithoutFeedback onPress={() => {}}>
          <AddPetCard
            styleRoot={{
              width: 'auto',
              height: 'auto',
              marginHorizontal: -12,
              marginTop: 8,
            }}
            styleContainer={{
              height: 'auto',
              flexDirection: 'row',
              padding: 10,
            }}
            styleText={{fontSize: 16, marginRight: 10, marginTop: 5}}
            text="Tambah Hewan Peliharaan"
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const ProfileSummaryScreen = ({navigation}) => {
  const onLogout = () => {
    Modal.confirm({isLoading: true});
    AuthService.logout()
      .then(() => {})
      .catch(() => {})
      .finally(() => navigation.navigate(Screens.LOGIN_SCREEN));
  };
  const onTNC = () => {};
  const onFAQ = () => {};
  const onChangePassword = () => {};
  return (
    <View>
      <ScrollView style={{backgroundColor: Colors.BLACK10}}>
        <View
          style={{
            ...Mixins.padding(14, 16),
            elevation: 3,
            backgroundColor: 'white',
            ...Mixins.margin(-2, -2, 4, -2),
          }}>
          <ProfileInfo onTextPress={() => {}} />
        </View>
        <MyPet />
        <View style={{marginVertical: 5}} />
        <View style={{backgroundColor: Colors.WHITE, padding: 16}}>
          <ProfileSetting {...{onLogout, onTNC, onFAQ, onChangePassword}} />
        </View>
      </ScrollView>
    </View>
  );
};

ProfileSummaryScreen.navigationOptions = {
  header: null,
};

export default ProfileSummaryScreen;
