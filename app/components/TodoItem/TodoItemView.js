import React from 'react';
import { View, Text, TextInput } from 'react-native';
import CheckBox from 'react-native-check-box';
import Swipeout from 'react-native-swipeout';
import { MaterialIcons } from '@expo/vector-icons';

import { Touchable } from '../../components';
import s from './styles';
import { colors } from '../../styles';
import { observer } from 'mobx-react/custom';

const TodoItemView = observer(
  ({
    isEditing,
    setIsEditing,
    textItem,
    item,
    onSubmit,
    onPress,
    setTextItem,
    onLongPress,
    onSubmitEditing,
    onActivateSelectionMode,
    selectionMode,
    dismissEditing,
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
          onBlur={dismissEditing}
        />
      </View>
    ) : (
      <View style={s.task}>
        <Text style={item.completed ? s.completedTask : s.textTask}>
          {textItem}
        </Text>
      </View>
    );
    const swipeSettings = {
      autoClose: true,
      right: [
        {
          onPress: () => item.remove.run(),
          text: 'Delete',
          backgroundColor: colors.danger,
          color: colors.white,
        },
      ],
      disabled: selectionMode,
    };
    let icon;
    if (selectionMode) {
      icon = (
        <MaterialIcons
          name={
            item.isSelected
              ? 'check-circle'
              : 'radio-button-unchecked'
          }
          size={24}
          style={s.CheckBox}
          color={item.isSelected ? colors.accent : colors.gray}
        />
      );
    } else {
      icon = (
        <CheckBox
          style={s.CheckBox}
          isChecked={item.completed}
          onClick={item.toggleCompleted.run}
          checkBoxColor={colors.icon}
        />
      );
    }
    return (
      <Swipeout {...swipeSettings}>
        <Touchable
          onPress={onPress}
          onLongPress={onActivateSelectionMode}
        >
          <View style={[s.container, item.isSelected && s.selected]}>
            <View style={s.checkBoxContainer}>{icon}</View>
            {editingField}
          </View>
        </Touchable>
      </Swipeout>
    );
  },
);

export default TodoItemView;
