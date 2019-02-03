import React from 'react';
import { connect } from 'react-redux';
import {
  compose,
  withHandlers,
  withState,
  hoistStatics,
  lifecycle,
  withProps,
  withStateHandlers,
} from 'recompose';
import { LayoutAnimation } from 'react-native';

import HomeScreenView from './HomeScreenView';
import { todoOperations } from '../../modules/todo';
import { setParamOnChange } from '../../utils/enhancers';

const mapStateToProps = (state) => ({
  todoItems: state.todo.items,
  stateItems: state,
  isLoading: state.todo.isLoading,
});

const createSelectedState = (arr, selectedId) =>
  arr.reduce((acc, current) => {
    acc[current.id] = current.id === selectedId;
    return acc;
  }, {});

const enhance = compose(
  connect(
    mapStateToProps,
    {
      addTodo: todoOperations.addTodo,
      getAll: todoOperations.getAll,
      removeTodo: todoOperations.removeTodo,
      updateTodo: todoOperations.updateTodo,
      removeMany: todoOperations.removeMany,
    },
  ),
  withState('newTaskInputText', 'setNewTaskInputText', ''),

  withStateHandlers(
    {
      selected: {
        // id: false,
      },
      selectedCount: 0,
    },
    {
      setSelectedStatus: (state) => (id, value) => ({
        selected: {
          ...state.selected,
          [id]: value,
        },
        selectedCount: state.selectedCount + (value ? +1 : -1),
      }),
      updateSelectedState: (_, props) => (id) => ({
        selected: createSelectedState(props.todoItems, id),
        selectedCount: 1,
      }),
      resetSelectionState: () => () => ({
        selected: {},
        selectedCount: 0,
      }),
    },
  ),

  withProps((props) => ({
    sections: props.todoItems.reduce(
      (acc, item) => {
        if (!item.completed) {
          acc.new.push(item);
        } else {
          acc.done.push(item);
        }
        return acc;
      },
      { done: [], new: [] },
    ),
    inputRef: React.createRef(),
  })),
  lifecycle({
    componentDidMount() {
      this.props.getAll();
    },
  }),
  withHandlers({
    addTodo: (props) => () => {
      const trimmed = props.newTaskInputText.trim();
      if (trimmed.length > 0) {
        LayoutAnimation.easeInEaseOut();

        props.addTodo(trimmed);
        props.setNewTaskInputText('');
      }

      props.inputRef.current.blur();
    },
    hideAllTodos: (props) => () => {
      const ids = props.sections.done.map((i) => i.id);
      props.removeMany(ids);
    },

    removeTodo: (props) => (id) => {
      LayoutAnimation.easeInEaseOut();
      props.removeTodo(id);
    },
  }),
  withHandlers({
    showBtnDone: (props) => () => {
      props.navigation.setParams({
        showDone: true,
        onDonePress: props.addTodo,
      });
    },

    hideBtnDone: (props) => () => {
      props.navigation.setParams({
        showDone: false,
      });
    },
    activateSelectionMode: (props) => (id) => {
      props.navigation.setParams({
        headerMode: 'action',
        onCancel: () => {
          props.resetSelectionState();
          props.navigation.setParams({ headerMode: 'regular' });
        },
      });
      props.updateSelectedState(id);
    },
  }),
  setParamOnChange('isLoading'),
  setParamOnChange('selectedCount'),
);

export default hoistStatics(enhance)(HomeScreenView);
