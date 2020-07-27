import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import {Colors, Typography} from '@style';

const TopTabHeader = (props) => {
  const {
    navigationState,
    navigation,
    activeTintColor,
    inactiveTintColor,
    state,
    descriptors,
    position,
    getAccessibilityLabel,
  } = props;

  const activeTabIndex = navigation.state.index;
  return (
    <View style={styles.tabContainer}>
      {navigationState.routes.map((route, index) => {
        const isRouteActive = index === activeTabIndex;
        const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

        return (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate(route.routeName)}
            key={route.routeName}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                marginHorizontal: 2,
                paddingTop: 6,
              }}>
              <Text
                style={{
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: props.fontSize || 17,
                  textTransform: 'capitalize',
                  color: `${
                    isRouteActive ? Colors.REGULAR : Colors.LIGHT_GREY
                  }`,
                  marginBottom: 4,
                }}>
                {getAccessibilityLabel({route}).split(',')[0]}
              </Text>

              <View
                style={{
                  marginTop: 6,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                  backgroundColor: isRouteActive ? Colors.BLUE : Colors.WHITE,
                  height: 5,
                  width: '100%',
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    borderBottomColor: Colors.BLACK10,
    borderBottomWidth: 1,
  },
});
export default TopTabHeader;
