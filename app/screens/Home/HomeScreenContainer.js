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
  withState('editTaskInputText', 'setEditTaskInputText', ''),
  withState('idItemIsEditing', 'setIdItemIsEditing', ''),
  // withState('isEditing', 'setIsEditing', false),
  withProps({ inputRef: React.createRef() }),
  lifecycle({
    componentDidMount() {
      this.props.getAll();
    },
  }),
  withHandlers({
    editTodo: (props) => (id) => {
      props.updateTodo(id, props.editTaskInputText);
      props.setIdItemIsEditing('');
    },
  }),
  withHandlers({
    addTodo: (props) => () => {
      props.addTodo(props.newTaskInputText);
      props.inputRef.current.blur();
      props.setNewTaskInputText('');
    },

    toggleEditing: (props) => (id, text) => {
      props.setIdItemIsEditing(id);
      props.setEditTaskInputText(text);
      // props.navigation.setParams({
      //   showEditDone: true,
      //   onDoneEdit: props.editTodo(id),
      // });
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
        // showEditDone: false,
      });
    },
  }),
  setParamOnChange('isLoading'),
);

export default hoistStatics(enhance)(HomeScreenView);
