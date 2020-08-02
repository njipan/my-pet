import React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/id';

import {Heading, Badge} from '@component';
import {PetService} from '@service';
import {Colors, Typography} from '@style';
import {Screens, Sex} from '@constant';
import {encodeFromBuffer} from '@util/file';
import {parseDateFromNow} from '@util/moment';

const PetDetailInfo = ({label = '', value = ''}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={{color: Colors.LIGHT_GREY}}>{label}</Text>
      <Text
        style={{
          color: Colors.PRIMARY,
          fontWeight: '700',
          fontFamily: Typography.FONT_FAMILY_REGULAR,
          textTransform: 'capitalize',
        }}>
        {value}
      </Text>
    </View>
  );
};

const PetItemCard = ({
  data = {},
  onPress = () => {},
  onEditPress = () => {},
  iconName,
  ...props
}) => {
  const heightCard = 160;
  const getAge = (date = null) => {
    const parseDate = moment(date, 'DD-MM-YYYY');
    return parseDate.isValid() ? parseDate.locale('id').fromNow(true) : '-';
  };

  const [picture, setPicture] = React.useState(null);
  const [pictureLoading, setPictureLoading] = React.useState(true);

  React.useEffect(() => {
    getPicture();
  }, [data]);

  const getPicture = async () => {
    try {
      const response = await PetService.get(data.id);
      console.log('pet id : ', data.id, Object.keys(response));
      const uri = await encodeFromBuffer(response.pictures.file.data);
      setPicture({uri: `data:image/jpeg;base64,${uri}`});
    } catch (err) {
      console.log(err);
      setPicture(null);
    }
    setPictureLoading(false);
  };

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
        marginTop: 4,
        marginBottom: 4,
      }}>
      <View
        style={{
          width: heightCard - 28,
          height: heightCard - 28,
          backgroundColor: 'white',
          justifyContent: 'center',
        }}>
        {pictureLoading ? (
          <ActivityIndicator color={Colors.LIGHT_GREY} />
        ) : (
          <Image
            style={{
              width: heightCard - 28,
              height: heightCard - 28,
              borderRadius: 10,
              resizeMode: 'cover',
              backgroundColor: picture ? 'transparent' : Colors.BLACK10,
            }}
            source={picture}
          />
        )}
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
          {iconName}

          <View
            style={{
              flex: 1,
              height: 44,
              marginLeft: 4,
              marginRight: 6,
            }}>
            <Heading
              type="h4"
              text={data.name || ''}
              numberOfLines={1}
              ellipsizeMode="tail"
              styleText={{
                marginTop: 4,
                fontFamily: 'sans-serif-normal',
                fontSize: 18,
              }}
            />
          </View>
          {pictureLoading ? null : (
            <TouchableOpacity onPress={() => onEditPress(data, picture)}>
              <Image
                style={{width: 22, height: 22}}
                source={require('@asset/icons/pencil-grey.png')}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{backgroundColor: 'white ', flex: 1, paddingVertical: 8}}>
          <PetDetailInfo label="Ras : " value={data.breed || '-'} />
          <PetDetailInfo
            label="Usia : "
            value={parseDateFromNow(
              moment(data.dateOfBirth || data.date_of_birth, 'DD-MM-YYYY'),
            )}
          />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            height: 32,
            flexDirection: 'row',
          }}>
          <Badge
            icon={data.sex ? Sex.getIcon(data.sex) : null}
            text={Sex.translate(data.sex) || '-'}
          />
          <View style={{marginHorizontal: 4}} />
          <Badge
            icon={require('@asset/icons/weight.png')}
            text={`${data.weight || 0} Kg`}
          />
        </View>
      </View>
    </View>
  );
};

export default PetItemCard;
