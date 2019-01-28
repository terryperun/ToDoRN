import { createAction } from 'redux-actions';
import types from './todoTypes';

export const addTodoStart = createAction(types.ADD_TODO_START);
export const addTodoOk = createAction(types.ADD_TODO_OK);
export const addTodoError = createAction(types.ADD_TODO_ERROR);

export const getAllTodosStart = createAction(
  types.GET_ALL_TODOS_START,
);
export const getAllTodosOk = createAction(types.GET_ALL_TODOS_OK);
export const getAllTodosError = createAction(
  types.GET_ALL_TODOS_ERROR,
);

export const removeTodoStart = createAction(types.REMOVE_TODO_START);
export const removeTodoOk = createAction(types.REMOVE_TODO_OK);
export const removeTodoError = createAction(types.REMOVE_TODO_ERROR);

export const updateTodoStart = createAction(types.UPDATE_TODO_START);
export const updateTodoOk = createAction(types.UPDATE_TODO_OK);
export const updateTodoError = createAction(types.UPDATE_TODO_ERROR);
