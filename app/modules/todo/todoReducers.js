import types from './todoTypes';

const initialState = {
  items: [{ task: 'buy milk', status: false }],
  isLoading: false,
  error: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TODO_START: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case types.ADD_TODO_OK: {
      return {
        ...state,
        isLoading: false,
        items: [...state.items, action.payload],
      };
    }
    case types.ADD_TODO_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
}
export default reducer;
