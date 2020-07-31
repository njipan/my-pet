import React from 'react';
import {
  RefreshControl,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';

import TreatmentCard from '@component/treatment-card';
import ButtonFluid from '@component/button-fluid';
import Quantity from '@component/quantity';
import {Screens} from '@constant';
import {Colors, Typography} from '@style';
import {toNumberFormat} from '@util/transformer';
import useOrderDetail from '@shared/hooks/order-detail-hook';
import {AuthService, VetService} from '@service';

const ChooseTreatmentScreen = ({navigation, ...props}) => {
  const orderId = navigation.getParam('orderId', null);
  const orderPetId = navigation.getParam('orderPetId', null);
  const alreadySelected = navigation.getParam('alreadySelected', null);

  const [services, setServices] = React.useState([]);
  const [selectedService, setSelectedService] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const getMerchant = async () => {
    try {
      setLoading(true);
      const merchantId = (await AuthService.getMerchant()).id;
      const response = await VetService.get(merchantId);
      setServices(response.merchantServices);
    } catch (err) {
      ToastAndroid.show('Terjadi Kesalahan', ToastAndroid.LONG);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    getMerchant();
  }, []);

  const onSubmitChanges = () => {
    if (!selectedService) {
      ToastAndroid.show('Pilih salah satu', ToastAndroid.LONG);
      return;
    }
    navigation.navigate(Screens.ORDER_CREATE_TREATMENT_MERCHANT, {
      orderId,
      orderPetId,
      createData: selectedService,
      callback: navigation.getParam('callback'),
    });
  };

  return (
    <View style={{padding: 20, flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getMerchant}
            colors={Colors.REFRESH_CONTROL_SECONDARY}
          />
        }>
        <View style={{flex: 1}}>
          {Array.isArray(services) &&
            services.map((service) => (
              <TouchableOpacity
                onPress={() =>
                  alreadySelected.includes(service.id)
                    ? null
                    : selectedService && service.id == selectedService.id
                    ? setSelectedService(null)
                    : setSelectedService(service)
                }>
                <TreatmentCard
                  disabled={alreadySelected.includes(service.id)}
                  name={service.name}
                  description={service.description}
                  price={toNumberFormat(service.price || 0)}
                  icon={
                    selectedService && selectedService.id == service.id ? (
                      <Image
                        style={{width: 26, height: 26}}
                        source={require('@asset/icons/order/success/normal.png')}
                      />
                    ) : null
                  }
                />
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
      <View style={{paddingTop: 20}}>
        <ButtonFluid text="Tambah Pesanan" onPress={onSubmitChanges} />
      </View>
    </View>
  );
};

ChooseTreatmentScreen.navigationOptions = ({navigation, ...props}) => {
  return {
    title: 'Tambah Pesanan',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
  };
};

export default ChooseTreatmentScreen;
