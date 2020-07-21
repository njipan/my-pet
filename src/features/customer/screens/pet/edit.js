import React from 'react';
import {ToastAndroid, StyleSheet, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import {Screens} from '@constant';
import {PetService, PictureService} from '@service';
import {useSchema} from '@shared/hooks';
import {Typography} from '@style';
import {moment, parseDateFromNow} from '@util/moment';
import * as Modal from '@util/modal';
import Transformer from '@util/transformer';
import {validate, singleValidate} from '@util/validate';

import PetForm from './../../components/pet-form';
import {PetSchema} from './../../schemas';

const EditScreen = ({navigation, ...props}) => {
  const {routeName, key} = navigation.getParam('savedState');
  const initData = Transformer(navigation.getParam('data') || {});
  const initPicture = navigation.getParam('picture');
  const [loading, setLoading] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const {
    data,
    messages,
    setData,
    setMessages,
    setFormAndValidate,
    setValueAndValidate,
  } = useSchema(
    {...initData, microschipId: initData.microchipId},
    {},
    PetSchema,
  );
  const [picture, setPicture] = React.useState(initPicture);
  const [isUploading, setUploading] = React.useState(false);

  const onNext = async () => {
    try {
      const result = await validate(data, PetSchema);
      setMessages(result);
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
    } catch (error) {}
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
      if (!response.uri) return;
      setUploading(true);
      PictureService.upload(response)
        .then((res) => {
          setPicture({uri: response.uri});
          setData({
            ...data,
            pictureId: res.data.data.id,
          });
        })
        .catch((e) => {
          ToastAndroid.show('Gagal upload foto', ToastAndroid.LONG);
        })
        .finally(() => setUploading(false));
    });
  };

  const onDateOfBirthChange = (value) => {
    let message = 'Tanggal lahir tidak boleh kosong!';
    if (!value) {
      setData({...data, dateOfBirth: null});
    } else {
      const date = moment(new Date(value));
      const dateString = date.format('DD-MM-YYYY');
      console.log(date);
      message = singleValidate(dateString, PetSchema.dateOfBirth);

      if (message == null) {
        setData({
          ...data,
          dateOfBirth: dateString,
        });
      }
    }
    setMessages({
      ...messages,
      dateOfBirth: message,
    });
  };

  const onPrevious = () => {
    setStep(step - 1);
  };

  const onSave = (res, hide) => {
    if (!res) return;
    Modal.confirm({
      isLoading: true,
      onLoad: async (modalNavigation) => {
        try {
          const body = {
            picture_id: data.pictureId,
            name: data.name,
            type: data.type,
            breed: data.breed,
            sex: data.sex,
            weight: data.weight,
            date_of_birth: data.dateOfBirth,
            body_color: data.bodyColor,
            eye_color: data.eyeColor,
            microchip_id: data.microschipId,
          };
          const response = await PetService.update(data.id, body);
          ToastAndroid.show('Perubahan berhasil disimpan!', ToastAndroid.LONG);
          modalNavigation.navigate(routeName, key, {
            data: navigation.getParam('data'),
            picture: navigation.getParam('picture'),
          });
        } catch (err) {
          ToastAndroid.show(`Terjadi Kesalahan!`, ToastAndroid.LONG);
          modalNavigation.goBack(null);
        }
      },
    });
  };

  const onSubmit = async () => {
    try {
      const result = await validate(data, PetSchema);
      setMessages(result);
      if (result.pictureId) {
        ToastAndroid.show(result.pictureId, ToastAndroid.SHORT);
        return;
      }
      if (Object.values(result).find((item) => item != null)) return;
      Modal.confirm({
        title: 'Konfirmasi',
        description:
          'Apakah anda yakin ingin menyimpan perubahan hewan peliharaan?',
        textConfirm: 'Ya, Tambahkan',
        textCancel: 'Tidak',
        onCallback: onSave,
      });
    } catch (error) {
      ToastAndroid.show('Terjadi Kesalahan', ToastAndroid.LONG);
    }
  };
  return (
    <View style={styles.container}>
      <PetForm
        {...{
          step,
          errorMessages: messages,
          onNext,
          onPrevious,
          onSubmit,
          onTypeChange: setValueAndValidate('type'),
          onNameChange: setValueAndValidate('name'),
          onBreedChange: setValueAndValidate('breed'),
          onSexChange: setValueAndValidate('sex'),
          onWeightChange: setValueAndValidate('weight'),
          onPictureChange,
          onDateOfBirthChange,
          onBodyColorChange: setValueAndValidate('bodyColor'),
          onEyeColorChange: setValueAndValidate('eyeColor'),
          onMicroschipIdChange: setValueAndValidate('microschipId'),
          isPictureUploading: isUploading,
        }}
        {...data}
        picture={picture}
        age={parseDateFromNow(data.dateOfBirth)}
        microschipId={data.microschipId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

EditScreen.navigationOptions = ({navigation, ...props}) => {
  return {
    title: 'Ubah Peliharaan',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
  };
};

export default EditScreen;
