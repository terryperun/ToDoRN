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
  withState('textItem', 'setTextItem', (props) => props.item.text),
  withHandlers({
    onSubmit: (props) => (value) => {
      if (props.textItem.trim().length > 0) {
        props.setIsEditing(false);

        if (typeof value === 'boolean') {
          LayoutAnimation.easeInEaseOut();
        }

        props.item.updateText.run(props.textItem);
        props.navigation.setParams({
          showDone: false,
        });
      } else {
        props.setIsEditing(false);
        props.navigation.setParams({
          showDone: false,
        });
        props.setTextItem(props.item.text);
      }
    },
  }),
  withHandlers({
    onPress: (props) => () => {
      if (props.navigation.getParam('headerMode') === 'action') {
        props.item.toggleSelection();
      } else if (props.item.completed) {
        LayoutAnimation.easeInEaseOut();
        props.item.toggleCompleted.run();
      } else {
        props.setIsEditing(true);
        props.navigation.setParams({
          showDone: true,
          onDonePress: () => props.onSubmit(),
        });
      }
    },
    dismissEditing: (props) => () => {
      props.navigation.setParams({
        showDone: false,
      });
      props.setIsEditing(false);
    },
    onSubmitEditing: (props) => () => {
      if (props.textItem.trim().length > 0) {
        props.onSubmit();
      }
    },
    onActivateSelectionMode: (props) => () => {
      props.onActivateSelectionMode();
      props.item.toggleSelection();
    },
    toggleCompleted: (props) => () => {
      LayoutAnimation.easeInEaseOut();
      props.item.toggleCompleted.run();
    },
  }),
);

export default hoistStatics(enhance)(TodoItemView);
