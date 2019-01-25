import { handleActions } from 'redux-actions';
import types from './todoTypes';

const initialState = {
  items: [
    {
      id: '1',
      text: 'buy tost',
      completed: false,
    },
    {
      id: '2',
      text: 'buy milk',
      completed: false,
    },
    {
      id: '3',
      text: 'buy eggs',
      completed: true,
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
      items: [...state.items, action.payload],
    }),
    [types.ADD_TODO_OK]: (state, action) => ({
      ...state,
      isLoading: false,
      items: [
        ...state.items.map((todo) => {
          if (todo.id !== action.payload.id) {
            return todo;
          }
          return action.payload;
        }),
      ],
    }),

    [types.ADD_TODO_ERROR]: (state, action) => ({
      ...state,
      error: action.payload,
    }),

    [types.GET_ALL_TODO_START]: (state, action) => ({
      ...state,
      isLoading: true,
      error: null,
    }),

    [types.GET_ALL_TODO_OK]: (state, action) => ({
      ...state,
      isLoading: false,
      items: [...action.payload],
    }),

    [types.GET_ALL_TODO_ERROR]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
  initialState,
);

export default todoReducer;
