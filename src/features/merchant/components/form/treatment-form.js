import React from 'react';
import {Text, View} from 'react-native';

import {TextInput} from '@component';

const TreatmentForm = ({navigation, ...props}) => {
  const {data = {}, messages = {}, onFormValueChange = () => {}} = props;

  return (
    <View>
      <TextInput
        label="Judul Perawatan"
        value={data.name}
        error={messages.name}
        onChangeText={(value) => onFormValueChange('name', value)}
      />
      <TextInput
        value={data.description}
        error={messages.description}
        onChangeText={(value) => onFormValueChange('description', value)}
        label="Deskripsi"
        numberOfLines={3}
        multiline={true}
      />
      <TextInput
        value={`${data.price || ''}`}
        error={messages.price}
        onChangeText={(value) => onFormValueChange('price', value)}
        label="Harga"
        keyboardType="numeric"
      />
    </View>
  );
};

export default TreatmentForm;
