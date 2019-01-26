import * as actions from './todoActions';
import Api from '../../api/Api';
import { createTask } from '../../utils/creators';

export const addTodo = (textTask) => async (dispatch) => {
  const task = createTask(textTask);
  dispatch(actions.addTodoStart(task));

  try {
    const newTask = await Api.add(task);
    const { id } = task;

    dispatch(actions.addTodoOk({ newTask, id }));
  } catch (error) {
    dispatch(actions.addTodoError({ message: error.message }));
  }
};

export const getAll = () => async (dispatch) => {
  dispatch(actions.getAllTodosStart());

  try {
    const allTodos = await Api.getAll();
    dispatch(actions.getAllTodosOk(allTodos));
  } catch (error) {
    dispatch(actions.getAllTodosError({ message: error.message }));
  }
};

export const removeTodo = (id) => async (dispatch) => {
  dispatch(actions.removeTodoStart());
  try {
    await Api.remove(id);
    dispatch(actions.removeTodoOk({ id }));
  } catch (error) {
    dispatch(actions.removeTodoError({ message: error.message }));
  }
};
