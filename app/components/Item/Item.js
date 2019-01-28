import React from 'react';
import { View, Text, CheckBox, TouchableOpacity } from 'react-native';
import s from './styles';

const Item = ({ text, completed, onLongPress }) => (
  <TouchableOpacity style={s.container} onLongPress={onLongPress}>
    <View style={s.checkBox}>
      <CheckBox value={completed} disabled={completed} />
    </View>
    <View style={s.task}>
      <Text style={completed ? s.completedTask : s.textTask}>
        {text}
      </Text>
    </View>
  </TouchableOpacity>
);

export default Item;
