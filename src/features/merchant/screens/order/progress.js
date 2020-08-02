import React from 'react';
import {
  Image,
  StatusBar,
  Text,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import moment from 'moment';

import {NotificationCard} from '@component/order';
import * as Transformer from '@util/transformer';
import {getDatetime} from '@util/moment';
import {Screens, OrderStatus} from '@constant';
import {Colors, Typography} from '@style';

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
    const didFocus = navigation.addListener('didFocus', (payload) => {
      load();
    });

    return () => {
      didFocus.remove();
    };
  }, []);

  const onPress = (value) => {
    navigation.navigate(
      value.status == OrderStatus.CUSTOMER_ON_PROGRESS
        ? Screens.ORDER_CHECKOUT_DETAIL_MERCHANT
        : Screens.ORDER_ON_PROGRESS_DETAIL_MERCHANT,
      {
        data: Transformer.keysToCamel(value),
        reloadOrders: load,
      },
    );
  };

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
            onRefresh={load}
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
    </View>
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
