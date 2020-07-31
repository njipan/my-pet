import React from 'react';
import {
  RefreshControl,
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';

import {ButtonFluid} from '@component';
import {Screens} from '@constant';
import {Colors, Mixins, Typography} from '@style';

const PromoListItem = (props) => {
  const {
    picture = null,
    title = null,
    description = null,
    onPress = () => {},
  } = props;

  return (
    <View style={{marginVertical: 4}}>
      <Image
        style={{
          backgroundColor: Colors.BLACK10,
          height: 100,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
        }}
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{padding: 8, flex: 1}}>
          <Text
            style={{
              ...Typography.heading('h4'),
              fontSize: 16,
            }}>
            Voucher 20% di MyPet
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Colors.LIGHT_GREY,
            }}>
            Berlaku sampai dengan 20 Juli
          </Text>
        </View>
        <View style={{paddingRight: 10, paddingLeft: 10}}>
          <ButtonFluid
            text="Lihat"
            onPress={onPress}
            styleContainer={{
              ...Mixins.padding(4, 10),
            }}
            styleText={{
              fontSize: 14,
              fontFamily: Typography.FONT_FAMILY_BOLD,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const PromoListScreen = ({navigation, ...props}) => {
  return (
    <ScrollView refreshControl={<RefreshControl refreshing={false} />}>
      <View style={{padding: 20}}>
        <PromoListItem
          onPress={() => navigation.navigate(Screens.PROMO_DETAIL_CUSTOMER)}
        />
      </View>
    </ScrollView>
  );
};

PromoListScreen.navigationOptions = ({navigation, ...props}) => {
  return {
    title: 'Promo',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
  };
};

export default PromoListScreen;
