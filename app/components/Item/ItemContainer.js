import { connect } from 'react-redux';
import {
  compose,
  withState,
  hoistStatics,
  withHandlers,
} from 'recompose';
import { withNavigation } from 'react-navigation';

import ItemView from './ItemView';
import { todoOperations } from '../../modules/todo';

const mapStateToProps = (state) => ({});

const enhance = compose(
  connect(
    mapStateToProps,
    {
      updateTodo: todoOperations.updateTodo,
    },
  ),
  withState('isEditing', 'setIsEditing', false),
  withState('textItem', 'setTextItem', (props) => props.text),
  withHandlers({
    onSubmit: (props) => () => {
      props.setIsEditing(false);
      props.updateTodo(props.id, props.textItem);
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

export default withNavigation(hoistStatics(enhance)(ItemView));
