import React from 'react';
import {
  Dimensions,
  Image,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import {Heading, Icons} from '@component';
import {Colors, Mixins} from '@style';

const VetServiceCard = ({
  onPress = () => {},
  phone = null,
  address = null,
  rate = null,
  title = null,
  pictureUrl = null,
}) => {
  return (
    <TouchableHighlight
      onPress={() => onPress()}
      style={styles.container}
      underlayColor="#ffffff0">
      <View style={styles.card}>
        <View>
          <Image
            style={styles.cardImage}
            source={{
              uri: pictureUrl ?? 'https://via.placeholder.com/100',
            }}
          />
        </View>
        <View style={styles.cardContent}>
          <Heading type="h5" text={title || ''} color={'#333'} />
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 6,
                flexWrap: 'nowrap',
              }}>
              <Icons.MiniStar />
              <View style={{marginLeft: 6}}>
                <Heading type="h6" text={`${rate || '0.0'}`} color={'#333'} />
              </View>
              <View
                style={{
                  paddingLeft: 10,
                }}>
                <Heading type="h6" text={`• ${address || ''}`} color={'#333'} />
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Icons.MiniPhone />
              <View style={{marginLeft: 10}}>
                <Text style={{fontSize: 14}}>{phone || '-'}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    ...Mixins.margin(10, 4, 6, 4),
    shadowColor: '#000',
    shadowOffset: {
      width: -1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 4,
  },
  card: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  cardImage: {
    width: 100,
    height: 100,
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    resizeMode: 'cover',
  },
  cardContent: {
    flex: 1,
    height: '100%',
    ...Mixins.padding(8, 16),
    flexDirection: 'column',
  },
});

export default VetServiceCard;
