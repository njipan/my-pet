import React from 'react';
import {
  TouchableOpacity,
  RefreshControl,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {StackActions} from 'react-navigation';
import Dash from 'react-native-dash';
import {getDatetime} from '@util/moment';

import {ButtonFluid} from '@component';
import * as Order from '@component/order';
import {Box, Colors, Typography} from '@style';
import {Screens, OrderStatus} from '@constant';
import useOrderDetail from '@shared/hooks/order-detail-hook';

import {TitleWithAction} from './incoming-detail';

const StatusDetailScreen = ({navigation, ...props}) => {
  const paramData = navigation.getParam('data', {});
  const {order, orderLoading, refreshOrder} = useOrderDetail(paramData.id);

  return (
    <View style={{flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={orderLoading}
            colors={Colors.REFRESH_CONTROL_PRIMARY}
          />
        }>
        {!orderLoading ? (
          <View>
            <View style={{...styles.container}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                }}>
                {order.status == OrderStatus.ORDER_COMPLETED ? (
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
                  {order.status == OrderStatus.ORDER_COMPLETED
                    ? `Booking Berhasil`
                    : `Dibatalkan`}
                </Text>
              </View>
              <Dash
                style={{width: '100%', marginBottom: 8, marginTop: 12}}
                dashColor={Colors.BLACK10}
                dashThickness={1}
                dashGap={4}
              />
              <Order.Info
                name={paramData.fullName}
                booking={paramData.id}
                date={getDatetime(
                  order.booking_date || paramData.bookingDatetime,
                )}
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
                data={order.order_pets || []}
                petAliases={{
                  services: 'order_pet_services',
                  name: 'pet_name',
                }}
                serviceAliases={{
                  name: 'service_name',
                  qty: 'service_qty',
                  description: 'service_description',
                  price: 'service_price',
                }}
                action={false}
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
                Detail Pembayaran
              </Text>
              <View style={{paddingVertical: 10}} />
              <Order.PaymentInfo
                done
                method="Cash"
                total={`Rp ${new Intl.NumberFormat(['id']).format(
                  order.amount || 0,
                )}`}
                serviceAliases={{
                  price: 'amountFormatted',
                }}
                data={Object.values(order.summary || [])}
              />
            </View>
            <View style={{paddingVertical: 10}} />
          </View>
        ) : null}
      </ScrollView>
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

StatusDetailScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Status Pesanan',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
  };
};

export default StatusDetailScreen;
