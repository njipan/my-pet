import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Menu, {MenuItem} from 'react-native-material-menu';

const RightMenu = ({navigation, items = [], icon = null}) => {
  const [menuRef, setMenuRef] = React.useState(null);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Menu
        style={{borderRadius: 0, top: 52}}
        ref={(ref) => setMenuRef(ref)}
        button={
          <TouchableOpacity
            onPress={() => menuRef.show()}
            style={{paddingHorizontal: 10}}>
            {icon}
          </TouchableOpacity>
        }>
        {items &&
          items.map((item, idx) => (
            <MenuItem
              onPress={() => item.onPress(menuRef)}
              key={`r-menu-${idx}`}>
              {item.label}
            </MenuItem>
          ))}
      </Menu>
    </View>
  );
};

export default RightMenu;
