import React from 'react';
import { Text, View } from 'react-native';
import { Touchable } from '../../components';
import s from './styles';

const HideTodoButton = () => (
  <Touchable>
    <View style={s.container}>
      <Text style={s.buttonText}>HIDE CHECKED-OFF ITEMS</Text>
    </View>
  </Touchable>
);

export default HideTodoButton;
