import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Dash from 'react-native-dash';
import moment from 'moment';

import {useOrderDetail} from '@shared/hooks';

import {ButtonFluid, TextInput} from '@component';
import RateStar from '@component/rate-star';
import * as Order from '@component/order';
import {Box, Colors, Typography} from '@style';

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

  const {order, orderLoading} = useOrderDetail(params.id, true, true);
  const [reviewing, setReviewing] = React.useState(false);
  const [review, setReview] = React.useState({});

  const [data, setData] = React.useState(navigation.getParam('data', {}));

  React.useEffect(() => {}, []);

  const getStarValue = (v) => {
    return v.reviews ? v.reviews.find((item) => item.order_id == v.id) : {};
  };

  const onEditBooking = () => {
    alert('EDIT BOOKING');
  };

  const onReview = () => {
    if (!reviewing) {
      setReviewing(true);
      navigation.setParams({title: 'Penilaian'});
      return;
    }
    alert(JSON.stringify(review));
    // alert('Fitur ini belum tersedia!');
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
      <ScrollView>
        <View style={{...styles.container}}>
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
            onEditPress={() => alert('edit pressed')}
            onDeletePress={() => alert('delete pressed')}
          />
        </View>

        {!reviewing ? (
          <View>
            <View style={{...Box.SPACER_CONTAINER}} />
            <View style={{...styles.container, marginBottom: 40}}>
              <TitleWithAction
                onPress={onEditBooking}
                title="Detail Pembayaran"
              />
              <View style={{paddingVertical: 10}} />
              <Order.PaymentInfo
                done
                method="Cash"
                total={`Rp ${new Intl.NumberFormat(['id']).format(
                  order.amount || 0,
                )}`}
                serviceAliases={{
                  price: 'amount',
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
              onTextChange={(value) =>
                setReview({...review, description: value})
              }
            />
          </View>
        )}
      </ScrollView>

      {!getStarValue(order).rating ? (
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
