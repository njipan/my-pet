import React from 'react';
import {View, Text} from 'react-native';

import NewsListItem from './../news-list-item';

const HomeNews = () => {
  return (
    <View>
      <NewsListItem />
      <NewsListItem />
      <NewsListItem />
    </View>
  );
};

export default HomeNews;
