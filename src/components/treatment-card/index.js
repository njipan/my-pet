import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Box, Colors, Mixins, Typography} from '@style';

const TreatmentCard = (props) => {
  const {
    styleRoot = {},
    icon,
    name = null,
    description = null,
    price = null,
  } = props;
  return (
    <View
      style={{
        ...Box.CONTAINER_CARD,
        backgroundColor: Colors.WHITE,
        flexDirection: 'row',
        ...Mixins.padding(16),
        marginBottom: 14,
        ...styleRoot,
        alignItems: 'center',
      }}>
      <View style={{flex: 1}}>
        <Text style={{...styles.text}}>{name}</Text>
        <Text
          style={{
            color: Colors.LIGHT_GREY,
            fontSize: 12,
            marginTop: 4,
            marginBottom: 4,
          }}>
          {description}
        </Text>
        <Text style={{...styles.text}}>{price}</Text>
      </View>
      {icon}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: 16,
    color: Colors.BLACK80,
  },
});

export default TreatmentCard;
