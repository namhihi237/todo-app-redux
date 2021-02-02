import {actionType} from '../acitonType';
const {REGISTER, REGISTER_FAIL} = actionType;
const initialState = {
  msg: '',
  registed: false,
};
export const register = (state = initialState, actions) => {
  switch (actions.type) {
    case REGISTER:
      return {...state, ...actions.payload, registed: true};
    case REGISTER_FAIL:
      return {...state, ...actions.payload};
    default:
      return state;
  }
};
