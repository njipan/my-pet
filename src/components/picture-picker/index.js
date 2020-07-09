import React from 'react';
import {
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '@style';

const PicturePicker = ({
  value = null,
  title = '',
  description = '',
  icon = null,
  onChange = () => {},
  backgroundColor = Colors.BLACK10,
  loading = false,
}) => {
  const isValueExist = (pictureValue) => {
    if (!pictureValue) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {React.isValidElement(icon) ? (
            icon
          ) : (
            <Image source={require('@asset/icons/add_a_photo.png')} />
          )}
          <View style={{marginVertical: 6}} />
          <Text style={{color: Colors.BLACK54, fontSize: 16}}>
            {title || ''}
          </Text>
          <Text style={{color: Colors.BLACK54}}>{description || ''}</Text>
        </View>
      );
    }
    return (
      <View style={{alignItems: 'center'}}>
        <Image
          source={pictureValue}
          style={{width: 100, height: 100, resizeMode: 'cover'}}
        />
        <Text
          style={{
            marginTop: 4,
            color: Colors.BLACK54,
            fontSize: 16,
            textDecorationLine: 'underline',
          }}>
          {loading ? 'Uploading ...' : 'Ubah Foto'}
          {loading ? (
            <ActivityIndicator size="small" color={Colors.GREY} />
          ) : null}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor,
        borderStyle: !value ? 'dashed' : 'solid',
      }}>
      <TouchableWithoutFeedback onPress={() => (loading ? null : onChange())}>
        {loading ? (
          <View>
            <ActivityIndicator size="large" color={Colors.GREY} />
            <View style={{marginVertical: 4}} />
            <Text style={{color: Colors.GREY}}>Sedang diunggah ...</Text>
          </View>
        ) : (
          isValueExist(value)
        )}
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 160,
    borderColor: Colors.BLACK54,
    borderWidth: 2,
    width: '100%',
    borderRadius: 10,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PicturePicker;
