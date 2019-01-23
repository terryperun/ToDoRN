import * as actions from './todoActions';
import Api from '../../api/Api';

export const addTodo = (item) => async (dispatch) => {
  dispatch(actions.addTodoStart());

  const createTask = (item) => ({
    task: item.task || '',
    completed: false,
  });
  const task = createTask(item);

  try {
    const newTask = await Api.add(task);
    dispatch(actions.addTodoOk(newTask));
  } catch (error) {
    dispatch(actions.addTodoError({ message: error.message }));
  }
};
