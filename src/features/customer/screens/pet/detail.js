import React from 'react';
import {ScrollView, ToastAndroid} from 'react-native';
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

  React.useEffect(() => {
    PetService.get(id)
      .then((response) => {
        setPet(response.pets);
        getPicture(response, response.pictures.file.data || null);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  return (
    <ScrollView style={{backgroundColor: Colors.BLACK10}}>
      <PetDetail data={{...pet, picture: picture, pictureLoading: loading}} />
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
                    params: {otherParam: 123},
                  });
                  reload();
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
        items={
          navigation.getParam('data', null) &&
          navigation.getParam('picture', null)
            ? rightMenus
            : []
        }
      />
    ),
  };
};

export default DetailScreen;
