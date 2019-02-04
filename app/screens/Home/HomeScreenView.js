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
  AddTodoInput,
  HideTodoButton,
} from '../../components';
import { colors } from '../../styles';
import createTodoListHeader from './component/Headers/TodoListHeader';
import createListActionsHeader from './component/Headers/ListActionsHeader';

const HomeScreenView = ({
  setNewTaskInputText,
  newTaskInputText,
  addTodo,
  todoItems,
  showBtnDone,
  hideBtnDone,
  inputRef,
  removeTodo,
  updateTodo,
  sections,
  hideAllTodos,
  selected,
  updateSelectedState,
  activateSelectionMode,
  setSelectedStatus,
  selectionMode,
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
          editable={!selectionMode}
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
          text={item.text}
          completed={item.completed}
          style={s.task}
          id={item.id}
          isSelected={selected[item.id]}
          updateTodo={updateTodo}
          removeTodo={removeTodo}
          updateSelectedState={updateSelectedState}
          onActivateSelectionMode={activateSelectionMode}
          onSelect={setSelectedStatus}
          selectionMode={selectionMode}
        />
      )}
      sections={listSections}
      keyExtractor={(item) => item.id}
      stickySectionHeadersEnabled
    />
  );
};

const getHeader = (navigation) => {
  switch (navigation.getParam('headerMode')) {
    case 'action':
      return createListActionsHeader(navigation);
    case 'regular':
    default:
      return createTodoListHeader(navigation);
  }
};

HomeScreenView.navigationOptions = ({ navigation }) => {
  const customHeaderProps = getHeader(navigation);

  return {
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
    ...customHeaderProps,
  };
};

export default HomeScreenView;
