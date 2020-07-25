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
import 'intl';
import 'intl/locale-data/jsonp/id';

import {ButtonFluid, Label, TreatmentCard} from '@component';
import {Screens} from '@constant';
import {PetService} from '@service';
import {Box, Colors, Typography} from '@style';

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

const CheckoutScreen = ({navigation, ...props}) => {
  const createData = navigation.getParam('createData', {});
  const merchant = navigation.getParam('merchant', {id: 1});
  const [data, setData] = React.useState(navigation.getParam('data', {}));
  const [merchants, setMerchants] = React.useState({});
  const [selectedMerchants, setSelectedMerchants] = React.useState({});

  React.useEffect(() => {
    //
  }, []);

  const onEditBooking = () => {
    alert('EDIT BOOKING');
  };

  const onBookNow = () => {
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate(Screens.ORDER_BOOKING_CHECKOUT_SUCCESS_CUSTOMER);
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
            <Label title="Nama" text="Edi Junaedi" />
            <Label title="Nomor Telepon" text="0881282818" />
            <Label title="Tanggal" text="23 Maret 2020" />
            <Label title="Waktu" text="08:00" />
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
        <View style={{...Box.SPACER_CONTAINER}} />
        <View style={{...styles.container}}>
          <TitleWithAction onPress={onEditBooking} title="Detail Pembayaran" />
          <View style={{paddingVertical: 10}} />
          <View>
            <Text style={{...Box.LABEL_TITLE, fontSize: 14, marginBottom: 10}}>
              Metode Pembayaran
            </Text>
            <Text style={{...Box.LABEL_VALUE, marginBottom: 20}}>Cash</Text>
          </View>
          <View>
            <Text style={{...Box.LABEL_TITLE, fontSize: 14, marginBottom: 10}}>
              Detail Pembayaran
            </Text>
            <FieldValue title="Suntik Rabies" text="Rp 400.000" />
            <FieldValue title="Suntik Rabies" text="Rp 400.000" />
            <FieldValue title="PPn" text="Rp 4.000" />
          </View>
          <Dash
            style={{width: '100%', marginBottom: 10, marginTop: 10}}
            dashColor={Colors.BLACK10}
            dashThickness={1}
            dashGap={4}
          />
          <FieldValue title="Total" text="Rp 804.000" bold={true} />
        </View>
      </ScrollView>
      <View style={{...Box.CONTAINER_ACTION_BOTTOM, elevation: 5}}>
        <ButtonFluid text="Booking Sekarang" onPress={onBookNow} />
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

CheckoutScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Pesanan',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
  };
};

export default CheckoutScreen;
