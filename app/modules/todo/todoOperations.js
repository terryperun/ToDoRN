import * as actions from './todoActions';
import Api from '../../api/Api';
import { createTask } from '../../utils/creators';

export const addTodo = (body) => async (dispatch) => {
  const todo = createTask(undefined, body);
  dispatch(actions.addTodoStart(todo));
  try {
    const newTodo = await Api.add(todo);
    const { id } = todo;
    dispatch(actions.addTodoOk({ newTodo, id }));
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

export const updateTodo = (id, body) => async (dispatch) => {
  const todo = createTask(id, body);
  dispatch(actions.updateTodoStart({ id, todo }));
  try {
    const updateItem = await Api.update(id, todo);
    dispatch(actions.updateTodoOk({ id, updateItem }));
  } catch (error) {
    dispatch(actions.updateTodoError({ message: error.message }));
  }
};
