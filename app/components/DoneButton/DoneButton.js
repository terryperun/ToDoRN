import React from 'react';
import { Text, View } from 'react-native';
import s from './styles';
import { Touchable } from '../../components';

const DoneButton = ({ onPress }) => (
  <Touchable onPress={onPress}>
    <View style={s.container}>
      <Text style={s.text}>Done</Text>
    </View>
  </Touchable>
);

export default DoneButton;
