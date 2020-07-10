import React from 'react';
import {View, Text} from 'react-native';
import Menu, {MenuItem} from 'react-native-material-menu';
import {Colors, Mixins} from '@style';
import {Screens} from '@constant';
import * as Modal from '@util/modal';

const RightMenu = ({id = null, navigation}) => {
  const [menuRef, setMenuRef] = React.useState(null);

  const onDelete = () => {
    menuRef.hide();
    Modal.confirm({
      isLoading: true,
    });
    setTimeout(() => navigation.goBack(null), 1000);
  };

  const onUpdate = () => {
    menuRef.hide();
    navigation.navigate(Screens.EDIT_PET_CUSTOMER, {id});
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Menu
        style={{borderRadius: 0, top: 52}}
        ref={(ref) => setMenuRef(ref)}
        button={
          <Text
            style={{
              paddingHorizontal: 24,
              fontSize: 20,
              fontFamily: 'sans-serif-medium',
            }}
            onPress={() => menuRef.show()}>
            &#8942;
          </Text>
        }>
        <MenuItem onPress={onUpdate}>Ubah</MenuItem>
        <MenuItem onPress={onDelete}>Hapus Hewan Peliharaan</MenuItem>
      </Menu>
    </View>
  );
};

const DetailScreen = () => {
  return (
    <View>
      <Text> PET DETAIL </Text>
    </View>
  );
};

DetailScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Hewan Peliharaan',
    headerRight: (
      <RightMenu id={navigation.state.params.id} navigation={navigation} />
    ),
    headerTitleStyle: {
      fontFamily: 'sans-serif-medium',
    },
  };
};

export default DetailScreen;
