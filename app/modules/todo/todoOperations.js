import * as actions from './todoActions';
import Api from '../../api/Api';

export const addTodo = (textTask) => async (dispatch) => {
  dispatch(actions.addTodoStart());

  const createTask = (item) => ({
    task: item.task || '',
    completed: false,
  });
  const task = createTask(textTask);

  try {
    const newTask = await Api.add(task);
    dispatch(actions.addTodoOk(newTask));
  } catch (error) {
    dispatch(actions.addTodoError({ message: error.message }));
  }
};
