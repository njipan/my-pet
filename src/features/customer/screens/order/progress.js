import React from 'react';
import {Image, Text, RefreshControl, ScrollView, View} from 'react-native';
import moment from 'moment';

import {getDatetime} from '@util/moment';

import {NotificationCard} from '@component/order';
import {Screens} from '@constant';
import {Colors} from '@style';

import ListOrder from './hooks/orders-hook';

const ProgressScreen = ({navigation, ...props}) => {
  const {
    orders,
    orderLoading,
    refreshOrders,
    setOrderLoading,
    getOrders,
  } = ListOrder({}, true, false);

  const STATUS = 'ongoing';

  const load = async () => {
    const response = await refreshOrders();
    navigation.setParams({
      count: (response[STATUS] || []).length,
    });
  };

  React.useEffect(() => {
    load();
  }, []);

  const onPress = (value) => {
    navigation.navigate(Screens.ORDER_DETAIL_CUSTOMER, {
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
          onRefresh={load}
        />
      }>
      <View style={{backgroundColor: 'white'}}>
        {getOrders(STATUS) &&
          getOrders(STATUS).map((order) => {
            return (
              <View key={order.id}>
                <NotificationCard
                  text={order.merchant_name}
                  description={getDatetime(order.booking_datetime)}
                  picture={
                    <Image
                      source={require('@asset/icons/menu-bar/vet-service-active/normal.png')}
                      style={{width: 36, height: 36}}
                    />
                  }
                  onPress={() => onPress(order)}
                />
                <View style={{marginVertical: 1}} />
              </View>
            );
          })}
      </View>
      <View style={{paddingVertical: 10}} />
    </ScrollView>
  );
};

ProgressScreen.navigationOptions = ({navigation, ...props}) => {
  const count = navigation.getParam('count', 0);
  const textCount = count > 0 ? ` (${count})` : '';

  return {
    title: `Dalam Proses${textCount}`,
  };
};

export default ProgressScreen;
