import React from 'react';
import {
  View,
  Text,
  CheckBox,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import s from './styles';
import { TextInput } from 'react-native-gesture-handler';

const Item = ({
  text,
  completed,
  onLongPress,
  isEditing,
  toggleEditing,
}) => {
  const editingField = isEditing ? (
    <View style={s.container}>
      <View style={s.containerInput}>
        <TextInput autoFocus />
      </View>
    </View>
  ) : (
    <View style={s.task}>
      <Text style={completed ? s.completedTask : s.textTask}>
        {text}
      </Text>
    </View>
  );
  return (
    <TouchableOpacity
      style={s.container}
      onLongPress={onLongPress}
      onPress={toggleEditing}
    >
      <View style={s.checkBox}>
        <CheckBox value={completed} disabled={completed} />
      </View>
      {editingField}
    </TouchableOpacity>
  );
};

export default Item;
