import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Heading} from '@component';
import {Mixins, Colors} from '@style';

const BottomTabBar = ({
  renderIcon,
  getLabelText,
  activeTintColor,
  inactiveTintColor,
  onTabPress,
  onTabLongPress,
  getAccessibilityLabel,
  navigation,
  ...props
}) => {
  const {routes, index: activeRouteIndex} = navigation.state;

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 56,
        elevation: 2,
        ...Mixins.boxShadow('black', {width: 20, height: 20}),
        backgroundColor: 'white',
        borderTopColor: 'black',
        borderWidth: 0.1,
        paddingLeft: 32,
        paddingRight: 32,
      }}>
      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;
        const tintColor = isRouteActive ? Colors.PRIMARY : Colors.BLACK60;

        return (
          <TouchableOpacity
            key={routeIndex}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              onTabPress({route});
            }}
            onLongPress={() => {
              onTabLongPress({route});
            }}
            accessibilityLabel={getAccessibilityLabel({route})}>
            {renderIcon({route, focused: isRouteActive, tintColor})}

            <View style={{marginTop: 4}}>
              <Heading
                type="h6"
                text={getLabelText({route})}
                color={tintColor}
                styleText={{fontSize: 12}}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabBar;
