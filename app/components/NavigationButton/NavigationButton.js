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
const NavigationButton = ({
  text, onPress, type, disabled,
}) => (
  <Touchable onPress={onPress} disabled={disabled}>
    <View style={s.container}>
      <Text style={[getStyleByType(type), disabled && s.disabled]}>
        {text}
      </Text>
    </View>
  </Touchable>
);

export default NavigationButton;
