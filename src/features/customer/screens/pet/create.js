import React from 'react';
import {ToastAndroid, View, StyleSheet} from 'react-native';
import PetForm from './../../components/pet-form';
import * as Modal from '@util/modal';
import ImagePicker from 'react-native-image-picker';
import {PetSchema} from './../../schemas';
import {validate, singleValidate} from '@util/validate';
import moment from 'moment';

const initData = {
  name: null,
  type: null,
  breed: null,
  sex: null,
  weight: null,
  pictureId: null,
  dateOfBirth: null,
  bodyColor: null,
  eyeColor: null,
  microchipId: null,
  picture: null,
};

const CreateScreen = ({navigation, ...props}) => {
  const [step, setStep] = React.useState(2);
  const [data, setData] = React.useState(initData);
  const [errorMessages, setErrorMessages] = React.useState({...initData});

  const onSave = (res, hide, navigation) => {
    navigation.goBack();
    if (res == true) {
      Modal.confirm({isLoading: true, onCallback: (res, hide) => hide()});
      setTimeout(() => {
        navigation.goBack(null);
      }, 500);
    }
  };

  const onNext = () => {
    validate(data, PetSchema).then((result) => {
      setErrorMessages(result);
      if (Object.values(result).find((item) => item != null)) return;
      if (data.type != 1 && data.type != 2) {
        ToastAndroid.show(
          'Jenis peliharaan harus dipilih!',
          ToastAndroid.SHORT,
        );
        return;
      }
      setStep(step + 1);
    });
  };

  const onTypeChange = (value) => {
    setData({...data, type: value});
  };

  const onNameChange = (value) => {
    setErrorMessages({
      ...errorMessages,
      name: singleValidate(value, PetSchema.name),
    });
    setData({...data, name: value});
  };

  const onBreedChange = (value) => {
    setData({...data, breed: value});
  };

  const onSexChange = (value) => {
    setErrorMessages({
      ...errorMessages,
      sex: singleValidate(value, PetSchema.sex),
    });
    setData({...data, sex: value});
  };

  const onWeightChange = (value) => {
    setData({...data, weight: value});
  };

  const onPictureChange = () => {
    const options = {
      title: 'Pilih Foto',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        setData({...data, picture: source});
      }
    });
  };

  const onDateOfBirthChange = (value) => {
    let message = 'Tanggal lahir tidak boleh kosong';
    if (!value) {
      setData({...data, dateOfBirth: null});
    } else {
      setData({...data, dateOfBirth: moment(value).format('DD-MM-YYYY')});
      message = null;
    }
    setErrorMessages({
      ...data,
      dateOfBirth: message,
    });
  };

  const onAgeChange = (value) => {
    setErrorMessages({
      ...errorMessages,
      age: singleValidate(value, PetSchema.sex),
    });
    setData({...data, age: value});
  };

  const onPrevious = () => {
    setStep(step - 1);
  };

  const onSubmit = () => {
    console.log(data);
    // Modal.confirm({
    //   title: 'Konfirmasi',
    //   description: 'Apakah anda yakin ingin menambahkan hewan peliharaan?',
    //   textConfirm: 'Ya, Tambahkan',
    //   textCancel: 'Tidak',
    //   onCallback: onSave,
    // });
  };
  return (
    <View style={styles.container}>
      <PetForm
        {...{
          step,
          errorMessages,
          onNext,
          onPrevious,
          onSubmit,
          onTypeChange,
          onNameChange,
          onBreedChange,
          onSexChange,
          onWeightChange,
          onPictureChange,
          onDateOfBirthChange,
          onAgeChange,
        }}
        {...data}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CreateScreen;
