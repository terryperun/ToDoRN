import * as actions from './todoActions';
import Api, { createAbortSignal, AbortError } from '../../api/Api';
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

let pendingUpdates = [];

export const updateTodo = (id, patch) => async (dispatch) => {
  // check it there is a pending request already
  const pendingUpdate = pendingUpdates.find((i) => i.id === id);

  if (pendingUpdate) {
    // abort that request if exist
    pendingUpdate.signal.abort();
  }

  // create abort signal to identify request and abort it in the future
  const signal = createAbortSignal();

  // add new pending request
  pendingUpdates.push({ id, patch, signal });

  dispatch(actions.updateTodoStart({ id, patch }));
  try {
    const updatedItem = await Api.update(id, patch, { signal });
    pendingUpdates = pendingUpdates.filter((i) => i.id !== id);

    dispatch(actions.updateTodoOk({ id, updatedItem }));
  } catch (error) {
    // check if the error is abort error (because it throws it under the hood on abort)
    if (error instanceof AbortError) {
      // TODO: rollback item state
    } else {
      dispatch(actions.updateTodoError({ message: error.message }));
    }
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
