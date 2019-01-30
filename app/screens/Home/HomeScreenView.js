import React from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import s from './styles';
import { TodoItem, DoneButton } from '../../components';

const HomeScreenView = ({
  setNewTaskInputText,
  newTaskInputText,
  addTodo,
  itemsTodo,
  showBtnDone,
  hideBtnDone,
  inputRef,
  removeTodo,
  updateTodo,
}) => {
  const elementsArray = itemsTodo.map((item) => {
    if (item.completed === true) {
      return undefined;
    }
    return (
      <TodoItem
        key={item.id}
        text={item.text}
        completed={item.completed}
        style={s.task}
        onLongPress={() => removeTodo(item.id)}
        id={item.id}
        updateTodo={updateTodo}
      />
    );
  });
  const doneElementsArray = itemsTodo.map((item) => {
    if (item.completed !== true) {
      return undefined;
    }
    return (
      <TodoItem
        key={item.id}
        text={item.text}
        completed={item.completed}
        style={s.task}
        onLongPress={() => removeTodo(item.id)}
        id={item.id}
        updateTodo={updateTodo}
      />
    );
  });
  return (
    <ScrollView style={s.container}>
      <View style={s.containerInput}>
        <MaterialCommunityIcons
          name="plus"
          size={30}
          style={s.icon}
        />
        <TextInput
          placeholder="Add item"
          style={s.textInput}
          onChangeText={setNewTaskInputText}
          value={newTaskInputText}
          onFocus={showBtnDone}
          onBlur={hideBtnDone}
          onSubmitEditing={addTodo}
          ref={inputRef}
        />
      </View>
      {elementsArray}
      <TouchableOpacity style={s.touchableBtn}>
        <Text style={s.touchableBtnText}>HIDE CHECKED-OFF ITEMS</Text>
      </TouchableOpacity>
      {doneElementsArray}
    </ScrollView>
  );
};

HomeScreenView.navigationOptions = ({ navigation }) => {
  let headerRight;
  if (navigation.getParam('isLoading')) {
    headerRight = (
      <ActivityIndicator
        size={30}
        color="#B71C1C"
        style={s.activityIndicator}
      />
    );
  } else if (navigation.getParam('showDone')) {
    headerRight = (
      <DoneButton
        onPress={navigation.getParam('onDonePress')}
        style={s.doneButton}
      />
    );
  }
  return {
    title: 'My shopping list',
    headerRight,
    headerTitleStyle: {
      elevation: 6,
    },
    headerStyle: {
      elevation: 0,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: '#d6d7da',
    },
  };
};

export default HomeScreenView;
