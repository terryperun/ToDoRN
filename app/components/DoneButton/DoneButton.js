import React from 'react';
import { Text } from 'react-native';
import s from './styles';
import { Touchable } from '../../components';

const DoneButton = ({ onPress }) => (
  <Touchable onPress={onPress} style={s.container}>
    <Text style={s.text}>Done</Text>
  </Touchable>
);

export default DoneButton;
