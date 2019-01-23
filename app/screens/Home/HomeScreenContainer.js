import { connect } from 'react-redux';
import { compose, withHandlers, withState } from 'recompose';
import HomeScreenView from './HomeScreenView';
import { todoOperation } from '../../modules/todo';

const mapStateToProps = (state) => ({
  items: state.todo.items,
});

const enhance = compose(
  connect(
    mapStateToProps,
    // { addTodo: todoOperation.addTodo },
  ),
  withState('inputTask', 'setInputTask', ''),
  withHandlers({
    addTodo: (props) => () => {
      // props.addTodoInList(props.inputTask);
      console.log('PROPS------------', props);
    },
  }),
);

export default enhance(HomeScreenView);
