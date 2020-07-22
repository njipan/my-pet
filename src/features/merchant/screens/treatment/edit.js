import React from 'react';
import {ToastAndroid, View, Text} from 'react-native';

import ButtonSave from '@component/button-save';
import {TreatmentService} from '@service';
import {Typography} from '@style';
import {useSchema} from '@shared/hooks';
import * as Modal from '@util/modal';

import {TreatmentSchema} from './../../schemas';
import TreatmentForm from './../../components/form/treatment-form';

const EditScreen = ({navigation, ...props}) => {
  const {routeName, key} = navigation.getParam('savedState');
  const {data, messages, setMessages, setFormAndValidate} = useSchema(
    navigation.getParam('data', {}),
    {},
    TreatmentSchema,
  );

  React.useEffect(() => {
    navigation.setParams({
      onPress: () => onSubmit(navigation.getParam('data', {})),
    });
  }, []);

  const onSubmit = (formData) => {
    Modal.confirm({
      isLoading: true,
      onLoad: async (modalNav) => {
        try {
          const body = {
            name: formData.name,
            description: formData.name,
            price: parseInt(formData.price) || 0,
          };
          await TreatmentService.update(body, data.id);
          ToastAndroid.show('Perubahan berhasil disimpan!', ToastAndroid.LONG);
          navigation.navigate(routeName, key);
          navigation.getParam('reload', () => {})();
        } catch (error) {
          ToastAndroid.show('Terjadi Kesalahan', ToastAndroid.LONG);
          modalNav.goBack(null);
        }
      },
      onCallback: (res, hide) => {
        hide(null);
      },
    });
  };

  const injectParams = (key, value, obj) => {
    navigation.setParams({
      onPress: () => onSubmit({...obj, [key]: value}),
    });
  };

  const onFormValueChange = (key, value) => {
    setFormAndValidate(key, value, injectParams);
  };

  return (
    <View style={{padding: 20}}>
      <TreatmentForm
        data={data}
        messages={messages}
        onFormValueChange={onFormValueChange}
      />
    </View>
  );
};

EditScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Perawatan',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
    headerRight: (
      <ButtonSave onPress={navigation.getParam('onPress', () => {})} />
    ),
  };
};

export default EditScreen;
