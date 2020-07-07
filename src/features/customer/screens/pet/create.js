import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PetForm from './../../components/pet-form';
import * as Modal from '@util/modal';
import GlobalNavigation from '@util/navigation';

const CreateScreen = ({navigation, ...props}) => {
  const onSave = (res, hide, navigation) => {
    navigation.goBack();
    if (res == true) {
      Modal.confirm({isLoading: true, onCallback: (res, hide) => hide()});
      setTimeout(() => {
        navigation.goBack(null);
      }, 500);
    }
  };

  const onSubmit = () => {
    Modal.confirm({
      title: 'Konfirmasi',
      description: 'Apakah anda yakin ingin menambahkan hewan peliharaan?',
      textConfirm: 'Ya, Tambahkan',
      textCancel: 'Tidak',
      onCallback: onSave,
    });
  };
  return (
    <View style={styles.container}>
      <PetForm onSubmit={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CreateScreen;
