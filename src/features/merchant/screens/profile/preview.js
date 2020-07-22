import React from 'react';
import {ScrollView, View, Text} from 'react-native';

import {Typography} from '@style';
import {MerchantService} from '@service';
import {encodeFromBuffer} from '@util/file';
import VetInformation from '@shared/components/vet-information';

const ProfilePreviewScreen = ({navigation, ...props}) => {
  const [data, setData] = React.useState({});

  const getMerchant = async () => {
    try {
      const response = await MerchantService.getMe();
      let picture = null;
      if (response.pictures.file) {
        const uri = await encodeFromBuffer(response.pictures.file.data);
        picture = {uri: `data:image/jpeg;base64,${uri}`};
      }
      const body = {
        name: response.user.full_name,
        rate: '-',
        email: response.user.email,
        phone: response.user.phone,
        address: response.merchant.address,
        operationalHour: response.merchant.operational_hour,
        facility: response.merchant.facility,
        picture: picture,
      };
      setData(body);
    } catch (err) {}
  };

  React.useEffect(() => {
    getMerchant();
  }, []);

  return (
    <View style={{flex: 1, width: '100%'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: 'white'}}>
        <VetInformation {...data} />
      </ScrollView>
    </View>
  );
};

ProfilePreviewScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Preview Akun',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
  };
};

export default ProfilePreviewScreen;
