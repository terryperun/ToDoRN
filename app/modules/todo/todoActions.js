import { createAction } from 'redux-actions';
import types from './todoTypes';

export const addTodoStart = createAction(types.ADD_TODO_START);
export const addTodoOk = createAction(types.ADD_TODO_OK);
export const addTodoError = createAction(types.ADD_TODO_ERROR);

export const getAllTodoStart = createAction(types.GET_ALL_TODO_START);
export const getAllTodoOk = createAction(types.GET_ALL_TODO_OK);
export const getAllTodoError = createAction(types.GET_ALL_TODO_ERROR);
