import React from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  View,
  useWindowDimensions,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import {TextInput} from '@component';
import {Screens, Time} from '@constant';
import {PictureService, MerchantService} from '@service';
import {useSchema} from '@shared/hooks';
import {Box, Colors, Mixins, Typography} from '@style';
import * as Modal from '@util/modal';
import {encodeFromBuffer} from '@util/file';

import {ProfileUpdateSchema} from './../../schemas';

const ProfileEditScreen = ({navigation}) => {
  const deviceHeight = useWindowDimensions().height;
  const {routeName = null, key = null} = navigation.getParam('savedState');
  const {data, messages, setData, setMessages, setValueAndValidate} = useSchema(
    {},
    {},
    ProfileUpdateSchema,
  );
  const [picture, setPicture] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [hours, setHours] = React.useState([]);

  const getMe = async () => {
    try {
      const response = await MerchantService.getMe();
      const body = {
        fullName: response.user.full_name,
        email: response.user.email,
        phone: response.user.phone,
        address: response.merchant.address,
        operationalHour: response.merchant.operational_hour,
        facility: response.merchant.facility,
        pictureId: response.user.picture_id,
      };
      if (response.pictures.file) {
        const uri = await encodeFromBuffer(response.pictures.file.data);
        setPicture({uri: `data:image/jpeg;base64,${uri}`});
      }
      setData(body);
      navigation.setParams({
        onPress: () => onSubmit({...body}),
      });
    } catch (err) {
      console.log(err);
      ToastAndroid.show('Terjadi Kesalahan', ToastAndroid.LONG);
    }
  };

  React.useEffect(() => {
    getMe();
  }, []);

  const onSubmit = (formData) => {
    Modal.confirm({
      isLoading: true,
      onLoad: async (modalNav) => {
        try {
          const body = {
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            operational_hour: formData.operationalHour,
            facility: formData.facility,
            picture_id: formData.pictureId,
          };
          await MerchantService.update(body);
          ToastAndroid.show('Perubahan berhasil disimpan!', ToastAndroid.LONG);
          navigation.navigate(routeName, key);
          navigation.getParam('reload', () => {})();
        } catch (error) {
          console.log(error);
          ToastAndroid.show('Terjadi Kesalahan', ToastAndroid.LONG);
          modalNav.goBack();
        }
      },
    });
  };

  const injectParams = (key, value, obj) => {
    navigation.setParams({
      onPress: () => onSubmit({...obj, [key]: value}),
    });
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
        console.log(err);
        ToastAndroid.show('Gagal upload foto', ToastAndroid.LONG);
      }
      setUploading(false);
    });
  };

  const setOperationalHour = (value, hide) => {
    hide(null);
    if (!value || hours.includes(value)) return;
    const temp = [...hours, value];
    if (temp.length > 2) temp.shift();
    temp.sort();
    setHours(temp);
    setData({
      ...data,
      operationalHour: temp[0] ? `${temp[0]} - ${temp[1] || 'Not Set'}` : null,
    });
    injectParams(
      'operationalHour',
      temp[0] && temp[1] ? `${temp[0]} - ${temp[1]}` : null,
      data,
    );
  };

  const onOperationalHourPress = () => {
    Modal.select({
      items: Time.hours,
      onCallback: setOperationalHour,
    });
  };

  return (
    <ScrollView>
      <View
        style={{
          height: 0.32 * deviceHeight,
          backgroundColor: Colors.BLACK10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {uploading ? (
          <View>
            <ActivityIndicator color={Colors.LIGHT_GREY} size="large" />
            <Text style={{color: Colors.LIGHT_GREY, marginTop: 10}}>
              Sedang diunggah ...
            </Text>
          </View>
        ) : !picture ? (
          <TouchableOpacity onPress={onPictureChange}>
            <Image
              source={require('@asset/icons/add_a_photo.png')}
              style={{
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        ) : (
          <Image
            source={picture}
            style={{
              height: '100%',
              width: '100%',
              resizeMode: 'contain',
            }}
          />
        )}
      </View>
      <View style={{padding: 16}}>
        <Text style={{...Box.CONTAINER_TITLE, marginBottom: 10}}>
          Merchant Info
        </Text>
        <View>
          <TextInput
            label="Nama"
            error={messages.fullName}
            value={data.fullName}
            onChangeText={setValueAndValidate('fullName', injectParams)}
          />
          <TextInput
            label="Email"
            error={messages.email}
            value={data.email}
            onChangeText={setValueAndValidate('email', injectParams)}
          />
          <TextInput
            keyboardType="numeric"
            label="Nomor Telepon"
            error={messages.phone}
            value={data.phone}
            onChangeText={setValueAndValidate('phone', injectParams)}
          />
          <TextInput
            label="Alamat Klinik"
            error={messages.address}
            value={data.address}
            onChangeText={setValueAndValidate('address', injectParams)}
          />
          <TouchableOpacity onPress={() => onOperationalHourPress()}>
            <TextInput
              label="Jam Operasional"
              editable={false}
              error={messages.operationalHour}
              value={data.operationalHour}
            />
          </TouchableOpacity>
          <TextInput
            numberOfLines={5}
            multiline={true}
            label="Fasilitas"
            error={messages.facility}
            value={data.facility}
            onChangeText={setValueAndValidate('facility', injectParams)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const ButtonSave = ({onPress, ...props}) => {
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

ProfileEditScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Ubah Profil',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
    headerRight: (
      <ButtonSave onPress={navigation.getParam('onPress', () => {})} />
    ),
  };
};

export default ProfileEditScreen;
