import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import s from './styles';

const HideTodoButton = () => (
  <TouchableOpacity style={s.container}>
    <Text style={s.buttonText}>HIDE CHECKED-OFF ITEMS</Text>
  </TouchableOpacity>
);

export default HideTodoButton;
