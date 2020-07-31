import React from 'react';
import {ToastAndroid, View} from 'react-native';

import TreatmentCard from '@component/treatment-card';
import ButtonFluid from '@component/button-fluid';
import Quantity from '@component/quantity';
import {Screens} from '@constant';
import {Colors, Typography} from '@style';
import {toNumberFormat} from '@util/transformer';
import {OrderService} from '@service';

const CreateTreatmentScreen = ({navigation, ...props}) => {
  const orderId = navigation.getParam('orderId', null);
  const orderPetId = navigation.getParam('orderPetId', null);
  const createData = navigation.getParam('createData');

  const [qty, setQty] = React.useState(1);

  const onSubmitChanges = async () => {
    try {
      const body = {
        order_pet_id: orderPetId,
        merchant_service_id: createData.id,
        service_name: createData.name,
        service_description: createData.description,
        service_price: createData.price,
        service_qty: qty,
      };
      await OrderService.createTreatment(orderId, orderPetId, body);
      navigation.navigate(Screens.ORDER_CHECKOUT_DETAIL_MERCHANT);
      navigation.getParam('callback', () => {})();
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Terjadi Kesalahan', ToastAndroid.LONG);
    }
  };

  return (
    <View style={{padding: 20, flex: 1}}>
      <View style={{flex: 1}}>
        <TreatmentCard
          name={createData.name}
          description={createData.description}
          price={toNumberFormat(createData.price || 0)}
        />
        <Quantity value={qty} onPress={(value) => setQty(Math.max(value, 0))} />
      </View>
      <View style={{paddingTop: 20}}>
        <ButtonFluid text="Tambah Pesanan" onPress={onSubmitChanges} />
      </View>
    </View>
  );
};

CreateTreatmentScreen.navigationOptions = ({navigation, ...props}) => {
  return {
    title: 'Tambah Pesanan',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
  };
};

export default CreateTreatmentScreen;
