import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import s from './styles';

const DoneBtn = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={s.container}>
    <Text style={s.text}>Done</Text>
  </TouchableOpacity>
);

export default DoneBtn;
