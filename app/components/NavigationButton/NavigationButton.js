import React from 'react';
import { Text, View } from 'react-native';
import s from './styles';
import { Touchable } from '../../components';

const getStyleByType = (type) => {
  switch (type) {
    case 'danger':
      return [s.text, s.dangerText];

    case 'default':
    default:
      return [s.text, s.defaultText];
  }
};
const NavigationButton = ({ text, onPress, type }) => (
  <Touchable onPress={onPress}>
    <View style={s.container}>
      <Text style={getStyleByType(type)}>{text}</Text>
    </View>
  </Touchable>
);

export default NavigationButton;
