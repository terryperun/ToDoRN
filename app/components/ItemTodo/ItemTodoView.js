import React from 'react';
import {
  View,
  Text,
  CheckBox,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import s from './styles';

const ItemTodoView = ({
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
        onSubmitEditing={onSubmit}
        style={s.textInput}
      />
    </View>
  ) : (
    <View style={s.task}>
      <Text style={s.textTask}>{textItem}</Text>
    </View>
  );
  return (
    <TouchableOpacity
      style={s.container}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={s.checkBox}>
        <CheckBox value={completed} disabled={completed} />
      </View>
      {editingField}
    </TouchableOpacity>
  );
};

export default ItemTodoView;
