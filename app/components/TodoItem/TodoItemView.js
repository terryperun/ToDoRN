import React from 'react';
import { View, Text, TextInput } from 'react-native';
import CheckBox from 'react-native-check-box';
import Swipeout from 'react-native-swipeout';

import { Touchable } from '../../components';
import s from './styles';
import { colors } from '../../styles';

const TodoItemView = ({
  id,
  isEditing,
  setIsEditing,
  textItem,
  completed,
  onSubmit,
  onPress,
  setTextItem,
  onLongPress,
  onSubmitEditing,
  removeTodo,
}) => {
  const editingField = isEditing ? (
    <View style={s.containerInput}>
      <TextInput
        autoFocus
        onChangeText={(text) => setTextItem(text)}
        value={textItem}
        onSubmitEditing={onSubmitEditing}
        style={s.textInput}
        blurOnSubmit={false}
      />
    </View>
  ) : (
    <View style={s.task}>
      <Text style={completed ? s.completedTask : s.textTask}>
        {textItem}
      </Text>
    </View>
  );
  const swipeSettings = {
    autoClose: true,
    right: [
      {
        onPress: () => removeTodo(id),
        text: 'Delete',
        backgroundColor: colors.danger,
        color: colors.white,
      },
    ],
  };

  return (
    <Swipeout {...swipeSettings}>
      <Touchable onPress={onPress}>
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
    </Swipeout>
  );
};

export default TodoItemView;
