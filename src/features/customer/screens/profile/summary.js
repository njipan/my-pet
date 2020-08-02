import React from 'react';
import moment from 'moment';
import {
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  View,
  ToastAndroid,
} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';
import {Sex, Screens, Navigators} from '@constant';
import {Colors, Mixins} from '@style';
import {Heading, ProfileSetting} from '@component';
import ProfileInfo from './../../components/profile-info';
import PetItemCard from './../../components/pet-item-card';
import {AddPetCard} from './../../components/home-pet';
import {AuthService, CustomerService, PetService} from '@service';
import * as Modal from '@util/modal';
import {encodeFromBuffer} from '@util/file';

const MyPet = ({
  navigation,
  pets = [],
  onAddPet = () => {},
  onEditPetPress = () => {},
}) => {
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
          {pets &&
            pets.map((pet) => (
              <PetItemCard
                data={pet}
                key={pet.id}
                navigation={navigation}
                onEditPress={onEditPetPress}
              />
            ))}
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
  const [pets, setPets] = React.useState([]);
  const [picture, setPicture] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(true);

  const getMe = async () => {
    try {
      const response = await CustomerService.getMe();
      console.log(response);
      setMe(response.data.data.user);
      const bufferPicture = response.data.data.pictures.file?.data || null;
      if (!bufferPicture) return;
      const uri = await encodeFromBuffer(bufferPicture);
      setPicture({...picture, uri: `data:image/jpeg;base64,${uri}`});
    } catch (err) {
      ToastAndroid.show('Oopss, Terjadi Kesalahan', ToastAndroid.LONG);
    }
  };

  const getPets = async () => {
    try {
      const response = await PetService.all();
      console.log(response);
      setPets(response);
    } catch (err) {}
  };

  const load = async () => {
    setRefreshing(true);
    await getMe();
    await getPets();
    setRefreshing(false);
  };

  React.useEffect(() => {
    load();
  }, []);

  const onLogout = () => {
    Modal.confirm({
      description: 'Apakah kamu yakin ingin keluar dari MyPet?',
      textConfirm: 'Ya',
      textCancel: 'Tidak',
      reverse: true,
      onCallback: (result, hide) => {
        hide();
        if (!result) return;

        Modal.confirm({
          isLoading: true,
          onLoad: async () => {
            try {
              await AuthService.logout();
            } catch (err) {}
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
          },
        });
      },
    });
    return;
  };
  const onTNC = () => {};
  const onFAQ = () => {};
  const onChangePassword = () =>
    navigation.navigate(Screens.CHANGE_PASSWORD_SCREEN);
  return (
    <View>
      <ScrollView
        style={{backgroundColor: Colors.BLACK10}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => load()} />
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
                me: {
                  ...me,
                  birth_date: moment(me.birth_date, 'DD-MM-YYYY').format(
                    'MMMM DD, YYYY',
                  ),
                  sex: Sex.translateHuman(me.sex),
                },
                picture,
              })
            }
            {...{title: me.full_name, text: 'Lihat Profil', picture}}
          />
        </View>
        <MyPet
          onAddPet={() =>
            navigation.navigate(Screens.ADD_PET_CUSTOMER, {reload: getPets})
          }
          onEditPetPress={(pet, picture) => {
            navigation.navigate(Screens.EDIT_PET_CUSTOMER, {
              data: pet,
              picture,
              reload: getPets,
              savedState: navigation.state,
            });
          }}
          pets={pets}
          navigation={navigation}
        />
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
