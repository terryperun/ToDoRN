import { connect } from 'react-redux';
import {
  compose,
  withHandlers,
  withState,
  hoistStatics,
  lifecycle,
} from 'recompose';
import HomeScreenView from './HomeScreenView';
import { todoOperations } from '../../modules/todo';

const mapStateToProps = (state) => ({
  itemsTodo: state.todo.items,
  stateItems: state,
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
  lifecycle({
    componentDidMount() {
      this.props.allTodo();
    },
  }),
  // withState('data', 'setData', (props) => props.allTodo()),
  withState('data', 'setData', (props) => props.itemsTodo),
  withHandlers({
    addTodo: (props) => () => {
      // props.addTodo(props.inputTask);
      console.log(
        'PROPS-----------------------------------------------',
        props.stateItems,
        props,
      );
    },
  }),
);

export default hoistStatics(enhance)(HomeScreenView);
