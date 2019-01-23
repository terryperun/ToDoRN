import React from 'react';
import { View, Text, CheckBox } from 'react-native';
import s from './styles';

const ItemList = ({ task, completed }) => (
  <View style={s.container}>
    <View style={s.checkBox}>
      <CheckBox value={completed} />
    </View>
    <View style={s.task}>
      <Text style={completed ? s.completedTask : null}>{task}</Text>
    </View>
  </View>
);

export default ItemList;
