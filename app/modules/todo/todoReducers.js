import { handleActions } from 'redux-actions';
import { REHYDRATE, PURGE } from 'redux-persist/lib/constants';
import R from 'ramda';

import types from './todoTypes';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const todoReducer = handleActions(
  {
    [REHYDRATE]: (state, action) => ({
      ...state,
      isLoading: false,
      items: R.pathOr(
        state.items,
        ['payload', 'todo', 'items'],
        action,
      ),
    }),

    [PURGE]: () => ({
      ...initialState,
    }),

    [types.ADD_TODO_START]: (state, action) => ({
      ...state,
      isLoading: true,
      error: null,
      items: [action.payload, ...state.items],
    }),
    [types.ADD_TODO_OK]: (state, action) => ({
      ...state,
      isLoading: false,
      items: state.items.map((todo) => {
        if (todo.id !== action.payload.id) {
          return todo;
        }
        return action.payload.newTodo;
      }),
    }),

    [types.ADD_TODO_ERROR]: (state, action) => ({
      ...state,
      error: action.payload,
    }),

    [types.GET_ALL_TODOS_START]: (state, action) => ({
      ...state,
      isLoading: true,
      error: null,
    }),

    [types.GET_ALL_TODOS_OK]: (state, action) => ({
      ...state,
      isLoading: false,
      items: action.payload,
    }),

    [types.GET_ALL_TODOS_ERROR]: (state, action) => ({
      ...state,
      error: action.payload,
    }),

    [types.REMOVE_TODO_START]: (state, action) => ({
      ...state,
      isLoading: true,
      error: null,
      items: state.items.filter(
        (todo) => todo.id !== action.payload.id,
      ),
    }),

    [types.REMOVE_TODO_OK]: (state) => ({
      ...state,
      isLoading: false,
    }),

    [types.REMOVE_TODO_ERROR]: (state, action) => ({
      ...state,
      error: action.payload,
    }),

    [types.UPDATE_TODO_START]: (state, action) => ({
      ...state,
      isLoading: true,
      error: null,
      items: state.items.map((todo) => {
        if (todo.id !== action.payload.id) {
          return todo;
        }
        return Object.assign({}, todo, action.payload.patch);
      }),
    }),

    [types.UPDATE_TODO_OK]: (state, action) => ({
      ...state,
      isLoading: false,
      items: state.items.map((todo) => {
        if (todo.id !== action.payload.id) {
          return todo;
        }
        return action.payload.updatedItem;
      }),
    }),

    [types.UPDATE_TODO_ERROR]: (state, action) => ({
      ...state,
      error: action.payload,
    }),

    [types.REMOVE_MANY_START]: (state, action) => ({
      ...state,
      isLoading: true,
      error: null,
      items: state.items.filter(
        (todo) => !action.payload.ids.includes(todo.id),
      ),
    }),

    [types.REMOVE_MANY_OK]: (state) => ({
      ...state,
      isLoading: false,
    }),

    [types.REMOVE_MANY_ERROR]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
  initialState,
);

export default todoReducer;
