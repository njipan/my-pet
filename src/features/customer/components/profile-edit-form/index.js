import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
  Image,
} from 'react-native';

import {
  Dropdown,
  ButtonFluid,
  Icons,
  TextInput,
  PicturePicker,
} from '@component';
import {Colors, Mixins, Typography} from '@style';
import {Sex} from '@constant';

const ProfileEditForm = (props) => {
  const {
    onPictureChange,
    onNameChange,
    onEmailChange,
    onPhoneChange,
    onBirthDateChange,
    onPlaceChange,
    onSexChange,
    onSubmit,
    errorMessages = {},
    data = {},
    isUploadingPicture = false,
  } = props;

  const sexData = [
    {label: 'Laki-Laki', value: Sex.MALE},
    {label: 'Perempuan', value: Sex.FEMALE},
  ];

  const renderPicture = (picture) => {
    if (!picture)
      return <Image source={require('@asset/icons/add_a_photo.png')} />;

    return (
      <Image
        source={data.picture || require('@asset/icons/add_a_photo.png')}
        style={{
          height: '100%',
          width: '100%',
          resizeMode: 'contain',
        }}
      />
    );
  };

  return (
    <View>
      <TouchableOpacity
        style={{backgroundColor: Colors.BLACK10, height: 200}}
        onPress={onPictureChange}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}>
          {isUploadingPicture ? (
            <ActivityIndicator size="large" color={Colors.GREY} />
          ) : (
            renderPicture(data.picture)
          )}
        </View>
      </TouchableOpacity>
      <View style={{padding: 20}}>
        <Text
          color={Colors.REGULAR}
          style={{
            ...Typography.heading('h3'),
            fontFamily: Typography.FONT_FAMILY_REGULAR,
          }}>
          Personal Info
        </Text>
        <TextInput
          label="Nama"
          onChangeText={onNameChange}
          error={errorMessages.name}
          value={data.name}
        />
        <TextInput
          label="Email"
          onChangeText={onEmailChange}
          error={errorMessages.email}
          value={data.email}
        />

        <TextInput
          keyboardType="numeric"
          label="Nomor Telepon"
          onChangeText={onPhoneChange}
          error={errorMessages.phone}
          value={data.phone}
        />
        <TouchableOpacity onPress={onBirthDateChange}>
          <TextInput
            editable={false}
            label="Tanggal Lahir"
            error={errorMessages.birthDate}
            value={data.birthDate}
          />
        </TouchableOpacity>
        <TextInput
          label="Tempat Lahir"
          onChangeText={onPlaceChange}
          error={errorMessages.birthPlace}
          value={data.birthPlace}
        />
        <Dropdown
          value={data.sex}
          data={sexData}
          placeholder={{label: 'Jenis Kelamin', value: ''}}
          label="Jenis Kelamin"
          onValueChange={onSexChange}
        />
      </View>
    </View>
  );
};

export default ProfileEditForm;
