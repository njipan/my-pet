import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Heading, Badge} from '@component';
import {Colors} from '@style';

const PetDetailInfo = ({label = '', value = ''}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text>{label}</Text>
      <Text style={{color: Colors.PRIMARY, fontWeight: '700'}}>{value}</Text>
    </View>
  );
};

const PetItemCard = (data = {}, onPress = () => {}, onEditPress = () => {}) => {
  const heightCard = 160;
  return (
    <View
      style={{
        borderRadius: 12,
        backgroundColor: 'white',
        width: '100%',
        height: heightCard,
        elevation: 3,
        padding: 14,
        flexDirection: 'row',
      }}>
      <View>
        <Image
          style={{
            width: heightCard - 28,
            height: heightCard - 28,
            backgroundColor: 'white',
            borderRadius: 10,
            resizeMode: 'cover',
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          width: '100%',
          height: '100%',
          marginLeft: 10,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            height: 38,
            borderBottomColor: Colors.BLACK10,
            borderBottomWidth: 1,
          }}>
          <Image
            style={{width: 32, height: 32}}
            source={require('./../../../../assets/icons/animal/cat.png')}
          />
          <View
            style={{
              flex: 1,
              height: 44,
              marginLeft: 4,
              marginRight: 6,
            }}>
            <Heading
              type="h4"
              text="Milo sdaf dsafdsa"
              numberOfLines={1}
              ellipsizeMode="tail"
              styleText={{
                marginTop: 4,
                fontFamily: 'sans-serif-normal',
                fontSize: 18,
              }}
            />
          </View>
          <TouchableOpacity onPress={() => onEditPress()}>
            <Image
              style={{width: 22, height: 22}}
              source={require('./../../../../assets/icons/pencil-grey.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: 'white ', flex: 1, paddingVertical: 8}}>
          <PetDetailInfo label="Ras : " value="Munchkin" />
          <PetDetailInfo label="Usia : " value="6 Bulan" />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            height: 32,
            flexDirection: 'row',
          }}>
          <Badge icon={require('@asset/icons/sex/male.png')} text={`Jantan`} />
          <View style={{marginHorizontal: 4}} />
          <Badge icon={require('@asset/icons/weight.png')} text={`30 Kg`} />
        </View>
      </View>
    </View>
  );
};

export default PetItemCard;
