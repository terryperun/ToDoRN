import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  SectionList,
} from 'react-native';

import s from './styles';
import {
  TodoItem,
  DoneButton,
  AddTodoInput,
  HideTodoButton,
} from '../../components';

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
  const sections = itemsTodo.reduce(
    ([newTodos, doneTodos], item) => {
      if (!item.completed) {
        newTodos.data.push(item);
      } else {
        doneTodos.data.push(item);
      }
      return [newTodos, doneTodos];
    },
    [
      {
        headerSection: () => (
          <AddTodoInput
            placeholder="Add item"
            onChangeText={setNewTaskInputText}
            value={newTaskInputText}
            onFocus={showBtnDone}
            onBlur={hideBtnDone}
            onSubmitEditing={addTodo}
            ref={inputRef}
          />
        ),
        data: [],
      },
      {
        headerSection: () => <HideTodoButton />,
        data: [],
      },
    ],
  );
  return (
    <SectionList
      renderSectionHeader={({ section }) =>
        section.headerSection && section.headerSection()
      }
      renderItem={({ item }) => (
        <TodoItem
          key={item.id}
          text={item.text}
          completed={item.completed}
          style={s.task}
          onLongPress={() => removeTodo(item.id)}
          id={item.id}
          updateTodo={updateTodo}
        />
      )}
      sections={sections}
      keyExtractor={(item) => item.id}
      stickySectionHeadersEnabled
    />
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
