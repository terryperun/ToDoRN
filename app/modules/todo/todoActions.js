import { createAction } from 'redux-actions';
import types from './todoTypes';

export const addTodoStart = createAction(types.ADD_TODO_START);
export const addTodoOk = createAction(types.ADD_TODO_OK);
export const addTodoError = createAction(types.ADD_TODO_ERROR);
