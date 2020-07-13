import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  TextInput as TextField,
  Text,
  View,
} from 'react-native';

import {Colors, Mixins, Typography} from './../../styles';
import LabelError from './../label-error';

const Icon = (props) => {
  const icon = props.icon || PasswordShow;
  return <Image style={{width: 32, height: 32}} source={icon} />;
};

const ErrorDangerIcon = () => {
  return (
    <Image
      style={{width: 28, height: 28}}
      source={require('./../../assets/icons/error-danger.png')}
    />
  );
};

const TextInput = ({
  backgroundColor = Colors.WHITE,
  borderColor = Colors.LIGHT_GREY,
  labelColor = Colors.GREY,
  label = '',
  textColor = Colors.BLACK,
  error = false,
  placeholder = '',
  style = {},
  onChangeText = (text) => {},
  changeBorder = true,
  editable = true,
  ...props
}) => {
  const errorMessage = error;
  const isBorder = (c) => (!error ? c : editable ? Colors.DANGER : c);
  const [outerColor, setOuterColor] = useState(isBorder(Colors.LIGHT_GREY));

  useEffect(() => {
    if (errorMessage !== false && editable) {
      setOuterColor(Colors.DANGER);
    }
  }, []);

  const onFocus = (e) => {
    if (!errorMessage) {
      setOuterColor(Colors.BLUE);
      return;
    }
    setOuterColor(Colors.DANGER);
    if (typeof props.onFocus == 'function') props.onFocus(e);
  };

  const onBlur = () => {
    setOuterColor(isBorder(Colors.LIGHT_GREY));
  };

  return (
    <>
      <View
        style={{
          ...styles.container,
          borderColor: isBorder(outerColor),
          position: 'relative',
          marginTop: 16,
          ...style,
        }}>
        {label != '' && (
          <View
            style={{
              ...styles.containerLabel,
              backgroundColor,
            }}>
            <Text
              style={{
                fontSize: Typography.FONT_SIZE_16,
                color: labelColor,
              }}>
              {label}
            </Text>
          </View>
        )}
        {React.isValidElement(props.icon) && (
          <View
            style={{
              width: 48,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {props.icon}
          </View>
        )}
        <TextField
          style={{
            ...styles.text,
            backgroundColor,
            color: textColor,
          }}
          placeholder={placeholder}
          placeholderTextColor="grey"
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={(text) => onChangeText(text)}
          editable={editable}
          {...props}
        />
        {errorMessage && (
          <View
            style={{
              justifyContent: 'center',
            }}>
            <ErrorDangerIcon />
          </View>
        )}
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
  container: {
    width: '100%',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    alignItems: 'stretch',
    ...Mixins.padding(16, 12, 12, 12),
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  containerLabel: {
    backgroundColor: Colors.WHITE,
    position: 'absolute',
    top: -10,
    left: 16,
    zIndex: 1,
    ...Mixins.padding(0, 6),
  },
  text: {
    borderColor: 'transparent',
    color: Colors.GREY,
    flex: 1,
    fontSize: Typography.FONT_SIZE_20,
    ...Mixins.padding(6, 8, 6, 10),
  },
});

TextInput.propTypes = {
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  labelColor: PropTypes.string,
  label: PropTypes.string,
  textColor: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  placeholder: PropTypes.string,
  style: PropTypes.object,
  icon: PropTypes.element,
  onChangeText: PropTypes.func,
};

export default TextInput;
