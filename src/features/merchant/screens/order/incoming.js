import React from 'react';
import {
  Text,
  StatusBar,
  Image,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';

import {getDatetime} from '@util/moment';
import * as Transformer from '@util/transformer';

import {NotificationCard} from '@component/order';
import {Colors, Typography} from '@style';

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
    const didFocus = navigation.addListener('didFocus', (payload) => {
      load();
    });

    return () => {
      didFocus.remove();
    };
  }, []);

  const onPress = (value) => {
    navigation.navigate(Screens.ORDER_COMING_DETAIL_MERCHANT, {
      data: Transformer.keysToCamel(value),
      callback: load,
    });
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
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            height: '100%',
          }}>
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

IncomingScreen.navigationOptions = ({navigation, ...props}) => {
  const count = navigation.getParam('count', 0);
  const textCount = count > 0 ? ` (${count})` : '';

  return {
    title: `Terbaru${textCount}`,
  };
};

export default IncomingScreen;
