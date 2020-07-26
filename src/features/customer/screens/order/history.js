import React from 'react';
import {Image, RefreshControl, Text, ScrollView, View} from 'react-native';
import moment from 'moment';

import {NotificationItem} from '@component/order';
import {Screens} from '@constant';
import {Colors} from '@style';
import ListOrder from './hooks/orders-hook';

const HistroryScreen = ({navigation, ...props}) => {
  const {
    orders,
    orderLoading,
    refreshOrders,
    setOrderLoading,
    getOrders,
  } = ListOrder({}, true);
  const STATUS = 'history';

  const onPress = (value) => {
    navigation.navigate(Screens.ORDER_HISTORY_DETAIL_CUSTOMER, {
      id: value.id,
      merchantName: value.merchant_name,
      bookingDatetime: value.booking_datetime,
    });
  };

  return (
    <ScrollView
      style={{padding: 16, overflow: 'visible'}}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          colors={Colors.REFRESH_CONTROL_PRIMARY}
          refreshing={orderLoading}
          onRefresh={refreshOrders}
        />
      }>
      <View style={{backgroundColor: 'white'}}>
        {getOrders(STATUS) &&
          getOrders(STATUS).map((order) => (
            <View key={order.id}>
              <NotificationItem
                onPress={() => onPress(order)}
                text={order.merchant_name}
                description={moment(order.booking_datetime)
                  .locale('en')
                  .format('dddd, LL HH:MM A')}
                picture={
                  <Image
                    source={require('@asset/icons/menu-bar/vet-service-active/normal.png')}
                    style={{width: 36, height: 36}}
                  />
                }
              />
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

HistroryScreen.navigationOptions = ({navigation, ...props}) => {
  const count = navigation.getParam('count', 0);
  const textCount = count > 0 ? ` (${count})` : '';
  return {
    title: `Riwayat${textCount}`,
  };
};

export default HistroryScreen;
