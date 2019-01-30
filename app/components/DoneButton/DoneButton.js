import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import s from './styles';

const DoneButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={s.container}>
    <Text style={s.text}>Done</Text>
  </TouchableOpacity>
);

export default DoneButton;
