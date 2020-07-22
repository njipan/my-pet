import React from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';

import {RightMenu, Icons, ProfileSetting} from '@component';
import {Navigators, Screens} from '@constant';
import {Colors, Mixins, Typography} from '@style';
import * as Modal from '@util/modal';
import {encodeFromBuffer} from '@util/file';
import {AuthService, MerchantService} from '@service';

import ProfileDetail from './../../components/profile-detail';

const ProfileDetailScreen = ({navigation, ...props}) => {
  const [data, setData] = React.useState({});
  const [refreshing, setRefreshing] = React.useState(true);

  const getMerchant = async () => {
    try {
      const response = await MerchantService.getMe();
      let picture = null;
      if (response.pictures.file) {
        const uri = await encodeFromBuffer(response.pictures.file.data);
        picture = {uri: `data:image/jpeg;base64,${uri}`};
      }
      const body = {
        fullName: response.user.full_name,
        email: response.user.email,
        phone: response.user.phone,
        address: response.merchant.address,
        operationalHour: response.merchant.operational_hour,
        facility: response.merchant.facility,
        picture: picture,
        services: response.merchantServices || [],
      };
      setData(body);
    } catch (err) {}
    setRefreshing(false);
  };

  React.useEffect(() => {
    getMerchant();
    navigation.setParams({
      reload: () => {
        getMerchant();
      },
    });
  }, []);

  const onLogoutProcess = async () => {
    try {
      await AuthService.logout();
    } catch (err) {}
    navigation.dispatch(
      StackActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({
            routeName: Navigators.AUTH_NAVIGATOR,
          }),
        ],
      }),
    );
  };

  const onLogout = () => {
    Modal.confirm({
      description: 'Apakah kamu yakin ingin keluar dari MyPet?',
      textConfirm: 'Ya',
      textCancel: 'Tidak',
      reverse: true,
      onCallback: (result, hide) => {
        if (!result) {
          hide();
          return;
        }

        Modal.confirm({
          isLoading: true,
          onLoad: onLogoutProcess,
        });
      },
    });
    return;
  };
  const onEditPress = (value) => {
    navigation.navigate(Screens.TREATMENT_EDIT_MERCHANT, {
      data: value,
      savedState: navigation.state,
      reload: () => {
        setRefreshing(true);
        getMerchant();
      },
    });
  };

  const onAddPress = () => {
    navigation.navigate(Screens.TREATMENT_CREATE_MERCHANT, {
      savedState: navigation.state,
      reload: () => {
        setRefreshing(true);
        getMerchant();
      },
    });
  };

  const onTNC = () => {};
  const onFAQ = () => {};
  const onChangePassword = () =>
    navigation.navigate(Screens.CHANGE_PASSWORD_MERCHANT, {});

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getMerchant} />
      }>
      <ProfileDetail {...{onAddPress, onEditPress, data}} />
      <View style={{backgroundColor: Colors.WHITE, padding: 16}}>
        <ProfileSetting {...{onLogout, onTNC, onFAQ, onChangePassword}} />
      </View>
    </ScrollView>
  );
};

ProfileDetailScreen.navigationOptions = ({navigation, ...props}) => {
  const menus = [
    {
      label: 'Preview Akun',
      onPress: (ref) => {
        navigation.navigate(Screens.PROFILE_PREVIEW_MERCHANT);
        ref.hide();
      },
    },
    {
      label: 'Ubah',
      onPress: (ref) => {
        navigation.navigate(Screens.PROFILE_EDIT_MERCHANT, {
          savedState: navigation.state,
          reload: navigation.getParam('reload'),
        });
        ref.hide();
      },
    },
  ];
  return {
    title: 'Detail Profil',
    headerTitleStyle: Typography.FONT_HEADER_TITLE,
    headerRight: (
      <RightMenu
        icon={<Icons.MoreVertIcon size="small" />}
        navigation={navigation}
        items={menus}
      />
    ),
  };
};

export default ProfileDetailScreen;
