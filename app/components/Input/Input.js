import React from 'react';
import { TextInput } from 'recompose';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import s from './styles';

const Input = (props) => (
  <View style={s.containerInput}>
    <MaterialCommunityIcons name="plus" size={30} style={s.icon} />
    <TextInput {...props} />
  </View>
);

export default Input;
