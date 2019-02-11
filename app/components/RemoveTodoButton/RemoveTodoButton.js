import React from 'react';
import { Text, View } from 'react-native';
import { Touchable } from '../../components';
import s from './styles';

const RemoveTodoButton = ({ onPress }) => (
  <Touchable onPress={onPress}>
    <View style={s.container}>
      <Text style={s.buttonText}>REMOVE CHECKED-OFF ITEMS</Text>
    </View>
  </Touchable>
);

export default RemoveTodoButton;
