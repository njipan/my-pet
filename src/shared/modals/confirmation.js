import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View,
} from 'react-native';
import {Heading, ButtonFluid} from '@component';
import {Colors, Typography} from '@style';
import Card from './components/card';

const Confirmation = ({navigation, ...props}) => {
  const {
    onClose = () => {},
    title = 'Konfirmasi',
    description = '',
    textConfirm = '',
    textCancel = '',
    onCallback = (result) => {},
    isLoading = false,
    onLoad = () => {},
    reverse = false,
  } = navigation.state.params;

  React.useEffect(() => {
    if (typeof onLoad == 'function') onLoad(navigation);
  }, [isLoading]);

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
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Card
            styleRoot={{
              width: 60,
              height: 60,
              padding: 0,
              borderRadius: 200,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20,
            }}>
            <ActivityIndicator size="large" color={Colors.GREY} />
          </Card>
        </View>
      )}
      {!isLoading && (
        <Card styleRoot={{padding: 20, borderRadius: 16}}>
          <Text
            style={{
              fontFamily: Typography.FONT_FAMILY_REGULAR,
              fontWeight: '700',
              color: Colors.REGULAR,
              fontSize: 18,
            }}>
            {title || ''}
          </Text>
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
              flexDirection: reverse ? 'row-reverse' : 'row',
              width: '100%',
              justifyContent: reverse ? 'flex-start' : 'flex-end',
              marginTop: 4,
            }}>
            <ButtonFluid
              text={reverse ? textConfirm : textCancel || ''}
              type="small"
              styleContainer={{
                paddingTop: 6,
                paddingBottom: 6,
                backgroundColor: 'transparent',
              }}
              textColor={Colors.PRIMARY}
              styleText={{
                fontFamily: Typography.FONT_FAMILY_REGULAR,
                fontWeight: '700',
                fontSize: 16,
              }}
              onPress={() => {
                callback(reverse ? true : false);
              }}
            />
            <View style={{marginHorizontal: 4}}></View>
            {textConfirm != '' && (
              <ButtonFluid
                text={reverse ? textCancel : textConfirm}
                type="small"
                fullWidth={false}
                styleContainer={{
                  paddingTop: 6,
                  paddingBottom: 6,
                  paddingLeft: 16,
                  paddingRight: 16,
                }}
                styleText={{
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                  fontWeight: '700',
                  fontSize: 16,
                }}
                onPress={() => {
                  callback(reverse ? false : true);
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
