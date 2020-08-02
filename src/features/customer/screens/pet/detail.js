import React from 'react';
import {ScrollView, RefreshControl, ToastAndroid} from 'react-native';
import {Colors, Typography} from '@style';
import {Screens} from '@constant';
import {RightMenu, Icons} from '@component';
import * as Modal from '@util/modal';
import {encodeFromBuffer} from '@util/file';
import {PetService} from '@service';

import PetDetail from './../../components/pet-detail';

const DetailScreen = ({navigation, ...props}) => {
  const id = navigation.state.params.id || null;

  const [pet, setPet] = React.useState({});
  const [medicalRecords, setMedicalRecords] = React.useState([]);
  const [picture, setPicture] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const getPicture = async (response, buffer) => {
    try {
      if (buffer) {
        const uri = await encodeFromBuffer(buffer);
        const source = {uri: `data:image/jpeg;base64,${uri}`};
        setPicture(source);
        navigation.setParams({
          data: response.pets,
          picture: source,
        });
      }
    } catch (err) {
      setPicture(null);
    }
    setLoading(false);
  };

  const getPet = async () => {
    setLoading(true);
    try {
      const response = await PetService.get(id);
      setPet(response.pets);
      setMedicalRecords(response.medical_records);
      getPicture(response, response.pictures.file.data || null);
      navigation.setParams({reloadPet: () => getPet()});
      navigation.setParams({
        data: response,
      });
    } catch (err) {}
    setLoading(false);
  };

  React.useEffect(() => {
    getPet();
    navigation.setParams({
      reload: navigation.getParam('reload'),
      reloadPet: getPet,
    });
  }, []);

  return (
    <ScrollView
      style={{backgroundColor: Colors.BLACK10}}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getPet} />
      }>
      <PetDetail
        data={{
          ...pet,
          picture: picture,
          pictureLoading: loading,
          medicalRecords,
        }}
      />
    </ScrollView>
  );
};

DetailScreen.navigationOptions = ({navigation}) => {
  const {routeName, key} = navigation.getParam('backTo');
  const reload = navigation.getParam('reload');
  const rightMenus = [
    {
      label: 'Ubah',
      onPress: (ref) => {
        navigation.navigate(Screens.EDIT_PET_CUSTOMER, {
          data: navigation.getParam('data'),
          picture: navigation.getParam('picture'),
          savedState: navigation.state,
          reloadPet: navigation.getParam('reloadPet', () => {}),
          reload: reload,
        });
        ref.hide();
      },
    },
    {
      label: 'Hapus Hewan Peliharaan',
      onPress: (ref) => {
        ref.hide();
        Modal.confirm({
          description: 'Apakah kamu yakin ingin menghapus hewan peliharaan?',
          textConfirm: 'Ya',
          textCancel: 'Tidak',
          reverse: true,
          onCallback: (result) => {
            if (!result) return;
            Modal.confirm({
              isLoading: true,
              onLoad: async (navModal) => {
                try {
                  const {id} = navigation.getParam('data');
                  await PetService.remove(id);
                  ToastAndroid.show(
                    'Peliharaan berhasil dihapus',
                    ToastAndroid.LONG,
                  );
                  navModal.navigate({
                    routeName,
                    key,
                  });
                  await navigation.getParam('reload', () => {})();
                  await navigation.getParam('reloadPet', () => {})();
                } catch (err) {
                  ToastAndroid.show('Terjadi Kesalahan', ToastAndroid.LONG);
                }
              },
            });
          },
        });
      },
    },
  ];

  return {
    title: 'Hewan Peliharaan',
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

export default DetailScreen;
