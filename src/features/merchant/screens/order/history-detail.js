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

import {useAuth} from '@shared/hooks';
import {Label, TextInput} from '@component';
import RateStar from '@component/rate-star';
import {getDatetime} from '@util/moment';
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

const HistoryDetailScreen = ({navigation, ...props}) => {
  const paramData = navigation.getParam('data', {});
  const {order, orderLoading, refreshOrder} = useOrderDetail(paramData.id);
  const {user} = useAuth();

  React.useEffect(() => {
    (async () => {
      await refreshOrder();
    })();
  }, []);

  const getReview = () => {
    if (!Array.isArray(order.reviews)) return {};
    return (
      (order.reviews || []).find((item) => item.order_id == paramData.id) || {}
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView refreshControl={<RefreshControl refreshing={orderLoading} />}>
        {!orderLoading ? (
          <View>
            <View style={{marginVertical: 20}}>
              <Order.Info
                name={user.full_name}
                booking={order.id || paramData.id}
              />
              <View style={{marginVertical: 14, paddingHorizontal: 20}}>
                <RateStar value={getReview().rating} editable={false} />
                {getReview().description ? (
                  <TextInput
                    style={{marginTop: 28, height: 100}}
                    styleText={{fontSize: 16}}
                    multiline
                    value={getReview().description}
                    editable={false}
                  />
                ) : null}
              </View>
            </View>
            <View style={{...styles.container, marginTop: -20}}>
              <TitleWithAction
                onPress={() => {}}
                fontSize={14}
                title="Detail Pemesan"
              />
              <View>
                <Label
                  title="Nama"
                  text={paramData.fullName}
                  styleRoot={{borderBottomWidth: 0, marginBottom: -10}}
                />
                <Label
                  title="Nomor Telepon"
                  text={paramData.phone}
                  styleRoot={{borderBottomWidth: 0, marginBottom: -10}}
                />
                <Label
                  styleText={{textTransform: 'none'}}
                  title="Tanggal"
                  styleRoot={{borderBottomWidth: 0}}
                  text={getDatetime(paramData.bookingDatetime)}
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
                  qty: 'service_qty',
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
        ) : null}
      </ScrollView>
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
    title: 'Riwayat',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
  };
};

export default HistoryDetailScreen;
