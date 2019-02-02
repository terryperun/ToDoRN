import React from 'react';
import { TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import s from './styles';

const AddTodoInput = React.forwardRef(
  (
    {
      placeholder,
      onChangeText,
      value,
      onFocus,
      onBlur,
      onSubmitEditing,
    },
    ref,
  ) => (
    <View style={s.containerInput}>
      <MaterialCommunityIcons name="plus" size={30} style={s.icon} />
      <TextInput
        placeholder={placeholder}
        style={s.textInput}
        onChangeText={onChangeText}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        blurOnSubmit={false}
        onSubmitEditing={onSubmitEditing}
        ref={ref}
      />
    </View>
  ),
);

export default AddTodoInput;
