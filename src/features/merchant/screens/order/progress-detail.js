import React from 'react';
import {
  TouchableOpacity,
  ToastAndroid,
  Image,
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

import {OrderService} from '@service';
import {ButtonFluid, Label, TreatmentCard} from '@component';
import * as Order from '@component/order';
import * as Transformer from '@util/transformer';
import {Screens, OrderStatus} from '@constant';
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

const ProgressDetailScreen = ({navigation, ...props}) => {
  const paramData = navigation.getParam('data', {});
  const orderData = navigation.getParam('orderData', null);
  const {
    order,
    orderLoading,
    setOrderLoading,
    refreshOrder,
    setOrder,
  } = useOrderDetail(paramData.id, orderData != null, orderData == null);

  React.useEffect(() => {
    if (orderData) {
      setOrder(orderData);
      setOrderLoading(false);
      return;
    }
  }, []);

  const onProgress = () => {
    Modal.confirm({
      isLoading: true,
      onLoad: async (modalNav) => {
        try {
          const response = await OrderService.updateStatus(
            parseInt(paramData.id),
            OrderStatus.CUSTOMER_ON_PROGRESS,
          );
          const backToIdx =
            navigation.dangerouslyGetParent().state.routes.length - 2;
          const routeBack = navigation.dangerouslyGetParent().state.routes[
            backToIdx
          ];
          navigation.navigate(routeBack);
          navigation.navigate(Screens.ORDER_CHECKOUT_DETAIL_MERCHANT, {
            data: {...paramData},
            orderData: order,
            orderPets: order.order_pets,
          });
        } catch (error) {
          modalNav.goBack(null);
          ToastAndroid.show('Terjadi Kesalahan', ToastAndroid.LONG);
        }
      },
    });
  };

  const editTreatment = (pet, value) => {
    console.log(pet);
    console.log(value);
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
            onEditPress={editTreatment}
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
      </ScrollView>
      <View
        style={{
          ...Box.CONTAINER_ACTION_BOTTOM,
          height: 132,
          backgroundColor: 'white',
          elevation: 5,
        }}>
        <ButtonFluid text="Proses Pesanan" onPress={onProgress} />
        <ButtonFluid
          text="Chat via Whatsapp"
          onPress={() => {}}
          styleContainer={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderColor: Colors.PRIMARY,
            borderWidth: 1,
          }}
          styleText={{
            color: Colors.PRIMARY,
          }}
          iconLeft={
            <Image
              source={require('@asset/icons/social/whatsapp-outline/normal.png')}
              style={{width: 24, height: 24, marginRight: 10}}
            />
          }
        />
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

ProgressDetailScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Pesanan Baru',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
  };
};

export default ProgressDetailScreen;
