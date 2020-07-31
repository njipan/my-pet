import React from 'react';
import {FlatList, SafeAreaView} from 'react-native';

const Carousel = (props) => {
  const {onIndexChange = () => {}, renderItem = () => {}, data = []} = props;

  const onScrollEnd = (e) => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;

    let pageNum = Math.floor(contentOffset.x / viewSize.width);
    onIndexChange(pageNum);
  };

  return (
    <SafeAreaView>
      <FlatList
        pagingEnabled
        onMomentumScrollEnd={onScrollEnd}
        horizontal={true}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Carousel;
