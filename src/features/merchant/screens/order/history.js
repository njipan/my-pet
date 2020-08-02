import React from 'react';
import {
  Image,
  StatusBar,
  RefreshControl,
  Text,
  ScrollView,
  View,
} from 'react-native';
import moment from 'moment';

import {NotificationItem} from '@component/order';
import {Screens, OrderStatus} from '@constant';

import * as Transformer from '@util/transformer';
import ListOrder from './hooks/orders-hook';

import {Colors, Typography} from '@style';

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
    let screenName = Screens.ORDER_HISTORY_DETAIL_MERCHANT;
    if (value.status == OrderStatus.MERCHANT_REJECTED)
      screenName = Screens.ORDER_STATUS_DETAIL_MERCHANT;

    navigation.navigate(screenName, {
      data: Transformer.keysToCamel(value),
    });
  };

  React.useEffect(() => {
    const didFocus = navigation.addListener('didFocus', (payload) => {
      refreshOrders();
    });

    return () => {
      didFocus.remove();
    };
  });

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView
        style={{
          padding: 16,
          overflow: getOrders(STATUS).length < 1 ? 'scroll' : 'visible',
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={Colors.REFRESH_CONTROL_PRIMARY}
            refreshing={orderLoading}
            onRefresh={refreshOrders}
          />
        }>
        {getOrders(STATUS).length < 1 && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 64,
            }}>
            <Image
              style={{width: 280, height: 280}}
              source={require('@asset/images/illustrations/order-empty.png')}
            />
            <Text
              style={{
                ...Typography.ERROR_HANDLER_TITLE,
              }}>
              Tidak Ada Pesanan
            </Text>
            <Text
              style={{
                ...Typography.ERROR_HANDLER_DESCRIPTION,
              }}>
              Tidak ada yang kamu pesan
            </Text>
          </View>
        )}
        <View style={{backgroundColor: 'white'}}>
          {getOrders(STATUS) &&
            getOrders(STATUS).map((order) => (
              <View key={order.id}>
                <NotificationItem
                  done={OrderStatus.ORDER_COMPLETED == order.status}
                  onPress={() => onPress(order)}
                  text={order.full_name}
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
    </View>
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
