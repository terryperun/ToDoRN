import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CheckBox from 'react-native-check-box';

import s from './styles';

const TodoItemView = ({
  isEditing,
  setIsEditing,
  textItem,
  completed,
  onSubmit,
  onPress,
  setTextItem,
  onLongPress,
}) => {
  const editingField = isEditing ? (
    <View style={s.containerInput}>
      <TextInput
        autoFocus
        onChangeText={(text) => setTextItem(text)}
        value={textItem}
        onSubmitEditing={() => onSubmit()}
        style={s.textInput}
      />
    </View>
  ) : (
    <View style={s.task}>
      <Text style={completed ? s.completedTask : s.textTask}>
        {textItem}
      </Text>
    </View>
  );
  return (
    <TouchableOpacity
      style={s.container}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={s.checkBoxContainer}>
        <CheckBox
          style={s.CheckBox}
          isChecked={completed}
          onClick={() => onSubmit(!completed)}
          checkBoxColor="#757575"
        />
      </View>
      {editingField}
    </TouchableOpacity>
  );
};

export default TodoItemView;
