import React from 'react';
import {
  TouchableOpacity,
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
import {PetService} from '@service';
import {Box, Colors, Typography} from '@style';

const ChooseTreatementScreen = ({navigation, ...props}) => {
  const createData = navigation.getParam('createData', {});
  const merchant = navigation.getParam('merchant', {id: 1});
  const [data, setData] = React.useState(navigation.getParam('data', {}));
  const [merchants, setMerchants] = React.useState({});
  const [selectedMerchants, setSelectedMerchants] = React.useState({});

  const dummyServices = [
    {
      id: 1,
      name: 'Suntik Vaksin',
      price: '20000',
      description: 'sadf dsaf asfdsa f',
    },
    {
      id: 11,
      name: 'Suntik Rabies',
      price: '1000',
      description: 'sadf dsaf asfdsa f',
    },
    {
      id: 12,
      name: 'Suntik Vitamin',
      price: '21000',
      description: 'sadf dsaf asfdsa f',
    },
  ];

  React.useEffect(() => {
    setMerchants(
      dummyServices.reduce((res, item) => {
        return {...res, [`${item.id}`]: item};
      }, {}),
    );
  }, []);

  const onTreatmentSelect = (value) => {
    const temp = selectedMerchants;
    if (!selectedMerchants[`${value.id}`] == false) delete temp[`${value.id}`];
    else temp[`${value.id}`] = value;
    setSelectedMerchants({...temp});
  };

  const onAddToCard = () => {
    console.log(selectedMerchants);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={{padding: 16}}>
            <Text
              style={{
                fontFamily: Typography.FONT_FAMILY_REGULAR,
                fontWeight: 'bold',
                fontSize: 18,
                marginBottom: 14,
              }}>
              {createData.name}
            </Text>
            <View>
              {Object.keys(merchants).length > 0 &&
                Object.values(merchants).map((item, key) => (
                  <TouchableWithoutFeedback
                    onPress={() => onTreatmentSelect(item)}
                    underlayColor="white">
                    <View style={{backgroundColor: 'white'}}>
                      <TreatmentCard
                        key={key}
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
          <Text style={{color: Colors.LIGHT_GREY, marginBottom: 4}}>
            Total 2 Items
          </Text>
          <Text
            style={{
              fontFamily: Typography.FONT_FAMILY_REGULAR,
              fontWeight: '700',
              fontSize: 18,
            }}>
            Rp500.000
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
              styleRoot={{width: '85%'}}
              fullWidth={false}
              onPress={onAddToCard}
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
