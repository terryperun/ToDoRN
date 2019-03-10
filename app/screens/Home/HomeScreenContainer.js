import React from 'react';
import {
  compose,
  withHandlers,
  withState,
  hoistStatics,
  lifecycle,
  withProps,
  pure,
} from 'recompose';
import { LayoutAnimation } from 'react-native';
import { inject, observer } from 'mobx-react/custom';
import HomeScreenView from './HomeScreenView';
import { setParamOnChange } from '../../utils/enhancers';
import { AlertService } from '../../services';

const enhance = compose(
  inject(({ todo }) => ({
    todoItems: todo.list.asArray,
    selectedCount: todo.selectedCount,
    sections: todo.sections,
    getAll: todo.getAll,
    addTodo: todo.add,
    removeSelected: todo.removeSelected,
    removeDone: todo.removeDone,
    removeMany: todo.removeMany,
    unselectAll: todo.unselectAll,
    hasNetworkActivity: todo.hasNetworkActivity,
  })),
  observer,
  withState('newTaskInputText', 'setNewTaskInputText', ''),
  withState('selectionMode', 'setSelectionMode', false),

  withProps({
    inputRef: React.createRef(),
  }),
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
      AlertService.delete(() => {
        LayoutAnimation.easeInEaseOut();
        props.removeDone();
      });
    },

    removeTodos: (props) => () => {
      LayoutAnimation.easeInEaseOut();
      props.removeSelected();
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
    activateSelectionMode: (props) => () => {
      props.navigation.setParams({
        headerMode: 'action',
        onCancel: () => {
          props.navigation.setParams({ headerMode: 'regular' });
          props.setSelectionMode(false);
          props.unselectAll();
        },
        onDeleteItems: () => {
          props.setSelectionMode(false);
          props.navigation.setParams({ headerMode: 'regular' });
          props.removeTodos();
        },
      });

      props.setSelectionMode(true);
    },
  }),
  setParamOnChange('hasNetworkActivity'),
  setParamOnChange('selectedCount'),
  pure,
);

export default hoistStatics(enhance)(HomeScreenView);
