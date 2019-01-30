import {
  compose,
  withState,
  hoistStatics,
  withHandlers,
} from 'recompose';
import { withNavigation } from 'react-navigation';

import TodoItemView from './TodoItemView';

const enhance = compose(
  withNavigation,
  withState('isEditing', 'setIsEditing', false),
  withState('textItem', 'setTextItem', (props) => props.text),
  withState(
    'completedStatus',
    'setCompletedStatus',
    (props) => props.completed,
  ),
  withHandlers({
    onSubmit: (props) => () => {
      props.setIsEditing(false);
      props.updateTodo(props.id, props.textItem, props.completedItem);
      props.navigation.setParams({
        showDone: false,
      });
      // console.log(
      //   '============================================',
      //   props.completedItem,
      // );
    },
  }),
  withHandlers({
    onPress: (props) => () => {
      props.setIsEditing(true);

      props.navigation.setParams({
        showDone: true,
        onDonePress: () => props.onSubmit(),
      });
    },
  }),
);

export default hoistStatics(enhance)(TodoItemView);
