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
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor,
        borderStyle: !value ? 'dashed' : 'solid',
      }}>
      {!value && (
        <>
          <TouchableWithoutFeedback onPress={onChange}>
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
          </TouchableWithoutFeedback>
        </>
      )}
      {value && (
        <>
          <Image source={{uri: value}} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 140,
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
