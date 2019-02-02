import * as actions from './todoActions';
import Api from '../../api/Api';
import { createTask } from '../../utils/creators';

export const addTodo = (text) => async (dispatch) => {
  const todo = createTask(text);
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
  dispatch(actions.removeTodoStart({ id }));

  try {
    await Api.remove(id);

    dispatch(actions.removeTodoOk({ id }));
  } catch (error) {
    dispatch(actions.removeTodoError({ message: error.message }));
  }
};

export const updateTodo = (id, patch) => async (dispatch) => {
  dispatch(actions.updateTodoStart({ id, patch }));

  try {
    const updatedItem = await Api.update(id, patch);

    dispatch(actions.updateTodoOk({ id, updatedItem }));
  } catch (error) {
    dispatch(actions.updateTodoError({ message: error.message }));
  }
};

export const removeMany = (ids) => async (dispatch) => {
  if (ids.length === 0) {
    return;
  }
  dispatch(actions.removeManyStart({ ids }));

  try {
    await Api.removeMany(ids);

    dispatch(actions.removeManyOk({ ids }));
  } catch (error) {
    dispatch(actions.removeManyError({ message: error.message }));
  }
};
