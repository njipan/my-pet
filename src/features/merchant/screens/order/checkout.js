import React from 'react';
import {
  TouchableOpacity,
  RefreshControl,
  ToastAndroid,
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

const CheckoutDetailScreen = ({navigation, ...props}) => {
  const paramData = navigation.getParam('data', {});
  const orderData = navigation.getParam('orderData', null);
  const paramPets = navigation.getParam('orderPets', []);
  const {
    order,
    orderLoading,
    refreshOrder,
    setOrderLoading,
    setOrder,
  } = useOrderDetail(paramData.id, orderData == null, orderData == null);

  const [orderPets, setOrderPets] = React.useState(paramPets);

  const overrideRefreshOrder = async () => {
    try {
      const response = await refreshOrder();
      setOrderPets(response.order_pets);
      setOrderLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (orderData) {
      setOrder(orderData);
      setOrderLoading(false);
      return;
    }
    overrideRefreshOrder();
  }, []);

  const onAddTreatment = (pet) => {
    navigation.navigate(Screens.ORDER_CHOOSE_TREATMENT_MERCHANT, {
      orderId: paramData.id,
      orderPetId: pet.id,
      alreadySelected:
        pet.order_pet_services.map((item) => item.merchant_service_id) || [],
      callback: overrideRefreshOrder,
    });
  };

  const updateOrderPets = (petId, services) => {
    const newPets = [...orderPets].map((item) => {
      if (item.pet_id == petId)
        return {
          ...item,
          order_pet_services: services,
        };
      return item;
    });
    setOrderPets(newPets);
  };

  const onDeleteService = async (pet, service) => {
    try {
      const body = {
        order_id: paramData.id,
        order_pet_id: pet.id,
        service_id: service.id,
      };
      await OrderService.deleteTreatment(body);
      overrideRefreshOrder();
    } catch (error) {
      console.log();
    }
    const petId = pet.pet_id;
    const petServices = (pet.order_pet_services || []).filter(
      (item) => item.merchant_service_id != service.merchant_service_id,
    );
    updateOrderPets(petId, petServices);
  };

  const onEditService = (pet, service) => {
    navigation.navigate(Screens.ORDER_EDIT_TREATMENT_MERCHANT, {
      orderId: paramData.id,
      orderPetId: pet.id,
      updateData: service,
      callback: overrideRefreshOrder,
    });
  };

  const onCompleted = () => {
    Modal.confirm({
      isLoading: true,
      onLoad: async (modalNav) => {
        try {
          const response = await OrderService.updateStatus(
            parseInt(paramData.id),
            OrderStatus.ORDER_COMPLETED,
          );
          const backToIdx =
            navigation.dangerouslyGetParent().state.routes.length - 2;
          const routeBack = navigation.dangerouslyGetParent().state.routes[
            backToIdx
          ];
          navigation.navigate(routeBack);
          navigation.navigate(Screens.ORDER_STATUS_DETAIL_MERCHANT, {
            data: {...paramData},
          });
          navigation.getParam('reloadOrders', () => {})();
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
          <TitleWithAction title="Detail Perawatan" />
          <Dash
            style={{width: '100%', marginBottom: 10, marginTop: 8}}
            dashColor={Colors.BLACK10}
            dashThickness={1}
            dashGap={4}
          />

          <Order.Treatment
            data={orderPets || []}
            petIcon={
              <Text style={{fontSize: 20, color: Colors.BLUE, marginRight: 2}}>
                +
              </Text>
            }
            onPetIconPress={onAddTreatment}
            petAliases={{
              services: 'order_pet_services',
              name: 'pet_name',
            }}
            serviceAliases={{
              name: 'service_name',
              description: 'service_description',
              price: 'service_price',
              qty: 'service_qty',
            }}
            onEditPress={onEditService}
            onDeletePress={onDeleteService}
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
      {!orderLoading ? (
        <View
          style={{
            ...Box.CONTAINER_ACTION_BOTTOM,
            backgroundColor: 'white',
            elevation: 5,
          }}>
          <ButtonFluid text="Pesanan Selesai" onPress={onCompleted} />
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

CheckoutDetailScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Pesanan',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
  };
};

export default CheckoutDetailScreen;
