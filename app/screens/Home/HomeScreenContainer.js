import React from 'react';
import { connect } from 'react-redux';
import {
  compose,
  withHandlers,
  withState,
  hoistStatics,
  lifecycle,
  withProps,
} from 'recompose';
import HomeScreenView from './HomeScreenView';
import { todoOperations } from '../../modules/todo';
import { setParamOnChange } from '../../utils/enhancers';
import { AlertService } from '../../services';

const mapStateToProps = (state) => ({
  itemsTodo: state.todo.items,
  stateItems: state,
  isLoading: state.todo.isLoading,
});

const enhance = compose(
  connect(
    mapStateToProps,
    {
      addTodo: todoOperations.addTodo,
      getAll: todoOperations.getAll,
      removeTodo: todoOperations.removeTodo,
      updateTodo: todoOperations.updateTodo,
    },
  ),
  withState('newTaskInputText', 'setNewTaskInputText', ''),
  withProps({ inputRef: React.createRef() }),
  lifecycle({
    componentDidMount() {
      this.props.getAll();
    },
  }),
  withHandlers({
    addTodo: (props) => () => {
      const trimmed = props.newTaskInputText.trim();
      if (trimmed.length > 0) {
        props.addTodo(trimmed);
        props.setNewTaskInputText('');
      }

      props.inputRef.current.blur();
    },
  }),
  withHandlers({
    removeTodo: (props) => (id) => {
      AlertService.deleteAlert(() => props.removeTodo(id));
    },
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
  }),
  setParamOnChange('isLoading'),
);

export default hoistStatics(enhance)(HomeScreenView);
