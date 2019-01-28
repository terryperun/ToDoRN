import React from 'react';
import {
  View,
  Text,
  CheckBox,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import s from './styles';

const Item = ({
  text,
  completed,
  onLongPress,
  idItemIsEditing,
  toggleEditing,
  id,
  newTaskInputText,
  showBtnDone,
  hideBtnDone,
  addTodo,
  setNewTaskInputText,
}) => {
  const editingField =
    idItemIsEditing === id ? (
      <View style={s.containerEditing}>
        <View style={s.containerInput}>
          <TextInput
            autoFocus
            value={newTaskInputText}
            onFocus={showBtnDone}
            onBlur={hideBtnDone}
            onSubmitEditing={addTodo}
            onChangeText={setNewTaskInputText}
          />
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
      onPress={() => toggleEditing(id, text)}
    >
      <View style={s.checkBox}>
        <CheckBox value={completed} disabled={completed} />
      </View>
      {editingField}
    </TouchableOpacity>
  );
};

export default Item;
