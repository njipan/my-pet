import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LabelError from './../label-error';
import {Colors, Mixins, Typography} from '@style';
import RNPickerSelect from 'react-native-picker-select';

const Dropdown = ({
  data = [],
  value = null,
  placeholder = {},
  label = '',
  error = false,
  backgroundColor = Colors.WHITE,
  borderColor = Colors.LIGHT_GREY,
  labelColor = Colors.GREY,
  onValueChange = (value) => {},
  ...props
}) => {
  const containerLabel = {
    backgroundColor: Colors.WHITE,
    position: 'absolute',
    top: -10,
    left: 16,
    zIndex: 1,
    ...Mixins.padding(0, 6),
  };
  const errorMessage = error;

  return (
    <>
      <View style={styles.pickerContainer}>
        {label != '' && (
          <View style={containerLabel}>
            <Text
              style={{
                fontSize: Typography.FONT_SIZE_16,
                color: labelColor,
              }}>
              {label}
            </Text>
          </View>
        )}
        <RNPickerSelect
          onValueChange={onValueChange}
          items={data}
          value={value}
          placeholder={placeholder}
          style={{
            inputAndroid: {
              color: 'grey',
              fontFamily: 'sans-serif-medium',
              fontWeight: 500,
            },
          }}
          {...props}
        />
      </View>
      {errorMessage !== false && (
        <View
          style={{
            paddingLeft: 2,
            width: '100%',
            flexWrap: 'wrap',
          }}>
          <LabelError text={errorMessage} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    ...Mixins.padding(10, 0, 6, 12),
    width: '100%',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: Colors.LIGHT_GREY,
    marginTop: 16,
  },
});

export default Dropdown;
