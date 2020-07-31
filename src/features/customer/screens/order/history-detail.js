import React from 'react';
import {
  TouchableOpacity,
  Image,
  RefreshControl,
  StyleSheet,
  ScrollView,
  Text,
  View,
  ToastAndroid,
} from 'react-native';
import Dash from 'react-native-dash';
import moment from 'moment';

import {useOrderDetail} from '@shared/hooks';

import {OrderService} from '@service';
import {ButtonFluid, TextInput} from '@component';
import RateStar from '@component/rate-star';
import * as Order from '@component/order';
import * as Modal from '@util/modal';
import {Box, Colors, Typography} from '@style';
import {OrderStatus} from '@constant';

const TitleWithAction = (props) => {
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

const HistoryDetailScreen = ({navigation, ...props}) => {
  const params = navigation.state.params || {};

  const {order, orderLoading, refreshOrder} = useOrderDetail(
    params.id,
    true,
    true,
  );
  const [reviewing, setReviewing] = React.useState(false);
  const [review, setReview] = React.useState({});

  const [data, setData] = React.useState(navigation.getParam('data', {}));

  React.useEffect(() => {}, []);

  const getStarValue = (v) => {
    if (!v.reviews) return {};
    return Object.keys(v.reviews).length > 0
      ? v.reviews.find((item) => item.order_id == v.id)
      : {};
  };

  const onReview = () => {
    if (!reviewing) {
      setReviewing(true);
      navigation.setParams({title: 'Penilaian'});
      return;
    }
    Modal.confirm({
      isLoading: true,
      onLoad: async (modalNav) => {
        modalNav.goBack(null);
        try {
          const body = {
            ...review,
            order_id: parseInt(params.id),
          };
          const response = await OrderService.createRating(body);
          setReviewing(false);
          navigation.setParams({title: 'Riwayat'});
          ToastAndroid.show('Penilaian berhasil disimpan!', ToastAndroid.LONG);
          refreshOrder();
        } catch (err) {
          console.log(err.response.data);
        }
      },
    });
  };

  const onRatingPress = (value) => {
    setReview({...review, rating: value});
  };

  const getDatetime = () => {
    const date = moment(data.bookingDatetime || params.bookingDatetime);
    if (!date.isValid()) return null;

    return `${date
      .locale('id')
      .format('dddd, DD MMMM YYYY HH:MM')} ${date.locale('en').format('A')}`;
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={orderLoading}
            colors={Colors.REFRESH_CONTROL_SECONDARY}
            onRefresh={refreshOrder}
          />
        }>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            marginTop: 20,
          }}>
          {order.status == OrderStatus.MERCHANT_REJECTED && (
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
          style={{width: '100%', marginBottom: 10, marginTop: 20}}
          dashColor={Colors.BLACK10}
          dashThickness={1}
          dashGap={4}
        />
        <View style={{...styles.container, marginTop: -10}}>
          <Order.Info
            name={params.merchantName}
            booking={params.id}
            date={getDatetime()}
            starValue={getStarValue(order).rating}
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
            data={order.order_pets}
            petAliases={{
              name: 'pet_name',
              note: 'pet_note',
              services: 'order_pet_services',
            }}
            serviceAliases={{
              name: 'service_name',
              description: 'service_description',
              price: 'service_price',
            }}
            action={false}
          />
        </View>
        {!reviewing ? (
          <View>
            <View style={{...Box.SPACER_CONTAINER}} />
            <View style={{...styles.container, marginBottom: 40}}>
              <TitleWithAction onPress={() => {}} title="Detail Pembayaran" />
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
        ) : (
          <View style={{paddingBottom: 28, paddingLeft: 20, paddingRight: 20}}>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: Typography.FONT_FAMILY_BOLD,
                  fontSize: 20,
                  marginBottom: 20,
                }}>
                Beri Rating Pelayanan
              </Text>
            </View>
            <RateStar value={review.rating} onPress={onRatingPress} />
            <Text
              style={{
                ...Box.LABEL_VALUE,
                fontSize: 16,
                color: Colors.LIGHT_GREY,
                marginTop: 8,
              }}>
              Komentar
            </Text>
            <TextInput
              style={{marginTop: 6, height: 100}}
              placeholder="Berikan komentar"
              styleText={{fontSize: 16}}
              multiline
              value={review.description}
              onChangeText={(value) =>
                setReview({...review, description: value})
              }
            />
          </View>
        )}
      </ScrollView>

      {!getStarValue(order).rating &&
      order.status == OrderStatus.ORDER_COMPLETED ? (
        <View
          style={{
            ...Box.CONTAINER_ACTION_BOTTOM,
            height: 72,
            backgroundColor: 'white',
            elevation: 10,
          }}>
          <ButtonFluid text="Beri Ulasan" onPress={onReview} />
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

HistoryDetailScreen.navigationOptions = ({navigation}) => {
  return {
    title: navigation.getParam('title', 'Riwayat'),
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
  };
};

export default HistoryDetailScreen;
