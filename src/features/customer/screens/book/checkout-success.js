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

import {getDatetime} from '@util/moment';
import {toNumberFormat} from '@util/transformer';

import {ButtonFluid} from '@component';
import * as Order from '@component/order';
import {Box, Colors, Typography} from '@style';
import {Screens} from '@constant';

import {TitleWithAction} from './checkout';

const CheckoutSuccessScreen = ({navigation, ...props}) => {
  const orderData = navigation.getParam('orderData', null);
  const createData = navigation.getParam('createData', {});

  React.useEffect(() => {
    calculateSummary();
  }, []);

  const goToMyOrder = () => {
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate(Screens.ORDER_DETAIL_CUSTOMER, {
      id: orderData.orders.id,
      merchantName: createData.merchantName,
    });
  };

  const calculateSummary = () => {
    const tempServices = {};
    const pets = Object.values(createData.pets);
    for (const pet of pets) {
      for (const service of pet.services) {
        const tempService = tempServices[service.merchant_service_id] || {};
        const qty = (tempService.qty || 0) + service.service_qty;
        const price = (tempService.price || 0) + service.service_price;
        const amount = (tempService.amount || 0) + qty * price;
        tempServices[service.merchant_service_id] = {
          qty,
          price,
          amount,
          amountFormatted: toNumberFormat(amount),
          name: service.service_name,
        };
      }
    }
    const services = Object.values(tempServices);
    const amountBefore = Math.ceil(
      (services.reduce((res, item) => item.amount + res, 0) || 0) * 0.1,
    );
    services.push({name: 'PPn', price: amountBefore, amount: amountBefore});
    const amount = services.reduce((res, item) => item.amount + res, 0);

    createData.summary = {
      amount,
      services,
    };
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
            {orderData ? (
              <Image
                style={{width: 28, height: 28}}
                source={require('@asset/icons/order/success/large.png')}
              />
            ) : (
              <Image
                style={{width: 28, height: 28}}
                source={require('@asset/icons/order/cancel/large.png')}
              />
            )}
            <Text
              style={{
                fontSize: 22,
                fontFamily: Typography.FONT_FAMILY_BOLD,
                marginLeft: 14,
              }}>
              {orderData ? `Booking Berhasil` : 'Booking Gagal'}
            </Text>
          </View>
          <Dash
            style={{width: '100%', marginBottom: 8, marginTop: 12}}
            dashColor={Colors.BLACK10}
            dashThickness={1}
            dashGap={4}
          />
          <Order.Info
            name={createData.merchantName}
            booking={orderData.orders ? orderData.orders.id : '-'}
            date={getDatetime(createData.bookingDatetime)}
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
            data={Object.values(createData.pets) || []}
            onEditPress={() => alert('edit pressed')}
            onDeletePress={() => alert('delete pressed')}
            serviceAliases={{
              name: 'service_name',
              description: 'service_description',
              price: 'service_price',
            }}
            action={false}
          />
        </View>
        <View style={{...Box.SPACER_CONTAINER}} />
        <View style={{...styles.container}}>
          <TitleWithAction title="Detail Pembayaran" />
          <View style={{paddingVertical: 10}} />
          <Order.PaymentInfo
            done
            method="Cash"
            serviceAliases={{
              price: 'amountFormatted',
            }}
            total={toNumberFormat(createData.summary?.amount || 0)}
            data={createData.summary?.services || []}
          />
        </View>
      </ScrollView>
      {orderData ? (
        <View
          style={{
            ...Box.CONTAINER_ACTION_BOTTOM,
            height: 72,
            backgroundColor: 'white',
            elevation: 5,
          }}>
          <ButtonFluid text="Pesanan Saya" onPress={goToMyOrder} />
        </View>
      ) : null}
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
  };
};

export default CheckoutSuccessScreen;
