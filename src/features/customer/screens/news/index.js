import React from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import TopTabHeader from '@component/header/top-tab';

import ListNewsScreen from './list';
import NewsDetailScreen from './detail';

import {Screens} from '@constant';
import {Typography} from '@style';

const CustomerNewsTopTabNavigator = createMaterialTopTabNavigator(
  {
    [Screens.NEWS_LATEST_CUSTOMER]: {
      screen: ListNewsScreen,
      navigationOptions: ({navigation, ...props}) => {
        return {
          title: 'Terbaru',
        };
      },
    },
    [Screens.NEWS_TRENDING_CUSTOMER]: {
      screen: ListNewsScreen,
      navigationOptions: ({navigation, ...props}) => {
        return {
          title: 'Trending',
        };
      },
    },
    [Screens.NEWS_LIFE_CUSTOMER]: {
      screen: ListNewsScreen,
      navigationOptions: ({navigation, ...props}) => {
        return {
          title: 'Life',
        };
      },
    },
    [Screens.NEWS_STORY_CUSTOMER]: {
      screen: ListNewsScreen,
      navigationOptions: ({navigation, ...props}) => {
        return {
          title: 'Story',
        };
      },
    },
    [Screens.NEWS_MOVIE_CUSTOMER]: {
      screen: ListNewsScreen,
      navigationOptions: ({navigation, ...props}) => {
        return {
          title: 'Movie',
        };
      },
    },
  },
  {
    tabBarComponent: (props) => <TopTabHeader fontSize={14} {...props} />,
    tabBarOptions: {
      activeTintColor: '#1BA1F3',
      inactiveTintColor: '#000',
    },
  },
);

export {NewsDetailScreen};

export default CustomerNewsTopTabNavigator;
