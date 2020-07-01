import React from 'react';
import {View, Text, Button} from 'react-native';
import {Icons} from '@component';
import {Screens} from '@constant';

const ProfileScreen = ({navigation}) => {
  return (
    <View>
      <Icons.ProfileTabBarIcon focused={false} />
      <Text>ProfilXe</Text>
      <Button
        title="Go to Home"
        onPress={() => {
          navigation.navigate(Screens.ORDER_MERCHANT);
        }}
      />
    </View>
  );
};

export default ProfileScreen;
