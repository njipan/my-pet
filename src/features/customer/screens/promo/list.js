import React from 'react';
import {
  RefreshControl,
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import moment from 'moment';

import {ButtonFluid} from '@component';
import {Screens} from '@constant';
import {Colors, Mixins, Typography} from '@style';
import {PromoService} from '@service';
import {encodeFromBuffer} from '@util/file';

const PromoListItem = (props) => {
  const {
    title = null,
    description = null,
    file = {},
    onPress = () => {},
  } = props;

  const [picture, setPicture] = React.useState({});

  const parsePicture = async () => {
    try {
      const uri = await encodeFromBuffer(file.data);
      const source = {uri: `data:image/jpeg;base64,${uri}`};
      setPicture(source);
    } catch (err) {
      setPicture(null);
    }
  };

  React.useEffect(() => {
    parsePicture();
  }, []);

  return (
    <View style={{marginTop: 4, marginBottom: 8}}>
      <Image
        style={{
          backgroundColor: Colors.BLACK10,
          height: 100,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
        }}
        source={picture}
      />
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{padding: 8, flex: 1}}>
          <Text
            style={{
              ...Typography.heading('h4'),
              fontSize: 16,
            }}>
            {title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Colors.LIGHT_GREY,
            }}>
            {description}
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
  const [promos, setPromos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getPromos = async () => {
    setLoading(true);
    setPromos(await PromoService.all());
    setLoading(false);
  };

  React.useEffect(() => {
    getPromos();
  }, []);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={getPromos}
          colors={Colors.REFRESH_CONTROL_PRIMARY}
        />
      }>
      <View style={{padding: 20}}>
        {Array.isArray(promos) &&
          promos.map((promo, idx) => (
            <PromoListItem
              key={idx}
              title={promo.title}
              description={`Berlaku sampai dengan ${moment(promo.end_at)
                .locale('id')
                .format('DD MMMM YYYY')}`}
              file={promo.file}
              onPress={() =>
                navigation.navigate(Screens.PROMO_DETAIL_CUSTOMER, {
                  paramData: promo,
                })
              }
            />
          ))}
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
