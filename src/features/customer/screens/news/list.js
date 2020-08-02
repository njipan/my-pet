import React from 'react';
import {
  View,
  RefreshControl,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

import NewsCarousel from './../../components/news-carousel';
import {NewsService} from '@service';
import {Screens} from '@constant';
import {Colors, Typography} from '@style';
import {moment, parseDateFromNow} from '@util/moment';

import NewsListItem from './../../components/news-list-item';
import NewsListGridItem from './../../components/news-list-grid';

const getTitle = (routeName) => {
  return (
    {
      [Screens.NEWS_LATEST_CUSTOMER]: 'Terbaru',
      [Screens.NEWS_TRENDING_CUSTOMER]: 'Trending',
      [Screens.NEWS_LIFE_CUSTOMER]: 'Life',
      [Screens.NEWS_STORY_CUSTOMER]: 'Story',
      [Screens.NEWS_MOVIE_CUSTOMER]: 'Movie',
    }[routeName] || null
  );
};

const ListNewsScreen = ({navigation, props}) => {
  const deviceWidth = useWindowDimensions().width;
  const paramData = navigation.getParam('paramData');
  const TYPE = getTitle(navigation.state.routeName);
  const [news, setNews] = React.useState(paramData || []);
  const [loading, setLoading] = React.useState(true);

  const getNews = async () => {
    try {
      setLoading(true);
      setNews(await NewsService.all());
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const onNewsPress = (news) => {
    navigation.navigate(Screens.NEWS_DETAIL_CUSTOMER, {
      paramData: news,
    });
  };

  React.useEffect(() => {
    getNews();
  }, []);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => {
            getNews();
          }}
          colors={Colors.REFRESH_CONTROL_PRIMARY}
        />
      }>
      <View>{TYPE == 'Terbaru' && <NewsCarousel data={news} />}</View>
      {news && news.length > 0 ? (
        <View style={{padding: 20}}>
          <Text
            style={{
              ...Typography.heading('h3'),
              paddingBottom: 10,
            }}>
            Berita {TYPE}
          </Text>
          <View>
            {news &&
              news.map((news) => (
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
          <View style={{marginTop: 10}}>
            <Text
              style={{
                ...Typography.heading('h3'),
                paddingBottom: 10,
                marginBottom: 20,
                borderBottomColor: Colors.BLACK10,
                borderBottomWidth: 0.6,
              }}>
              Berita Lainnya
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              {(news.slice(0, 4) || []).map((item) => (
                <TouchableOpacity onPress={() => onNewsPress(news)}>
                  <NewsListGridItem data={item} width={deviceWidth} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
};

export default ListNewsScreen;
