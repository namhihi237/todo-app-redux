import {actionType} from '../acitonType';
const {ADD_TODO, ADD_TODO_FAIL, ADD_TODO_SUCCESS} = actionType;

const initialState = {
  loading: false,
  data: {},
  loading: false,
};

export const addTodo = (state = initialState, actions) => {
  switch (actions.type) {
    case ADD_TODO:
      return {...state, data: {status: 0, msg: ''}, loading: true};
    case ADD_TODO_SUCCESS:
      return {...state, data: actions.payload, loading: false};
    case ADD_TODO_FAIL:
      return {...state, data: actions.payload, loading: false};
    default:
      return state;
  }
};
