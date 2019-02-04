import React from 'react';
import { View, Text, TextInput } from 'react-native';
import CheckBox from 'react-native-check-box';
import Swipeout from 'react-native-swipeout';
import { MaterialIcons } from '@expo/vector-icons';

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
  onActivateSelectionMode,
  onSelect,
  isSelected,
  selectionMode,
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
    disabled: selectionMode,
  };
  const checkBox = isSelected ? (
    <MaterialIcons
      name="check-circle"
      size={25}
      style={s.CheckBox}
      color={colors.accent}
    />
  ) : (
    <CheckBox
      style={s.CheckBox}
      isChecked={completed}
      onClick={() => onSubmit(!completed)}
      checkBoxColor={colors.icon}
    />
  );
  return (
    <Swipeout {...swipeSettings}>
      <Touchable
        onPress={onPress}
        onLongPress={() => onActivateSelectionMode(id)}
      >
        <View style={[s.container, isSelected && s.selected]}>
          <View style={s.checkBoxContainer}>{checkBox}</View>
          {editingField}
        </View>
      </Touchable>
    </Swipeout>
  );
};

export default TodoItemView;
