import React from 'react';
import {ToastAndroid, View, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import moment from 'moment';

import PetForm from './../../components/pet-form';
import {PetSchema} from './../../schemas';

import * as Modal from '@util/modal';
import {validate, singleValidate} from '@util/validate';
import {PetService, PictureService} from '@service';
import {Screens} from '@constant';

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
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState(initData);
  const [errorMessages, setErrorMessages] = React.useState({...initData});
  const [isUploading, setUploading] = React.useState(false);

  const onNext = () => {
    validate(data, PetSchema).then((result) => {
      setErrorMessages(result);
      const errorsFirstPage = {
        type: result.type,
        name: result.name,
        breed: result.breed,
        sex: result.sex,
        weight: result.weight,
      };

      if (Object.values(errorsFirstPage).find((item) => item != null)) return;
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
        setUploading(true);
        PictureService.upload(response)
          .then((res) => {
            setData({
              ...data,
              picture: {uri: response.uri},
              pictureId: res.data.data.id,
            });
          })
          .catch((e) => {
            setData({...data, pictureId: null});
            ToastAndroid.show('Gagal upload foto', ToastAndroid.LONG);
            console.log(e.response.data);
          })
          .finally(() => setUploading(false));
      }
    });
  };

  const onDateOfBirthChange = (value) => {
    let message = 'Tanggal lahir tidak boleh kosong!';
    if (!value) {
      setData({...data, dateOfBirth: null});
    } else {
      const date = moment(new Date(value));
      const dateString = date.format('DD-MM-YYYY');
      message = singleValidate(dateString, PetSchema.dateOfBirth);
      if (message == null) {
        setData({
          ...data,
          dateOfBirth: dateString,
          age: date
            .locale('id')
            .fromNow()
            .replace('ago', '')
            .replace('a ', '')
            .replace('in ', ''),
        });
      }
    }
    setErrorMessages({
      ...errorMessages,
      dateOfBirth: message,
    });
  };

  const onBodyColorChange = (value) => {
    setErrorMessages({
      ...errorMessages,
      bodyColor: singleValidate(value, PetSchema.bodyColor),
    });
    setData({...data, bodyColor: value});
  };

  const onEyeColorChange = (value) => {
    setErrorMessages({
      ...errorMessages,
      eyeColor: singleValidate(value, PetSchema.eyeColor),
    });
    setData({...data, eyeColor: value});
  };

  const onMicroschipIdChange = (value) => {
    setErrorMessages({
      ...errorMessages,
      microschipId: singleValidate(value, PetSchema.microschipId),
    });
    setData({...data, microschipId: value});
  };

  const onPrevious = () => {
    setStep(step - 1);
  };

  const onSave = (res, hide) => {
    navigation.goBack(null);
    if (res == true) {
      Modal.confirm({isLoading: true, onCallback: (res, hide) => hide()});

      PetService.create({
        name: data.name,
        type: data.type,
        breed: data.breed,
        sex: data.sex,
        weight: data.weight,
        picture_id: 3,
        date_of_birth: data.dateOfBirth,
        body_color: data.bodyColor,
        eye_color: data.eyeColor,
        microchip_id: data.microschipId,
      })
        .then((res) => {
          ToastAndroid.show('Berhasil ditambahkan!', ToastAndroid.LONG);
          navigation.navigate(Screens.HOME_CUSTOMER);
        })
        .catch((err) => {
          navigation.goBack(null);
          ToastAndroid.show(`Ooops, terdapat masalah!`, ToastAndroid.LONG);
        });
    }
  };

  const onSubmit = async () => {
    try {
      const result = await validate(data, PetSchema);
      setErrorMessages(result);
      if (result.pictureId) {
        ToastAndroid.show(errorMessages.pictureId, ToastAndroid.SHORT);
        return;
      }
      if (Object.values(result).find((item) => item != null)) return;

      Modal.confirm({
        title: 'Konfirmasi',
        description: 'Apakah anda yakin ingin menambahkan hewan peliharaan?',
        textConfirm: 'Ya, Tambahkan',
        textCancel: 'Tidak',
        onCallback: onSave,
      });
    } catch (error) {
      ToastAndroid.show('Ooops..., Terjadi Kesalahan', ToastAndroid.LONG);
    }
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
          onBodyColorChange,
          onEyeColorChange,
          onMicroschipIdChange,
          isPictureUploading: isUploading,
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
