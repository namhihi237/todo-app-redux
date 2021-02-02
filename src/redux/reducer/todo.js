import {actionType} from '../acitonType';
const {GET_TODO, GET_TODO_FAIL} = actionType;

const initialState = {
  loading: false,
  todos: [],
  msg: '',
};

export const getTodos = (state = initialState, actions) => {
  switch (actions.type) {
    case GET_TODO:
      return {...state, todos: actions.payload, msg: ''};
    case GET_TODO_FAIL:
      return {...state, msg: actions.payload};
    default:
      return state;
  }
};
