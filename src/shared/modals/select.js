import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
  Text,
  ScrollView,
  View,
  useWindowDimensions,
} from 'react-native';
import {Heading, ButtonFluid} from '@component';
import {Colors, Typography} from '@style';
import Card from './components/card';

const SelectItem = ({
  styleRoot = {},
  styleText = {},
  onPress = () => {},
  checked = false,
  iconChecked = null,
  iconUnchecked = null,
  label = null,
  value = null,
}) => {
  return (
    <TouchableHighlight
      style={{
        ...styleRoot,
      }}
      onPress={() => onPress(value)}
      underlayColor={Colors.BLACK10}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
          paddingHorizontal: 16,
        }}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            style={{
              fontFamily: Typography.FONT_FAMILY_MEDIUM,
              fontSize: 18,
            }}>
            {label}
          </Text>
        </View>
        {checked ? iconChecked : iconUnchecked}
      </View>
    </TouchableHighlight>
  );
};

const Select = ({navigation, ...props}) => {
  const {items = [], value = null, onCallback = (result) => {}} =
    navigation.state.params || {};

  const deviceHeight = useWindowDimensions().height * 0.75;

  React.useEffect(() => {}, []);

  const callback = (value) => {
    onCallback(value, navigation.goBack, navigation);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          callback(false, navigation.goBack, navigation);
        }}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <View
        style={{
          backgroundColor: 'white',
          maxHeight: deviceHeight,
          width: '80%',
          borderRadius: 10,
          paddingTop: 10,
          paddingBottom: 10,
          shadowColor: Colors.BLACK80,
          shadowOpacity: 0.2,
          shadowRadius: 1,
          elevation: 2,
        }}>
        <ScrollView style={{backgroundColor: 'transparent'}}>
          <View style={{backgroundColor: 'white', borderRadius: 10}}>
            {items &&
              items.map((item, idx) => (
                <SelectItem
                  key={idx}
                  checked={item.value == value}
                  styleRoot={{
                    ...(idx == 0
                      ? {borderTopRightRadius: 10, borderTopLeftRadius: 10}
                      : idx == items.length - 1
                      ? {
                          borderBottomRightRadius: 10,
                          borderBottomLeftRadius: 10,
                        }
                      : {}),
                  }}
                  value={item.value}
                  label={item.label}
                  onPress={(value) =>
                    callback(value, navigation.goBack, navigation)
                  }
                  iconChecked={
                    <Image
                      source={require('@asset/icons/form/radio/checked/normal.png')}
                      style={{width: 24, height: 24}}
                    />
                  }
                  iconUnchecked={
                    <Image
                      source={require('@asset/icons/form/radio/unchecked/normal.png')}
                      style={{width: 24, height: 24}}
                    />
                  }
                />
              ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
});

export default Select;
