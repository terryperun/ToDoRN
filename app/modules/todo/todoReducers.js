import { handleActions } from 'redux-actions';
import { REHYDRATE, PURGE } from 'redux-persist/lib/constants';
import R from 'ramda';

import types from './todoTypes';

const initialState = {
  newItems: [],
  doneItems: [],
  isLoading: false,
  error: null,
};

const todoReducer = handleActions(
  {
    [REHYDRATE]: (state, action) => ({
      ...state,
      isLoading: false,
      newItems: R.pathOr(
        state.newItems,
        ['payload', 'todo', 'newItems'],
        action,
      ),
      doneItems: R.pathOr(
        state.doneItems,
        ['payload', 'todo', 'doneItems'],
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
      newItems: [...state.newItems, action.payload],
    }),
    [types.ADD_TODO_OK]: (state, action) => ({
      ...state,
      isLoading: false,
      newItems: state.newItems.map((todo) => {
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

    [types.GET_ALL_TODOS_START]: (state) => ({
      ...state,
      isLoading: true,
      error: null,
    }),

    [types.GET_ALL_TODOS_OK]: (state, action) => ({
      ...state,
      isLoading: false,
      newItems: action.payload.filter((i) => i.completed === false),
      doneItems: action.payload.filter((i) => i.completed),
    }),

    [types.GET_ALL_TODOS_ERROR]: (state, action) => ({
      ...state,
      error: action.payload,
    }),

    [types.REMOVE_TODO_START]: (state, action) => ({
      ...state,
      isLoading: true,
      error: null,
      newItems: state.newItems.filter(
        (todo) => todo.id !== action.payload.id,
      ),
      doneItems: state.doneItems.filter(
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

    [types.UPDATE_TODO_START]: (state, action) => {
      const { id, patch } = action.payload;
      let newItems = [...state.newItems];
      let doneItems = [...state.doneItems];
      const indexInNew = newItems.findIndex((i) => i.id === id);
      const indexInDone = doneItems.findIndex((i) => i.id === id);
      let shouldMoveToDone;
      const compare = (a, b) => {
        if (a.createdAt < b.createdAt) return -1;
        if (a.createdAt > b.createdAt) return 1;
        return 0;
      };

      if (indexInNew > -1) {
        let element = newItems[indexInNew];
        if (typeof patch.completed === 'undefined') {
          shouldMoveToDone = false;
        } else {
          shouldMoveToDone = element.completed !== patch.completed;
        }
        element = Object.assign({}, element, patch);

        if (shouldMoveToDone) {
          newItems = newItems.filter((i) => i.id !== id);
          doneItems.unshift(element);
        } else {
          newItems[indexInNew] = element;
        }
      } else {
        let element = doneItems[indexInDone];
        element = Object.assign({}, element, patch);

        doneItems = doneItems.filter((i) => i.id !== id);
        newItems.push(element);

        newItems.sort(compare);
      }

      return {
        ...state,
        isLoading: true,
        error: null,
        newItems,
        doneItems,
      };
    },

    [types.UPDATE_TODO_OK]: (state, action) => {
      const { id } = action.payload;

      return {
        ...state,
        isLoading: false,
        newItems: state.newItems.map((todo) => {
          if (todo.id !== id) {
            return todo;
          }
          return action.payload.updatedItem;
        }),
        doneItems: state.doneItems.map((todo) => {
          if (todo.id !== id) {
            return todo;
          }
          return action.payload.updatedItem;
        }),
      };
    },

    [types.UPDATE_TODO_ERROR]: (state, action) => ({
      ...state,
      error: action.payload,
    }),

    [types.REMOVE_MANY_START]: (state, action) => ({
      ...state,
      isLoading: true,
      error: null,
      newItems: state.newItems.filter(
        (todo) => !action.payload.ids.includes(todo.id),
      ),
      doneItems: state.doneItems.filter(
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
