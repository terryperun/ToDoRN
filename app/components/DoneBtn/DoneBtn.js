import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import s from './styles';

const DoneBtn = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={s.container}>
    <Text>Done</Text>
  </TouchableOpacity>
);

export default DoneBtn;
