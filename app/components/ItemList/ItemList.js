import React from 'react';
import { View, Text, CheckBox } from 'react-native';
import s from './styles';

const ItemList = ({ textTask, completed }) => (
  <View style={s.container}>
    <View style={s.checkBox}>
      <CheckBox value={completed} disabled={completed} />
    </View>
    <View style={s.task}>
      <Text style={completed ? s.completedTask : s.textTask}>
        {textTask}
      </Text>
    </View>
  </View>
);

export default ItemList;
