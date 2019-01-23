import { combineReducers } from 'redux';
import todo from './todo';

const appReducer = combineReducers({
  todo: (state = {}, action) => state,
});

export default appReducer;
