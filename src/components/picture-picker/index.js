import React from 'react';
import {
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {Colors} from '@style';

const PicturePicker = ({
  value = null,
  title = '',
  description = '',
  icon = null,
  onChange = () => {},
  backgroundColor = Colors.BLACK10,
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
          Ubah Foto
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
      <TouchableWithoutFeedback onPress={onChange}>
        {isValueExist(value)}
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
