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
  lifecycle({
    componentDidMount() {
      this.props.allTodo();
    },
  }),
  withHandlers({
    addTodo: (props) => () => {
      props.addTodo(props.inputTask);
      // console.log('PROPS--STATE', props.stateItems);
      // console.log('PROPS-----DATA', props);
    },
  }),
);

export default hoistStatics(enhance)(HomeScreenView);
