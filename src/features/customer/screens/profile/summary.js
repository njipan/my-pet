import React from 'react';
import {
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  View,
  ToastAndroid,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {Screens, Navigators} from '@constant';
import {Colors, Mixins} from '@style';
import {Heading, ProfileSetting} from '@component';
import ProfileInfo from './../../components/profile-info';
import PetItemCard from './../../components/pet-item-card';
import {AddPetCard} from './../../components/home-pet';
import {AuthService, CustomerService} from '@service';
import * as Modal from '@util/modal';
import {encodeFromBuffer} from '@util/file';

const MyPet = ({pets = [], onAddPet = () => {}}) => {
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
        <View>
          {pets && pets.map((pet) => <PetItemCard data={pet} key={pet.id} />)}
        </View>
        <TouchableOpacity onPress={onAddPet}>
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
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ProfileSummaryScreen = ({navigation}) => {
  const [me, setMe] = React.useState({});
  const [picture, setPicture] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(true);

  const getMe = async () => {
    setRefreshing(true);
    try {
      const response = await CustomerService.getMe();
      setMe(response.data.data.user);
      const bufferPicture = response.data.data.pictures.file?.data || null;
      if (!bufferPicture) return;
      const uri = await encodeFromBuffer(bufferPicture);
      setPicture({...picture, uri: `data:image/jpeg;base64,${uri}`});
    } catch (err) {
      console.log(err);
      ToastAndroid.show('Oopss, Terjadi Kesalahan', ToastAndroid.LONG);
    }
    setRefreshing(false);
  };

  React.useEffect(() => {
    getMe();
  }, []);

  const onLogout = () => {
    Modal.confirm({isLoading: true});
    AuthService.logout()
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        navigation.dispatch(
          StackActions.reset({
            index: 0,
            key: null,
            actions: [
              NavigationActions.navigate({
                routeName: Navigators.AUTH_NAVIGATOR,
              }),
            ],
          }),
        );
      });
  };
  const onTNC = () => {};
  const onFAQ = () => {};
  const onChangePassword = () => {};
  return (
    <View>
      <ScrollView
        style={{backgroundColor: Colors.BLACK10}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => getMe()} />
        }>
        <View
          style={{
            ...Mixins.padding(14, 16),
            elevation: 3,
            backgroundColor: 'white',
            ...Mixins.margin(-2, -2, 4, -2),
          }}>
          <ProfileInfo
            onTextPress={() =>
              navigation.navigate(Screens.PROFILE_DETAIL_CUSTOMER, {
                me,
                picture,
              })
            }
            {...{title: me.full_name, text: 'Lihat Profil', picture}}
          />
        </View>
        <MyPet onAddPet={() => navigation.navigate(Screens.ADD_PET_CUSTOMER)} />
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
