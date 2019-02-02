import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  SectionList,
  StatusBar,
  Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import s from './styles';
import {
  TodoItem,
  DoneButton,
  AddTodoInput,
  HideTodoButton,
} from '../../components';
import { colors } from '../../styles';

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
  sections,
  hideAllTodos,
}) => {
  const listSections = [
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
      data: sections.new,
    },
    {
      headerSection: () => <HideTodoButton onPress={hideAllTodos} />,
      data: sections.done,
    },
  ];

  return (
    <SectionList
      renderScrollComponent={Platform.select({
        ios: (props) => <KeyboardAwareScrollView {...props} />,
      })}
      renderSectionHeader={({ section }) =>
        section.headerSection && section.headerSection()
      }
      style={s.container}
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
      sections={listSections}
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
        size="small"
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
      backgroundColor: colors.white,
      marginTop:
        Platform.OS === 'ios' ? null : -StatusBar.currentHeight,
    },
  };
};

export default HomeScreenView;
