import React from 'react';
import {ToastAndroid, View} from 'react-native';

import TreatmentCard from '@component/treatment-card';
import ButtonFluid from '@component/button-fluid';
import Quantity from '@component/quantity';
import {Screens} from '@constant';
import {Colors, Typography} from '@style';
import {toNumberFormat} from '@util/transformer';
import {OrderService} from '@service';

const UpdateTreatmentScreen = ({navigation, ...props}) => {
  const orderId = navigation.getParam('orderId', null);
  const orderPetId = navigation.getParam('orderPetId', null);
  const updateData = navigation.getParam('updateData');

  const [qty, setQty] = React.useState(updateData.service_qty || 0);

  const onSubmitChanges = async () => {
    try {
      const body = {
        order_id: orderId,
        order_pet_id: orderPetId,
        service_id: updateData.id,
        qty,
      };
      await OrderService.updateTreatment(body);
      navigation.navigate(Screens.ORDER_CHECKOUT_DETAIL_MERCHANT);
      navigation.getParam('callback', () => {})();
    } catch (error) {
      ToastAndroid.show('Terjadi Kesalahan', ToastAndroid.LONG);
    }
  };

  return (
    <View style={{padding: 20, flex: 1}}>
      <View style={{flex: 1}}>
        <TreatmentCard
          name={updateData.service_name}
          description={updateData.service_description}
          price={toNumberFormat(updateData.service_price || 0)}
        />
        <Quantity value={qty} onPress={(value) => setQty(Math.max(value, 0))} />
      </View>
      <View style={{paddingTop: 20}}>
        <ButtonFluid text="Ubah Pesanan" onPress={onSubmitChanges} />
      </View>
    </View>
  );
};

UpdateTreatmentScreen.navigationOptions = ({navigation, ...props}) => {
  return {
    title: 'Ubah Pesanan',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
  };
};

export default UpdateTreatmentScreen;
