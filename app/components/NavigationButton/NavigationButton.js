import React from 'react';
import { Text, View } from 'react-native';
import s from './styles';
import { Touchable } from '../../components';

const NavigationButton = ({ text, onPress }) => (
  <Touchable onPress={onPress}>
    <View style={s.container}>
      <Text style={s.text}>{text}</Text>
    </View>
  </Touchable>
);

export default NavigationButton;
