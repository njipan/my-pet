import React from 'react';
import {
  ToastAndroid,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/id';

import {ButtonFluid, TreatmentCard} from '@component';
import {Screens} from '@constant';
import {VetService} from '@service';
import {Box, Colors, Typography} from '@style';

const ChooseTreatementScreen = ({navigation, ...props}) => {
  const createData = navigation.getParam('createData', {});
  const createPets = createData.pets || {};
  const petId = navigation.getParam('petId', {});
  const petName = navigation.getParam('petName', {});

  const [merchant, setMerchant] = React.useState({});
  const [selectedMerchants, setSelectedMerchants] = React.useState({});
  const [cart, setCart] = React.useState({});

  const getMerchant = async () => {
    try {
      const response = await VetService.get(createData.merchant_id);
      setMerchant(response);
      const pet = createPets[petId];
      const tempMerchants = pet
        ? pet.services.reduce((res, item) => {
            return {...res, [item.merchant_service_id]: item};
          }, {})
        : {};
      setSelectedMerchants(tempMerchants);
      updateCart(tempMerchants);
    } catch (error) {}
  };

  React.useEffect(() => {
    getMerchant();
  }, []);

  const updateCart = (value) => {
    setTimeout(() => {
      const amount = Object.values(value).reduce(
        (res, item) => res + item.service_price,
        0,
      );
      setCart({
        amount,
        count: Object.keys(value).length,
      });
    }, 0);
  };

  const onTreatmentSelect = (value) => {
    const temp = selectedMerchants || {};

    if (!selectedMerchants[`${value.id}`] == false) delete temp[`${value.id}`];
    else
      temp[`${value.id}`] = {
        merchant_service_id: value.id,
        service_name: value.name,
        service_description: value.description,
        service_price: value.price,
        service_qty: 1,
      };
    setSelectedMerchants({...temp});
    updateCart(temp);
  };

  const onAddToCart = () => {
    if (Object.keys(selectedMerchants).length < 1) {
      ToastAndroid.show('Perawatan harus dipilih!', ToastAndroid.LONG);
      return;
    }

    navigation.pop(navigation.dangerouslyGetParent().state.routes.length - 2);
    const body = {
      ...createData,
      pets: {
        ...createPets,
        [petId]: {
          id: petId,
          name: petName,
          services: Object.values(selectedMerchants),
        },
      },
    };

    navigation.push(Screens.ORDER_BOOKING_CHECKOUT_CUSTOMER, {
      createData: body,
      callbackChooseTreatment: (pet) => {
        const tempMerchants = pet
          ? pet.services.reduce((res, item) => {
              return {...res, [item.merchant_service_id]: item};
            }, {})
          : {};
        setSelectedMerchants(tempMerchants);
      },
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView>
          <View style={{padding: 16, backgroundColor: 'white'}}>
            <Text
              style={{
                fontFamily: Typography.FONT_FAMILY_REGULAR,
                fontWeight: 'bold',
                fontSize: 18,
                marginBottom: 14,
              }}>
              {merchant.user?.full_name}
            </Text>
            <View style={{backgroundColor: 'white'}}>
              {merchant.merchantServices &&
                merchant.merchantServices.map((item, key) => (
                  <TouchableWithoutFeedback
                    onPress={() => onTreatmentSelect(item)}
                    underlayColor="white">
                    <View style={{backgroundColor: 'white'}}>
                      <TreatmentCard
                        name={item.name}
                        price={`Rp${new Intl.NumberFormat(['id']).format(
                          item.price || 0,
                        )}`}
                        description={item.description}
                        icon={
                          selectedMerchants[`${item.id}`] ? (
                            <Image
                              style={{width: 26, height: 26}}
                              source={require('@asset/icons/order/success/normal.png')}
                            />
                          ) : null
                        }
                      />
                    </View>
                  </TouchableWithoutFeedback>
                ))}
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 20,
          paddingBottom: 8,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Image
            source={require('@asset/icons/cart-yellow/large.png')}
            style={{width: 52, height: 52}}
          />
        </View>
        <View style={{justifyContent: 'center', marginLeft: 14}}>
          <Text
            style={{color: Colors.LIGHT_GREY, marginBottom: 4, fontSize: 13}}>
            Total {cart.count || 0} Items
          </Text>
          <Text
            style={{
              fontFamily: Typography.FONT_FAMILY_REGULAR,
              fontWeight: '700',
              fontSize: 16,
            }}>
            Rp
            {new Intl.NumberFormat(['id']).format(cart.amount || 0)}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row-reverse',
          }}>
          <View style={{flexDirection: 'row-reverse'}}>
            <ButtonFluid
              text="Tambahkan ke Keranjang"
              styleContainer={{
                paddingLeft: 10,
                paddingRight: 10,
                width: '100%',
              }}
              styleRoot={{width: 156}}
              fullWidth={false}
              onPress={onAddToCart}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

ChooseTreatementScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Pilih Perawatan',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
  };
};

export default ChooseTreatementScreen;
