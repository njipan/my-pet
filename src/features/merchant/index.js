import React from 'react';
import {View, Text, Button, Image, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import TabIcon from './components/tab-icon';
import HeaderMerchant from './components/layouts/header';
import {Mixins, Colors} from '@style';
import {Icons, Heading} from '@component';

const Order = ({navigation}) => {
  return (
    <View>
      <Text>HOME</Text>
      <Button
        title="Go to Login"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    </View>
  );
};

const Profile = ({navigation}) => {
  return (
    <View>
      <Icons.ProfileTabBarIcon focused={false} />
      <Text>Profile</Text>
      <Button
        title="Go to Home"
        onPress={() => {
          navigation.navigate('Order');
        }}
      />
    </View>
  );
};

const TabBar = (props) => {
  const {
    renderIcon,
    getLabelText,
    activeTintColor,
    inactiveTintColor,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation,
  } = props;

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

const MerchantBottomTabNavigator = createBottomTabNavigator(
  {
    Order: {
      screen: Order,
      navigationOptions: {
        tabBarIcon: Icons.OrderTabBarIcon,
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: Icons.ProfileTabBarIcon,
      },
    },
  },
  {
    tabBarComponent: TabBar,
    tabBarOptions: {
      style: {
        height: 72,
        backgroundColor: '#ffffff',
      },
    },
  },
);

export const Navigator = createStackNavigator({
  MerchantBottomTabNavigator: {
    screen: MerchantBottomTabNavigator,
    navigationOptions: (props) => {
      return {
        header: <HeaderMerchant {...props} />,
      };
    },
  },
});
