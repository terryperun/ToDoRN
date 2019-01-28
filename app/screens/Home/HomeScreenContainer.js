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
import AlertService from '../../services/AlertService';

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
    },
  ),
  withState('newTaskInputText', 'setNewTaskInputText', ''),
  withProps({ inputRef: React.createRef() }),
  withState('isEditing', 'setIsEditing', false),
  lifecycle({
    componentDidMount() {
      this.props.getAll();
    },
  }),
  withHandlers({
    addTodo: (props) => () => {
      props.addTodo(props.newTaskInputText);
      props.inputRef.current.blur();
      props.setNewTaskInputText('');
    },

    toggleEditing: (props) => () => {
      console.log('toggle====================', props.isEditing);
      props.setIsEditing(!props.isEditing);
      console.log('toggle==============222222', props.isEditing);
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
      props.navigation.setParams({ showDone: false });
    },
  }),
  setParamOnChange('isLoading'),
);

export default hoistStatics(enhance)(HomeScreenView);
