import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Image,
  TextInput,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import {Colors, Mixins, Typography} from './../../styles';
import LabelError from './../label-error';
import PasswordShow from './../../assets/icons/form/password-show.png';
import PasswordHide from './../../assets/icons/form/password-hide.png';
import Key from './../../assets/icons/form/key.png';

const Icon = (props) => {
  const icon = props.icon || PasswordShow;
  return <Image style={{width: 32, height: 32}} source={icon} />;
};

const PasswordInput = ({
  backgroundColor = Colors.WHITE,
  borderColor = Colors.LIGHT_GREY,
  labelColor = Colors.GREY,
  label = '',
  textColor = Colors.BLACK,
  error = false,
  toggle = true,
  secure = true,
  placeholder = '',
  style = {},
  ...props
}) => {
  const errorMessage = error;
  const tempBorderColor = errorMessage !== false ? Colors.DANGER : borderColor;
  const [outerColor, setOuterColor] = useState(tempBorderColor);
  const [isSecure, setIsSecure] = useState(secure);
  const paddingRight = !toggle ? 0 : 10;

  useEffect(() => {
    if (errorMessage !== false) setOuterColor(Colors.DANGER);
  }, null);

  const onFocus = () => {
    if (errorMessage === false) {
      setOuterColor(Colors.BLUE);
      return;
    }
    setOuterColor(tempBorderColor);
  };

  const onBlur = () => {
    setOuterColor(tempBorderColor);
  };

  const toggleSecure = () => {
    const temp = isSecure;
    setIsSecure(!temp);
  };

  return (
    <>
      <View
        style={{
          ...styles.container,
          borderColor: outerColor,
          position: 'relative',
          marginTop: 16,
          ...style,
        }}>
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
        <TextInput
          secureTextEntry={isSecure}
          style={{
            ...styles.text,
            backgroundColor,
            color: textColor,
            paddingRight,
          }}
          placeholder={placeholder}
          placeholderTextColor="grey"
          onFocus={onFocus}
          onBlur={onBlur}
          {...props}
        />
        {toggle && (
          <TouchableHighlight
            onPress={toggleSecure}
            underlayColor="white"
            style={{
              borderRadius: 6,
              marginLeft: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 48,
                alignItems: 'center',
              }}>
              <Icon icon={isSecure ? PasswordShow : PasswordHide} />
            </View>
          </TouchableHighlight>
        )}
      </View>
      {errorMessage !== false && (
        <View
          style={{
            paddingLeft: 6,
            width: '100%',
            flexWrap: 'wrap',
            marginBottom: 12,
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

PasswordInput.propTypes = {
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  labelColor: PropTypes.string,
  label: PropTypes.string,
  textColor: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  toggle: PropTypes.bool,
  secure: PropTypes.bool,
  placeholder: PropTypes.string,
  style: PropTypes.object,
  icon: PropTypes.element,
};

export default PasswordInput;
