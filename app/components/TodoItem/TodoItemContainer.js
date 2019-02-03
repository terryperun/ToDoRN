import {
  compose,
  withState,
  hoistStatics,
  withHandlers,
} from 'recompose';
import { withNavigation } from 'react-navigation';
import { LayoutAnimation } from 'react-native';

import TodoItemView from './TodoItemView';

const enhance = compose(
  withNavigation,
  withState('isEditing', 'setIsEditing', false),
  withState('textItem', 'setTextItem', (props) => props.text),
  withHandlers({
    onSubmit: (props) => (value) => {
      if (props.textItem.trim().length > 0) {
        props.setIsEditing(false);

        if (typeof value === 'boolean') {
          LayoutAnimation.easeInEaseOut();
        }

        props.updateTodo(props.id, {
          text: props.textItem,
          completed: value,
        });
        props.navigation.setParams({
          showDone: false,
        });
      } else {
        props.setIsEditing(false);
        props.navigation.setParams({
          showDone: false,
        });
        props.setTextItem(props.text);
      }
    },
  }),
  withHandlers({
    onPress: (props) => () => {
      if (props.navigation.getParam('headerMode') === 'action') {
        props.onSelect(props.id, !props.isSelected);
      } else if (props.completed) {
        LayoutAnimation.easeInEaseOut();
        props.updateTodo(props.id, {
          completed: false,
        });
      } else {
        props.setIsEditing(true);
        props.navigation.setParams({
          showDone: true,
          onDonePress: () => props.onSubmit(),
        });
      }
    },
    onSubmitEditing: (props) => () => {
      if (props.textItem.trim().length > 0) {
        props.onSubmit();
      }
    },
  }),
);

export default hoistStatics(enhance)(TodoItemView);
