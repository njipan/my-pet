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
    disabled = false,
  } = props;
  return (
    <View
      style={{
        ...Box.CONTAINER_CARD,
        elevation: null,
        backgroundColor: disabled ? Colors.BLACK10 : Colors.WHITE,
        flexDirection: 'row',
        ...Mixins.padding(16),
        marginBottom: 14,
        alignItems: 'center',
        borderColor: Colors.SHADOW,
        borderWidth: 1,
        ...styleRoot,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: disabled ? Colors.BLACK10 : Colors.WHITE,
        }}>
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
