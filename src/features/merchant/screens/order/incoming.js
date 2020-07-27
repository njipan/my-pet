import React from 'react';
import {Image, Text, RefreshControl, ScrollView, View} from 'react-native';
import moment from 'moment';

import {getDatetime} from '@util/moment';
import * as Transformer from '@util/transformer';

import {NotificationCard} from '@component/order';
import {Screens} from '@constant';
import {Colors} from '@style';

import ListOrder from './hooks/orders-hook';

const IncomingScreen = ({navigation, ...props}) => {
  const {
    orders,
    orderLoading,
    refreshOrders,
    setOrderLoading,
    getOrders,
  } = ListOrder({}, true, false);

  const STATUS = 'incoming';

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
    navigation.navigate(Screens.ORDER_COMING_DETAIL_MERCHANT, {
      data: Transformer.keysToCamel(value),
      callback: load,
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
                  text={order.full_name}
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
    </ScrollView>
  );
};

IncomingScreen.navigationOptions = ({navigation, ...props}) => {
  const count = navigation.getParam('count', 0);
  const textCount = count > 0 ? ` (${count})` : '';

  return {
    title: `Terbaru${textCount}`,
  };
};

export default IncomingScreen;
