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
  pure,
} from 'recompose';
import { LayoutAnimation } from 'react-native';
import { inject, observer } from 'mobx-react/custom';
import HomeScreenView from './HomeScreenView';
import { todoOperations } from '../../modules/todo';
import { setParamOnChange } from '../../utils/enhancers';
import { AlertService } from '../../services';

const mapStateToProps = (state) => ({
  // todoItems: state.todo.items,
  stateItems: state,
  // isLoading: state.todo.isLoading,
});

const createSelectedState = (arr, selectedId) =>
  arr.reduce((acc, current) => {
    acc[current.id] = current.id === selectedId;
    return acc;
  }, {});

const enhance = compose(
  inject(({ todo }) => ({
    todoItems: todo.list.asArray,
    sections: todo.sections,
    getAll: todo.getAll,
    addTodo: todo.add,
    hasNetworkActivity: todo.hasNetworkActivity,
  })),
  observer,
  connect(
    mapStateToProps,
    {
      removeTodo: todoOperations.removeTodo,
      removeMany: todoOperations.removeMany,
    },
  ),
  withState('newTaskInputText', 'setNewTaskInputText', ''),
  withState('selectionMode', 'setSelectionMode', false),

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
    inputRef: React.createRef(),
  })),
  lifecycle({
    componentDidMount() {
      this.props.getAll.run();
    },
  }),
  withHandlers({
    addTodo: (props) => () => {
      const trimmed = props.newTaskInputText.trim();
      if (trimmed.length > 0) {
        LayoutAnimation.easeInEaseOut();

        props.addTodo.run(trimmed);
        props.setNewTaskInputText('');
      }

      props.inputRef.current.blur();
    },
    hideAllTodos: (props) => () => {
      const ids = props.sections.done.map((i) => i.id);
      AlertService.delete(() => {
        LayoutAnimation.easeInEaseOut();
        props.removeMany(ids);
      });
    },

    removeTodo: (props) => (id) => {
      LayoutAnimation.easeInEaseOut();
      props.removeTodo(id);
    },

    removeTodos: (props) => () => {
      const ids = Object.entries(props.selected).reduce(
        (acc, [key, value]) => {
          if (value) {
            acc.push(key);
          }
          return acc;
        },
        [],
      );

      LayoutAnimation.easeInEaseOut();
      props.removeMany(ids);
    },
  }),

  withHandlers({
    showBtnDone: (props) => () => {
      props.navigation.setParams({
        showDone: true,
        onDonePress: props.addTodo,
        buttonText: 'Add',
      });
    },

    hideBtnDone: (props) => () => {
      props.navigation.setParams({
        showDone: false,
        buttonText: null,
      });
    },
    activateSelectionMode: (props) => (id) => {
      props.navigation.setParams({
        headerMode: 'action',
        onCancel: () => {
          props.resetSelectionState();
          props.navigation.setParams({ headerMode: 'regular' });
          props.setSelectionMode(false);
        },
        onDeleteItems: () => {
          props.removeTodos();
          props.setSelectionMode(false);
          props.navigation.setParams({ headerMode: 'regular' });
          props.resetSelectionState();
        },
      });
      props.updateSelectedState(id);
      props.setSelectionMode(true);
    },
  }),
  setParamOnChange('hasNetworkActivity'),
  setParamOnChange('selectedCount'),
  pure,
);

export default hoistStatics(enhance)(HomeScreenView);
