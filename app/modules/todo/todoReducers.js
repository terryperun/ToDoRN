import { handleActions } from 'redux-actions';
import types from './todoTypes';

const initialState = {
  items: [
    {
      id: 1,
      task: 'buy milk',
      completed: false,
    },
  ],
  isLoading: false,
  error: null,
};

const todoReducer = handleActions(
  {
    [types.ADD_TODO_START]: (state, action) => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    [types.ADD_TODO_OK]: (state, action) => ({
      ...state,
      isLoading: false,
      items: [...state.items, action.payload],
    }),

    [types.ADD_TODO_ERROR]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
  initialState,
);

export default todoReducer;
