import React from 'react';
import {TouchableOpacity, Image, ScrollView, Text, View} from 'react-native';

import {ButtonFluid, TextInput} from '@component';
import {Screens} from '@constant';
import {PetService} from '@service';
import {Box, Colors, Typography} from '@style';

const ChooseTreatementScreen = ({navigation, ...props}) => {
  const createData = navigation.getParam('createData', {});
  console.log(createData);
  const [data, setData] = React.useState(navigation.getParam('data', {}));

  React.useEffect(() => {}, []);

  const onPetPress = (value) => {
    if (!value) return;
    setData({id: value});
  };

  const onAddToCard = () => {};

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
