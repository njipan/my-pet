import React from 'react';
import {View, Text, Button} from 'react-native';
import AlertModal from '@component/modals/alert';

const OrderScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <Button
        title="Go to Detail"
        onPress={() => {
          navigation.navigate('OrderDetail');
        }}
      />
    </View>
  );
};

export default OrderScreen;
