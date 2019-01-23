import { connect } from 'react-redux';
import { compose, withHandlers, withState } from 'recompose';
import HomeScreenView from './HomeScreenView';
import { todoOperations } from '../../modules/todo';

const mapStateToProps = (state) => ({
  itemsTodo: state.todo.items,
  stateItems: state.todo.items,
});

const enhance = compose(
  connect(
    mapStateToProps,
    { addTodo: todoOperations.addTodo },
  ),
  withState('inputTask', 'setInputTask', ''),
  withState('data', 'setData', (props) => props.itemsTodo),
  withHandlers({
    addTodo: (props) => () => {
      // props.addTodo(props.inputTask);
      console.log('PROPS------------', props.itemsTodo);
    },
  }),
);

export default enhance(HomeScreenView);
