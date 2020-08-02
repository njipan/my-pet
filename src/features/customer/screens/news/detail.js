import React from 'react';

import {
  ActivityIndicator,
  View,
  Text,
  Image,
  RefreshControl,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

import {encodeFromBuffer} from '@util/file';
import {NewsService} from '@service';
import {Colors, Typography} from '@style';
import {Screens} from '@constant';
import NewsListGridItem from './../../components/news-list-grid';

const NewsDetailScreen = ({navigation, ...props}) => {
  const deviceWidth = useWindowDimensions().width;
  const paramData = navigation.getParam('paramData', {});
  const [news, setNews] = React.useState(paramData || {});
  const [newses, setNewses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingNewses, setLoadingNewses] = React.useState(true);
  const [picture, setPicture] = React.useState(null);

  const parsePicture = async (file) => {
    try {
      const uri = await encodeFromBuffer(file.data);
      const source = {uri: `data:image/jpeg;base64,${uri}`};

      setPicture(source);
    } catch (err) {
      console.log(err);
      setPicture(null);
    }
  };

  const getAllNews = async () => {
    setLoadingNewses(true);
    try {
      setNewses(await NewsService.all());
    } catch (err) {
      console.log(err);
    }
    setLoadingNewses(false);
  };

  const getNews = async () => {
    setLoading(true);
    try {
      const response = await NewsService.get(paramData.id);
      parsePicture(response.file || {});
      setNews(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    parsePicture(news.file || {});
    getNews();
    getAllNews();
  }, []);

  const onNewsPress = (news) => {
    navigation.push(Screens.NEWS_DETAIL_CUSTOMER, {
      paramData: news,
    });
  };

  return (
    <ScrollView
      style={{backgroundColor: 'white'}}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          colors={Colors.REFRESH_CONTROL_PRIMARY}
          onRefresh={() => {
            getNews();
            getAllNews();
          }}
        />
      }>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: (2 / 3) * deviceWidth,
        }}>
        <Image
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: picture ? Colors.WHITE : Colors.BLACK10,
            resizeMode: 'stretch',
          }}
          source={picture}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 20,
            left: 10,
            height: 40,
            width: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
          }}
          onPress={() => navigation.goBack()}>
          <Image
            style={{
              height: 28,
              width: 28,
              borderRadius: 20,
            }}
            source={require('@asset/icons/arrow-back/normal.png')}
          />
        </TouchableOpacity>

        <View style={{position: 'absolute', bottom: 20, left: 0, padding: 20}}>
          <Text
            numberOfLines={1}
            style={{
              ...Typography.heading('h4'),
              fontFamily: Typography.FONT_FAMILY_MEDIUM,
              fontWeight: '200',
              fontSize: 14,
              color: 'white',
            }}>
            Pet News • {moment(news.created_at).locale('id').fromNow()}
          </Text>
          <Text
            style={{
              ...Typography.heading('h4'),
              fontSize: 20,
              color: 'white',
              lineHeight: 24,
              paddingRight: 28,
            }}>
            {news.title}
          </Text>
        </View>
      </View>
      <View style={{padding: 20}}>
        <Text style={{fontSize: 14, color: Colors.REGULAR, lineHeight: 22}}>
          {news.content}
        </Text>
        <View
          style={{
            borderBottomWidth: 0.6,
            borderBottomColor: Colors.BLACK10,
            marginBottom: 16,
            paddingTop: 10,
          }}
        />
        <View style={{marginTop: 10}}>
          <Text
            style={{
              ...Typography.heading('h3'),
              marginBottom: 20,
            }}>
            Artikel Lainnya
          </Text>
          {loadingNewses ? (
            <View style={{alignItems: 'center'}}>
              <ActivityIndicator size="small" color={Colors.GREY} />
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              {(newses.slice(0, 4) || []).map((item) => (
                <TouchableOpacity onPress={() => onNewsPress(item)}>
                  <NewsListGridItem data={item} width={deviceWidth} />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

NewsDetailScreen.navigationOptions = ({navigation, ...props}) => {
  return {
    header: null,
  };
};

export default NewsDetailScreen;
