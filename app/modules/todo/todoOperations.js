import * as actions from './todoActions';
import Api from '../../api/Api';
import { createTask } from '../../utils/creators';

export const addTodo = (text) => async (dispatch) => {
  const task = createTask(text);
  dispatch(actions.addTodoStart(task));
  // console.log('IN OPERATIONNNNNNNNNNNNN', task);
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

export const updateTodo = (id, text) => async (dispatch) => {
  const body = createTask(text, id);
  dispatch(actions.updateTodoStart({ id, body }));
  try {
    const updateItem = await Api.update(id, body);
    dispatch(actions.updateTodoOk({ id, updateItem }));
  } catch (error) {
    dispatch(actions.updateTodoError({ message: error.message }));
  }
};
