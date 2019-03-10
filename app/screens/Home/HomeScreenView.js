import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  SectionList,
  StatusBar,
  Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { observer } from 'mobx-react/custom';

import s from './styles';
import {
  TodoItem,
  AddTodoInput,
  RemoveTodoButton,
} from '../../components';
import { colors } from '../../styles';
import createTodoListHeader from './component/Headers/TodoListHeader';
import createListActionsHeader from './component/Headers/ListActionsHeader';

const HomeScreenView = observer(
  ({
    setNewTaskInputText,
    newTaskInputText,
    addTodo,
    todoItems,
    showBtnDone,
    hideBtnDone,
    inputRef,
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
        headerSection: () =>
          (sections.done.length > 0 ? (
            <RemoveTodoButton onPress={hideAllTodos} />
          ) : null),
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
            item={item}
            style={s.task}
            isSelected={selected[item.id]}
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
  },
);

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
      borderBottomColor: colors.border,
      backgroundColor: colors.white,
      marginTop:
        Platform.OS === 'ios' ? null : -StatusBar.currentHeight,
    },
    ...customHeaderProps,
  };
};

export default HomeScreenView;
