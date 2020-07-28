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

import {ButtonFluid, Label, TreatmentCard} from '@component';
import {Screens} from '@constant';
import {AuthService, OrderService} from '@service';
import * as Modal from '@util/modal';
import {Box, Colors, Typography} from '@style';
import {toNumberFormat} from '@util/transformer';

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
  const [user, setUser] = React.useState({});
  const [data, setData] = React.useState(createData);
  const [summary, setSummary] = React.useState([]);

  const load = async () => {
    try {
      setUser(await AuthService.getUser());
    } catch (err) {}
  };

  React.useEffect(() => {
    load();
    calculateSummary();
  }, []);

  const onEditBooking = () => {
    navigation.navigate(Screens.ORDER_BOOKING_DETAIL_CUSTOMER, {
      createData: data,
      savedState: navigation.state,
    });
  };

  const onEditTreatment = (pet) => {
    navigation.getParam('callbackChooseTreatment', () => {})(pet);
    navigation.navigate(Screens.ORDER_BOOKING_CHOOSE_TREATMENT_CUSTOMER, {
      createData: {...data},
      savedState: navigation.state,
      petId: pet.id,
      petName: pet.name,
    });
  };

  const onDeleteTreatment = (pet, service) => {
    const services = pet.services.filter(
      (item) => item.merchant_service_id != service.merchant_service_id,
    );
    const temp = {...data};
    if (services.length < 1) {
      delete temp.pets[pet.id];
    } else {
      temp.pets[pet.id].services = services;
    }
    setData(temp);
    calculateSummary();
  };

  const onAddPet = () => {
    navigation.push(Screens.ORDER_BOOKING_CHOOSE_PET_CUSTOMER, {
      createData: {...data},
      savedState: navigation.state,
      callback: (value) => setData(value),
    });
  };

  const onBookNow = async () => {
    const body = {
      merchant_id: data.merchant_id,
      booking_datetime: data.bookingDatetime,
      pets: Object.values(data.pets),
    };
    Modal.confirm({
      isLoading: true,
      onLoad: async (modalNav) => {
        let orderData = null;
        try {
          orderData = await OrderService.create(body);
        } catch (err) {
          console.log(err);
        }
        try {
          const backToIdx =
            navigation.dangerouslyGetParent().state.routes.length - 2;
          const routeBack = navigation.dangerouslyGetParent().state.routes[
            backToIdx
          ];
          navigation.navigate(routeBack);
        } catch (err) {
          navigation.popToTop();
        }
        navigation.push(Screens.ORDER_BOOKING_CHECKOUT_SUCCESS_CUSTOMER, {
          orderData,
          createData: {...data},
        });
      },
    });
  };

  const calculateSummary = () => {
    const tempServices = {};
    const pets = Object.values(data.pets);
    for (const pet of pets) {
      for (const service of pet.services) {
        const tempService = tempServices[service.merchant_service_id] || {};
        const qty = (tempService.qty || 0) + service.service_qty;
        const price = (tempService.price || 0) + service.service_price;
        const amount = (tempService.amount || 0) + qty * price;
        tempServices[service.merchant_service_id] = {
          qty,
          price,
          amount,
          name: service.service_name,
        };
      }
    }
    const services = Object.values(tempServices);
    const amountBefore = Math.ceil(
      (services.reduce((res, item) => item.amount + res, 0) || 0) * 0.1,
    );
    services.push({name: 'PPn', price: amountBefore, amount: amountBefore});
    const amount = services.reduce((res, item) => item.amount + res, 0);

    setSummary({
      amount,
      services,
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
            <Label title="Nama" text={user.full_name} />
            <Label title="Nomor Telepon" text={user.phone} />
            <Label
              title="Tanggal"
              text={data.bookingDatetime.locale('id').format('DD MMMM YYYY')}
            />
            <Label
              title="Waktu"
              styleText={{textTransform: 'uppercase'}}
              text={data.bookingDatetime.locale('en').format('HH:mm A')}
            />
          </View>
        </View>
        <View style={{...Box.SPACER_CONTAINER}} />
        <View style={{...styles.container}}>
          <TitleWithAction
            onPress={onAddPet}
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
            {Object.values(createData.pets).map((pet, petIdx) => (
              <View style={{marginBottom: 16}}>
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    fontFamily: Typography.FONT_FAMILY_REGULAR,
                    fontWeight: 'bold',
                    fontSize: 16,
                    color: Colors.REGULAR,
                  }}>
                  {pet.name}
                </Text>

                {pet.services &&
                  pet.services.map((service) => (
                    <View style={{...styles.treatmentItemContainer}}>
                      <FieldValue
                        title={service.service_name}
                        text={`${service.service_qty}x`}
                        bold
                      />
                      <Text
                        style={{
                          fontFamily: Typography.FONT_FAMILY_MEDIUM,
                          fontSize: 14,
                          color: Colors.LIGHT_GREY,
                          marginTop: -4,
                        }}>
                        {service.service_description}
                      </Text>
                      <View style={{flexDirection: 'row', marginTop: 4}}>
                        <View style={{flex: 1}}>
                          <Text
                            style={{
                              fontFamily: Typography.FONT_FAMILY_MEDIUM,
                              fontSize: 14,
                              color: Colors.REGULAR,
                            }}>
                            {toNumberFormat(service.service_price)}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <TouchableOpacity
                            style={{marginRight: 20}}
                            onPress={() => onEditTreatment(pet)}>
                            <Text style={{color: Colors.BLUE}}>Ubah</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => onDeleteTreatment(pet, service)}>
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
            {summary.services &&
              summary.services.map((item) => (
                <FieldValue
                  title={item.name}
                  text={toNumberFormat(item.price)}
                />
              ))}
          </View>
          <Dash
            style={{width: '100%', marginBottom: 10, marginTop: 10}}
            dashColor={Colors.BLACK10}
            dashThickness={1}
            dashGap={4}
          />
          <FieldValue
            title="Total"
            text={toNumberFormat(summary.amount)}
            bold={true}
          />
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
