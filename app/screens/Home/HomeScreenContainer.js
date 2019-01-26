import React from 'react';
import { connect } from 'react-redux';
import {
  compose,
  withHandlers,
  withState,
  hoistStatics,
  lifecycle,
  withProps,
  withPropsOnChange,
} from 'recompose';
import HomeScreenView from './HomeScreenView';
import { todoOperations } from '../../modules/todo';

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
    },
  ),
  withState('newTaskInputText', 'setNewTaskInputText', ''),
  withProps(() => ({
    inputRef: React.createRef(),
  })),
  lifecycle({
    componentDidMount() {
      this.props.getAll();
    },
  }),
  withHandlers({
    addTodo: (props) => () => {
      props.addTodo(props.newTaskInputText);
      // props.inputRef.blur();
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
      props.navigation.setParams({ showDone: false });
    },
  }),
  withPropsOnChange(['isLoading'], (props) => {
    props.navigation.setParams({ isLoading: props.isLoading });
  }),
);

export default hoistStatics(enhance)(HomeScreenView);
