import React from 'react';
import {ToastAndroid, ScrollView} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import {Typography} from '@style';
import {encodeFromBuffer} from '@util/file';
import * as Modal from '@util/modal';
import {validate} from '@util/validate';
import {useSchema} from '@shared/hooks';
import {CustomerService, PictureService} from '@service';

import ProfileEditForm from './../../components/profile-edit-form';
import {ProfileUpdateSchema} from './../../schemas';

const ProfileEditScreen = ({navigation, ...props}) => {
  const {data, messages, setData, setValueAndValidate} = useSchema(
    {},
    {},
    ProfileUpdateSchema,
  );
  const [picture, setPicture] = React.useState(null);
  const [isUploading, setUploading] = React.useState(true);

  const getMe = async () => {
    try {
      const response = await CustomerService.getMe();
      const {full_name, email, phone, picture_id} = response.data.data.user;
      const fileData = response.data.data.pictures.file?.data;
      setData({
        email,
        phone,
        name: full_name,
        pictureId: picture_id,
      });
      if (!fileData) return;
      const uri = await encodeFromBuffer(fileData);
      setPicture({uri: `data:image/jpeg;base64,${uri}`});
    } catch (err) {}
    setUploading(false);
  };

  React.useEffect(() => {
    getMe();
  }, []);

  const onPictureChange = () => {
    const options = {
      title: 'Pilih Foto',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, async (response) => {
      if (!response.uri) return;
      setUploading(true);
      try {
        const res = await PictureService.upload(response);
        const {id} = res.data.data;
        setPicture({uri: response.uri});
        setData({...data, pictureId: id});
      } catch (err) {
        ToastAndroid.show('Gagal upload foto', ToastAndroid.LONG);
      }
      setUploading(false);
    });
  };

  const onSave = async (navigation) => {
    try {
      const response = await CustomerService.update({
        full_name: data.name,
        email: data.email,
        phone: data.phone,
        picture_id: data.pictureId,
      });
      ToastAndroid.show('Perubahan telah disimpan!', ToastAndroid.LONG);
    } catch (err) {
      ToastAndroid.show('Perubahan gagal!', ToastAndroid.LONG);
    }
    navigation.goBack();
  };

  const onSubmit = async () => {
    try {
      const messages = await validate(data, ProfileUpdateSchema);
      Modal.confirm({
        isLoading: true,
        onLoad: onSave,
      });
    } catch (err) {}
  };

  return (
    <ScrollView>
      <ProfileEditForm
        {...{
          errorMessages: messages,
          onSubmit,
          onPictureChange,
          onNameChange: setValueAndValidate('name'),
          onEmailChange: setValueAndValidate('email'),
          onPhoneChange: setValueAndValidate('phone'),
          onPlaceChange: setValueAndValidate('placeOfBirth'),
          onSexChange: setValueAndValidate('sex'),
          isUploadingPicture: isUploading,
        }}
        data={{...data, picture: picture}}
      />
    </ScrollView>
  );
};

ProfileEditScreen.navigationOptions = {
  title: 'Ubah Profil',
  headerTitleStyle: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
};

export default ProfileEditScreen;
