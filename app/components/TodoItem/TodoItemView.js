import React from 'react';
import { View, Text, TextInput } from 'react-native';
import CheckBox from 'react-native-check-box';

import { Touchable } from '../../components';
import s from './styles';
import { colors } from '../../styles';

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
    <Touchable onPress={onPress} onLongPress={onLongPress}>
      <View style={s.container}>
        <View style={s.checkBoxContainer}>
          <CheckBox
            style={s.CheckBox}
            isChecked={completed}
            onClick={() => onSubmit(!completed)}
            checkBoxColor={colors.icon}
          />
        </View>
        {editingField}
      </View>
    </Touchable>
  );
};

export default TodoItemView;
