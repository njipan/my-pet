import React from 'react';
import {
  ToastAndroid,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';

import {Screens} from '@constant';
import {ButtonFluid, TextInput} from '@component';
import {PetService} from '@service';
import {Box, Colors, Typography} from '@style';

const MyPets = ({
  data = [],
  onPress = () => {},
  value = null,
  iconChecked = null,
  iconUnchecked = null,
}) => {
  return (
    <View>
      {data &&
        data.length > 0 &&
        data.map((item) => (
          <TouchableOpacity onPress={() => onPress(item || null)}>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                padding: 10,
                marginTop: 8,
                marginBottom: 8,
              }}>
              <View style={{flexDirection: 'row', flex: 1}}>
                <Text style={{fontSize: 18}}>{item.label}</Text>
              </View>
              {value && value == item.value ? iconChecked : iconUnchecked}
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );
};

const ChoosePetScreen = ({navigation, ...props}) => {
  const createData = navigation.getParam('createData', {});

  const [pets, setPets] = React.useState([]);
  const [selectedPet, setSelectedPet] = React.useState({});

  const [data, setData] = React.useState(navigation.getParam('data', {}));

  const getMyPets = async () => {
    try {
      const response = await PetService.all({});
      setTimeout(() => {
        setPets(
          response.map((item) => ({
            label: item.name,
            value: item.id,
          })),
        );
      }, 0);
    } catch (error) {}
  };

  React.useEffect(() => {
    getMyPets();
  }, []);

  const onPetPress = (value) => {
    if (!value) return;
    setSelectedPet(value);
  };

  const onNext = () => {
    if (!Object.keys(selectedPet).length) {
      ToastAndroid.show('Pilih hewan peliharaan!', ToastAndroid.LONG);
      return;
    }
    navigation.push(Screens.ORDER_BOOKING_CHOOSE_TREATMENT_CUSTOMER, {
      createData: {...createData},
      petId: selectedPet.value,
      petName: selectedPet.label,
    });
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
              }}>
              Pilih Hewan Peliharaan
            </Text>
            <MyPets
              data={pets}
              value={selectedPet.value || null}
              onPress={onPetPress}
              iconChecked={
                <Image
                  source={require('@asset/icons/form/radio/checked/normal.png')}
                  style={{width: 24, height: 24}}
                />
              }
              iconUnchecked={
                <Image
                  source={require('@asset/icons/form/radio/unchecked/normal.png')}
                  style={{width: 24, height: 24}}
                />
              }
            />
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 20,
          paddingBottom: 16,
        }}>
        <ButtonFluid text="Selanjutnya" onPress={onNext} />
      </View>
    </View>
  );
};

ChoosePetScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Pilih Hewan',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
  };
};

export default ChoosePetScreen;
