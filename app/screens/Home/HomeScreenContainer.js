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
      allTodo: todoOperations.getAll,
    },
  ),
  withState('inputTask', 'setInputTask', ''),
  withProps(() => ({
    ref: React.createRef(),
  })),
  lifecycle({
    componentDidMount() {
      this.props.allTodo();
    },
  }),
  withHandlers({
    addTodo: (props) => () => {
      props.addTodo(props.inputTask);
      // props.ref.blur();
    },

    onDonePress: (props) => () => {
      console.log('PRESS onDonePress');
      props.addTodo(props.inputTask);
    },

    showBtnDone: (props) => () => {
      props.navigation.setParams({
        showDone: true,
        onDonePress: props.onDonePress,
      });
      console.log('PRESS2', props);
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
