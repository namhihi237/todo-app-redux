import thunkMiddleware from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware} from 'redux';

import {login, register, getTodos, addTodo} from '../reducer/';

const AppReduces = combineReducers({
  login,
  register,
  getTodos,
  addTodo,
});

const rootReducer = (state, action) => {
  return AppReduces(state, action);
};

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
