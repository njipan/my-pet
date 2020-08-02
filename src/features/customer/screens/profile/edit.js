import React from 'react';
import {
  ToastAndroid,
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import moment from 'moment';

import {CustomerService, PictureService} from '@service';
import {useSchema} from '@shared/hooks';
import {Colors, Typography} from '@style';
import {encodeFromBuffer} from '@util/file';
import * as Modal from '@util/modal';
import {validate, isObjectValuesNull} from '@util/validate';

import ProfileEditForm from './../../components/profile-edit-form';
import {ProfileUpdateSchema} from './../../schemas';

const ProfileEditScreen = ({navigation, ...props}) => {
  const {
    data,
    messages,
    setData,
    getData,
    setMessages,
    setValueAndValidate,
  } = useSchema({}, {}, ProfileUpdateSchema);
  const [picture, setPicture] = React.useState(null);
  const [isUploading, setUploading] = React.useState(true);

  const getMe = async () => {
    try {
      const response = await CustomerService.getMe();
      const {
        full_name,
        email,
        phone,
        picture_id,
        birth_place,
        birth_date,
        sex,
      } = response.data.data.user;
      const fileData = response.data.data.pictures.file?.data;
      setData({
        email,
        phone,
        name: full_name,
        pictureId: picture_id,
        birthDate: birth_date,
        birthPlace: birth_place,
        sex,
      });
      if (fileData) {
        const uri = await encodeFromBuffer(fileData);
        setPicture({uri: `data:image/jpeg;base64,${uri}`});
      }
      navigation.setParams({
        onPress: () => onSubmit({...data}),
      });
    } catch (err) {
      setPicture(null);
      setUploading(false);
    }
    setUploading(false);
  };

  const onSave = async (formData, navigation) => {
    try {
      const body = {
        full_name: formData.name,
        picture_id: formData.pictureId,
        email: formData.email,
        phone: formData.phone,
        birth_date: formData.birthDate,
        birth_place: formData.birthPlace,
        sex: formData.sex,
      };
      const response = await CustomerService.update(body);
      ToastAndroid.show('Perubahan telah disimpan!', ToastAndroid.LONG);
    } catch (err) {
      ToastAndroid.show('Perubahan gagal!', ToastAndroid.LONG);
    }
    navigation.goBack();
  };

  const onSubmit = async (formData) => {
    try {
      const messages = await validate(formData, ProfileUpdateSchema);
      setMessages(messages);
      if (!isObjectValuesNull(messages)) return;
      Modal.confirm({
        isLoading: true,
        onLoad: (navigation) => onSave(formData, navigation),
      });
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    getMe();
    setUploading(false);
  }, []);

  const onBirthDateChange = (timestamp) => {
    const date = moment(new Date(timestamp));
    const dateString = date.isValid() ? date.format('DD-MM-YYYY') : null;
    return setValueAndValidate('birthDate', injectParams)(dateString);
  };

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
        setValueAndValidate('pictureId', injectParams)(id);
      } catch (err) {
        ToastAndroid.show('Gagal upload foto', ToastAndroid.LONG);
      }
      setUploading(false);
    });
  };

  const injectParams = (key, value, obj) => {
    navigation.setParams({
      onPress: () => onSubmit({...obj, [key]: value}),
    });
  };

  return (
    <ScrollView>
      <ProfileEditForm
        {...{
          errorMessages: messages,
          onPictureChange,
          onNameChange: setValueAndValidate('name', injectParams),
          onEmailChange: setValueAndValidate('email', injectParams),
          onPhoneChange: setValueAndValidate('phone', injectParams),
          onBirthDateChange,
          onPlaceChange: setValueAndValidate('birthPlace', injectParams),
          onSexChange: setValueAndValidate('sex', injectParams),
          isUploadingPicture: isUploading,
        }}
        data={{...data, picture: picture}}
      />
    </ScrollView>
  );
};

const ButtonSave = ({onPress, navigation, ...props}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {typeof onPress != 'function' ? null : (
        <View
          style={{
            paddingHorizontal: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={{width: 14, height: 14, marginRight: 8}}
            source={require('@asset/icons/indicators/check-success.png')}
          />
          <View style={{justifyContent: 'center'}}>
            <Text
              style={{
                color: Colors.SUCCESS,
                fontFamily: Typography.FONT_FAMILY_BOLD,
                fontSize: 16,
              }}>
              Simpan
            </Text>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

ProfileEditScreen.navigationOptions = (props) => {
  const {params = {}} = props.navigation.state;

  return {
    title: 'Ubah Profil',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
    screenProps: {},
    headerRight: <ButtonSave {...props} onPress={params.onPress} />,
  };
};

export default ProfileEditScreen;
