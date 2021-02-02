import {actionType} from '../acitonType';
import axios from 'axios';
import _ from 'lodash';
import {apiUrl} from '../../api/api';
import {getData} from '../../utils';
const {GET_TODO, GET_TODO_FAIL} = actionType;
const {TODO_URL} = apiUrl;

export const getTodos = () => async (dispatch) => {
  try {
    const token = await getData('token');
    const result = await axios.get(TODO_URL, {
      headers: {Authorization: `Bearer ${token}`},
    });

    dispatch({type: GET_TODO, payload: result.data.todos});
  } catch (error) {
    const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
    dispatch({
      type: GET_TODO_FAIL,
      payload: msg,
    });
  }
};
