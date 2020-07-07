import React, {useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback, Text, View} from 'react-native';
import {Heading, ButtonFluid} from '@component';
import {Colors} from '@style';
import Card from './components/card';

const Confirmation = ({navigation, ...props}) => {
  const {
    onClose = () => {},
    title = '',
    description = '',
    textConfirm = '',
    textCancel = '',
    onCallback = (result) => {},
    isLoading = false,
  } = navigation.state.params;

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
      {isLoading && (
        <Card>
          <Heading type="h4" text="Silahkan tunggu .." />
        </Card>
      )}
      {!isLoading && (
        <Card>
          <Heading type="h4" text={title || ''} />
          <View style={{marginVertical: 10}}>
            <Text
              style={{
                fontFamily: 'sans-serif-normal',
                fontSize: 14,
                color: Colors.DARK_GREY,
                lineHeight: 20,
              }}>
              {description || ''}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'flex-end',
              marginTop: 10,
            }}>
            <ButtonFluid
              text={textCancel || ''}
              type="small"
              styleContainer={{
                paddingTop: 6,
                paddingBottom: 6,
                backgroundColor: 'transparent',
              }}
              textColor={Colors.PRIMARY}
              styleText={{
                fontSize: 16,
                fontFamily: 'sans-serif-normal',
                fontWeight: 'bold',
              }}
              onPress={() => {
                callback(false);
              }}
            />
            <View style={{marginHorizontal: 4}}></View>
            {textConfirm != '' && (
              <ButtonFluid
                text={textConfirm || ''}
                type="small"
                fullWidth={false}
                styleContainer={{
                  paddingTop: 6,
                  paddingBottom: 6,
                  paddingLeft: 16,
                  paddingRight: 16,
                }}
                styleText={{
                  fontSize: 16,
                  fontFamily: 'sans-serif-normal',
                  fontWeight: 'bold',
                }}
                onPress={() => {
                  callback(true);
                }}
              />
            )}
          </View>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    borderRadius: 28,
    width: '80%',
    height: 100,
    backgroundColor: 'white',
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

export default Confirmation;
