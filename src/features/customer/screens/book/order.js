import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Dash from 'react-native-dash';

import {ButtonFluid} from '@component';
import * as Order from '@component/order';
import {Box, Colors, Typography} from '@style';

const TitleWithAction = (props) => {
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

const OrderScreen = ({navigation, ...props}) => {
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
    alert('Fitur ini belum tersedia!');
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={{...styles.container}}>
          <Order.Info
            name={'Animal Clinic Jakarta'}
            booking={'1232131'}
            date={'Minggu, 23 April 2020 08:00 AM'}
          />
        </View>
        <View style={{...Box.SPACER_CONTAINER}} />
        <View style={{...styles.container}}>
          <Text
            style={{
              fontFamily: Typography.FONT_FAMILY_MEDIUM,
              fontSize: 16,
              color: Colors.LIGHT_GREY,
            }}>
            Detail Perawatan
          </Text>
          <Dash
            style={{width: '100%', marginBottom: 10, marginTop: 8}}
            dashColor={Colors.BLACK10}
            dashThickness={1}
            dashGap={4}
          />
          <Order.Treatment
            data={[]}
            onEditPress={() => alert('edit pressed')}
            onDeletePress={() => alert('delete pressed')}
          />
        </View>
        <View style={{...Box.SPACER_CONTAINER}} />
        <View style={{...styles.container}}>
          <TitleWithAction onPress={onEditBooking} title="Detail Pembayaran" />
          <View style={{paddingVertical: 10}} />
          <Order.PaymentInfo
            done
            method="Cash"
            total="Rp 805.000"
            data={[
              {name: 'Suntik Vaksin', price: 'Rp 400.000'},
              {name: 'Suntik Vitamin', price: 'Rp 400.000'},
              {name: 'PPn', price: 'Rp 5.000'},
            ]}
          />
        </View>
      </ScrollView>
      <View
        style={{
          ...Box.CONTAINER_ACTION_BOTTOM,
          height: 132,
          backgroundColor: 'white',
          elevation: 5,
        }}>
        <ButtonFluid
          text="Direction"
          onPress={onBookNow}
          styleContainer={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          iconLeft={
            <Image
              source={require('@asset/icons/maps/direction/normal.png')}
              style={{width: 24, height: 24, marginRight: 10}}
            />
          }
        />
        <ButtonFluid
          text="Chat via Whatsapp"
          onPress={onBookNow}
          styleContainer={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderColor: Colors.PRIMARY,
            borderWidth: 1,
          }}
          styleText={{
            color: Colors.PRIMARY,
          }}
          iconLeft={
            <Image
              source={require('@asset/icons/social/whatsapp-outline/normal.png')}
              style={{width: 24, height: 24, marginRight: 10}}
            />
          }
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

OrderScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Detail Pesanan',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
  };
};

export default OrderScreen;
