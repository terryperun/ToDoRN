import React from 'react';
import {
  View,
  Text,
  CheckBox,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import s from './styles';

const ItemView = ({
  isEditing,
  textItem,
  onSubmit,
  onPress,
  setTextItem,
  onLongPress,
  completedStatus,
  setCompletedStatus,
}) => {
  const editingField = isEditing ? (
    <View style={s.containerEditing}>
      <View style={s.containerInput}>
        <TextInput
          autoFocus
          onChangeText={(text) => setTextItem(text)}
          value={textItem}
          onSubmitEditing={onSubmit}
        />
      </View>
    </View>
  ) : (
    <View style={s.task}>
      <Text style={completedStatus ? s.completedTask : s.textTask}>
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
          value={completedStatus}
          //  disabled={completed}
          onValueChange={setCompletedStatus}
          style={s.checkbox}
        />
      </View>
      {editingField}
    </TouchableOpacity>
  );
};

export default ItemView;
