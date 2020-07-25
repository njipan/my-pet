import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {StackActions} from 'react-navigation';
import Dash from 'react-native-dash';

import {ButtonFluid} from '@component';
import * as Order from '@component/order';
import {Box, Colors, Typography} from '@style';
import {Screens} from '@constant';

import {TitleWithAction} from './checkout';

const CheckoutSuccessScreen = ({navigation, ...props}) => {
  React.useEffect(() => {
    //
  }, []);

  const goToMyOrder = () => {
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate(Screens.ORDER_DETAIL_CUSTOMER);
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{...styles.container}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}>
            <Image
              style={{width: 28, height: 28}}
              source={require('@asset/icons/order/success/large.png')}
            />
            <Text
              style={{
                fontSize: 22,
                fontFamily: Typography.FONT_FAMILY_BOLD,
                marginLeft: 14,
              }}>
              Booking Berhasil
            </Text>
          </View>
          <Dash
            style={{width: '100%', marginBottom: 8, marginTop: 12}}
            dashColor={Colors.BLACK10}
            dashThickness={1}
            dashGap={4}
          />
          <Order.Info
            name={'Animal Clinic Jakarta'}
            booking={'1232131'}
            date={'Minggu, 23 April 2020 08:00 AM'}
          />
        </View>
        <View style={{...Box.SPACER_CONTAINER}} />
        <View style={{...styles.container}}>
          <Text
            style={{
              fontFamily: Typography.FONT_FAMILY_MEDIUM,
              fontSize: 16,
              color: Colors.LIGHT_GREY,
            }}>
            Detail Perawatan
          </Text>
          <Dash
            style={{width: '100%', marginBottom: 10, marginTop: 8}}
            dashColor={Colors.BLACK10}
            dashThickness={1}
            dashGap={4}
          />
          <Order.Treatment
            data={[]}
            onEditPress={() => alert('edit pressed')}
            onDeletePress={() => alert('delete pressed')}
          />
        </View>
        <View style={{...Box.SPACER_CONTAINER}} />
        <View style={{...styles.container}}>
          <TitleWithAction title="Detail Pembayaran" />
          <View style={{paddingVertical: 10}} />
          <Order.PaymentInfo
            done
            method="Cash"
            total="Rp 805.000"
            data={[
              {name: 'Suntik Vaksin', price: 'Rp 400.000'},
              {name: 'Suntik Vitamin', price: 'Rp 400.000'},
              {name: 'PPn', price: 'Rp 5.000'},
            ]}
          />
        </View>
      </ScrollView>
      <View
        style={{
          ...Box.CONTAINER_ACTION_BOTTOM,
          height: 72,
          backgroundColor: 'white',
          elevation: 5,
        }}>
        <ButtonFluid text="Pesanan Saya" onPress={goToMyOrder} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  treatmentItemContainer: {
    marginTop: 6,
    paddingBottom: 8,
    borderBottomWidth: 0.6,
    borderBottomColor: Colors.BLACK10,
  },
});

CheckoutSuccessScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Detail Booking',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
    headerLeft: null,
  };
};

export default CheckoutSuccessScreen;
