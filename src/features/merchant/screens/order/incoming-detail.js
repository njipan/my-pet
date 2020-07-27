import React from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
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

  const onEditBooking = () => {
    alert('EDIT BOOKING');
  };

  const onAccept = () => {
    Modal.confirm({
      isLoading: true,
      onLoad: async (modalNav) => {
        try {
          const response = await OrderService.updateStatus(
            parseInt(paramData.id),
            OrderStatus.MERCHANT_APPROVED,
          );
          modalNav.dispatch(StackActions.popToTop());
          modalNav.navigate(Screens.ORDER_ON_PROGRESS_MERCHANT);
          navigation.getParam('callback', () => {})();
        } catch (error) {
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
          const response = await OrderService.updateStatus(
            parseInt(paramData.id),
            OrderStatus.MERCHANT_REJECTED,
          );
          console.log(response);
          modalNav.dispatch(StackActions.popToTop());
          modalNav.navigate(Screens.ORDER_HISTORY_MERCHANT);
        } catch (error) {}
      },
    });
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={{...styles.container}}>
          <TitleWithAction
            onPress={onEditBooking}
            fontSize={14}
            title="Detail Pemesan"
            actionIcon={
              <Image
                source={require('@asset/icons/pencil/blue/normal.png')}
                style={{width: 20, height: 20}}
              />
            }
          />
          <View>
            <Label title="Nama" text={paramData.fullName} />
            <Label title="Nomor Telepon" text="0881282818 - D" />
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
          <TitleWithAction
            onPress={onEditBooking}
            title="Detail Perawatan"
            actionIcon={
              <Image
                source={require('@asset/icons/form/plus-blue/normal.png')}
                style={{width: 20, height: 20}}
              />
            }
          />
          <Dash
            style={{width: '100%', marginBottom: 10, marginTop: 8}}
            dashColor={Colors.BLACK10}
            dashThickness={1}
            dashGap={4}
          />
          <View>
            {[0, 0].map((pet, petIdx) => (
              <View style={{marginBottom: 16}}>
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    fontFamily: Typography.FONT_FAMILY_REGULAR,
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: Colors.REGULAR,
                  }}>
                  Peliharaan {petIdx + 1}
                </Text>

                {[0, 0].map((treatment) => (
                  <View style={{...styles.treatmentItemContainer}}>
                    <FieldValue title="Suntik Rabies" text="1x" bold />
                    <Text
                      style={{
                        fontFamily: Typography.FONT_FAMILY_MEDIUM,
                        fontSize: 14,
                        color: Colors.LIGHT_GREY,
                        marginTop: -4,
                      }}>
                      Anjing dan Kucing
                    </Text>
                    <View style={{flexDirection: 'row', marginTop: 4}}>
                      <View style={{flex: 1}}>
                        <Text
                          style={{
                            fontFamily: Typography.FONT_FAMILY_MEDIUM,
                            fontSize: 14,
                            color: Colors.REGULAR,
                          }}>
                          Rp 400.000
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                          style={{marginRight: 20}}
                          onPress={() => alert('UBAH')}>
                          <Text style={{color: Colors.BLUE}}>Ubah</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => alert('APUS')}>
                          <Text style={{color: Colors.DANGER}}>Hapus</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
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
                price: 'amount',
              }}
              data={Object.values(order.summary || [])}
            />
          </View>
        </View>
      </ScrollView>
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
    title: 'Detail',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
  };
};

export default IncomingDetailScreen;
