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
  withHandlers({
    onSubmit: (props) => (value) => {
      props.setIsEditing(false);
      props.updateTodo(props.id, {
        text: props.textItem,
        completed: value,
      });
      props.navigation.setParams({
        showDone: false,
      });
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
