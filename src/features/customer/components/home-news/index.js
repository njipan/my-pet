import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import {ButtonFluid} from '@component';
import {moment, parseDateFromNow} from '@util/moment';
import NewsListItem from './../news-list-item';
import {Colors} from '@style';

const HomeNews = (props) => {
  const {data = [], onViewAll = () => {}, onNewsPress = () => {}} = props;

  return (
    <View>
      <View>
        {data &&
          data.map((news) => (
            <TouchableOpacity onPress={() => onNewsPress(news)}>
              <NewsListItem
                label="Berita Hewan Peliharaan"
                title={news.title}
                time={parseDateFromNow(moment(news.created_at))}
                file={news.file}
              />
            </TouchableOpacity>
          ))}
      </View>
      <ButtonFluid
        text="Lihat Semua"
        onPress={onViewAll}
        styleContainer={{
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          borderColor: Colors.PRIMARY,
          borderWidth: 1,
        }}
        styleText={{
          color: Colors.PRIMARY,
        }}
      />
    </View>
  );
};

export default HomeNews;
