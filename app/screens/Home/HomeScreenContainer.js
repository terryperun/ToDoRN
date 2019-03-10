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

const enhance = compose(
  inject(({ todo }) => ({
    todoItems: todo.list.asArray,
    selectedCount: todo.selectedCount,
    sections: todo.sections,
    getAll: todo.getAll,
    addTodo: todo.add,
    unselectAll: todo.unselectAll,
    hasNetworkActivity: todo.hasNetworkActivity,
  })),
  observer,
  connect(
    mapStateToProps,
    {
      removeMany: todoOperations.removeMany,
    },
  ),
  withState('newTaskInputText', 'setNewTaskInputText', ''),
  withState('selectionMode', 'setSelectionMode', false),

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
