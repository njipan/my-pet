import React from 'react';
import {
  TouchableOpacity,
  ToastAndroid,
  RefreshControl,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import Dash from 'react-native-dash';
import moment from 'moment';
import 'intl';
import 'intl/locale-data/jsonp/id';

import {ButtonFluid, Label, TreatmentCard} from '@component';
import * as Order from '@component/order';
import * as Transformer from '@util/transformer';
import {Screens, OrderStatus} from '@constant';
import {OrderService} from '@service';
import {Box, Colors, Typography} from '@style';
import * as Modal from '@util/modal';

import useOrderDetail from '@shared/hooks/order-detail-hook';

export const TitleWithAction = (props) => {
  const {
    styleText = {},
    fontSize = 18,
    title = null,
    actionIcon = null,
    onPress = () => {},
  } = props;

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{justifyContent: 'center', flex: 1}}>
        <Text
          style={{
            ...Box.LABEL_TITLE,
            color: Colors.REGULAR,
            fontSize,
            ...styleText,
          }}>
          {title}
        </Text>
      </View>
      {actionIcon ? (
        <View style={{justifyContent: 'center'}}>
          <TouchableOpacity onPress={onPress}>{actionIcon}</TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export const FieldValue = (props) => {
  const {title = null, text = null, bold = false, fontSize = 14} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
      }}>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontFamily: bold
              ? Typography.FONT_FAMILY_REGULAR
              : Typography.FONT_FAMILY_MEDIUM,
            fontWeight: bold ? 'bold' : 'normal',
            fontSize,
          }}>
          {title}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: bold
            ? Typography.FONT_FAMILY_REGULAR
            : Typography.FONT_FAMILY_MEDIUM,
          fontWeight: bold ? 'bold' : 'normal',
          fontSize,
        }}>
        {text}
      </Text>
    </View>
  );
};

const IncomingDetailScreen = ({navigation, ...props}) => {
  const paramData = navigation.getParam('data', {});
  const {order, orderLoading, refreshOrder} = useOrderDetail(paramData.id);

  const onAccept = () => {
    Modal.confirm({
      isLoading: true,
      onLoad: async (modalNav) => {
        try {
          const response = await OrderService.updateStatus(
            parseInt(paramData.id),
            OrderStatus.MERCHANT_APPROVED,
          );
          const backToIdx =
            navigation.dangerouslyGetParent().state.routes.length - 2;
          const routeBack = navigation.dangerouslyGetParent().state.routes[
            backToIdx
          ];
          navigation.navigate(routeBack);
          navigation.navigate(Screens.ORDER_ON_PROGRESS_DETAIL_MERCHANT, {
            data: {...paramData},
            orderData: order,
          });
          navigation.getParam('callback', () => {})();
        } catch (error) {
          modalNav.goBack(null);
          console.log(error);
        }
      },
    });
  };

  const onReject = () => {
    Modal.confirm({
      isLoading: true,
      onLoad: async (modalNav) => {
        try {
          // const response = await OrderService.updateStatus(
          //   parseInt(paramData.id),
          //   OrderStatus.MERCHANT_REJECTED,
          // );
          const backToIdx =
            navigation.dangerouslyGetParent().state.routes.length - 2;
          const routeBack = navigation.dangerouslyGetParent().state.routes[
            backToIdx
          ];
          navigation.navigate(routeBack);
          navigation.navigate(Screens.ORDER_STATUS_DETAIL_MERCHANT, {
            data: {...paramData},
            createOrder: order,
          });
          navigation.getParam('callback', () => {})();
        } catch (error) {
          modalNav.goBack(null);
          ToastAndroid.show('Terjadi Kesalahan', ToastAndroid.LONG);
        }
      },
    });
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={orderLoading}
            colors={Colors.REFRESH_CONTROL_SECONDARY}
          />
        }>
        <View>
          <View style={{...styles.container}}>
            <TitleWithAction
              onPress={() => {}}
              fontSize={14}
              title="Detail Pemesan"
            />
            <View>
              <Label title="Nama" text={paramData.fullName} />
              <Label title="Nomor Telepon" text={paramData.phone} />
              <Label
                title="Tanggal"
                text={moment(paramData.bookingDatetime).format('DD MMMM YYYY')}
              />
              <Label
                title="Waktu"
                styleText={{textTransform: 'none'}}
                text={moment(paramData.bookingDatetime)
                  .locale('en')
                  .format('HH:mm A')}
              />
            </View>
          </View>
          <View style={{...Box.SPACER_CONTAINER}} />
          <View style={{...styles.container}}>
            <TitleWithAction onPress={() => {}} title="Detail Perawatan" />
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
                description: 'service_description',
                price: 'service_price',
              }}
              action={false}
            />
          </View>
          <View>
            <View style={{...Box.SPACER_CONTAINER}} />
            <View style={{...styles.container, marginBottom: 40}}>
              <TitleWithAction title="Detail Pembayaran" />
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
          </View>
        </View>
      </ScrollView>
      {!orderLoading ? (
        <View style={{elevation: 5, padding: 20, backgroundColor: 'white'}}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontFamily: Typography.FONT_FAMILY_BOLD,
              marginBottom: 20,
            }}>
            Apakah pesanan ini bisa diproses?
          </Text>
          <ButtonFluid
            text="Terima"
            styleText={{
              fontFamily: Typography.FONT_FAMILY_BOLD,
            }}
            onPress={onAccept}
          />
          <ButtonFluid
            styleContainer={{backgroundColor: 'white'}}
            styleText={{
              color: Colors.REGULAR,
              fontFamily: Typography.FONT_FAMILY_BOLD,
            }}
            text="Tidak"
            onPress={onReject}
          />
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

IncomingDetailScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Pesanan Baru',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
  };
};

export default IncomingDetailScreen;
