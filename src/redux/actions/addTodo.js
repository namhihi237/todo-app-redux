import {actionType} from '../acitonType';
import axios from 'axios';
import _ from 'lodash';
import {apiUrl} from '../../api/api';
import {getData} from '../../utils';
const {ADD_TODO, ADD_TODO_FAIL, ADD_TODO_SUCCESS} = actionType;
const {TODO_URL} = apiUrl;

export const addTodo = (data) => async (dispatch) => {
  dispatch({type: ADD_TODO});
  try {
    const token = await getData('token');
    const result = await axios.post(TODO_URL, data, {
      headers: {Authorization: `Bearer ${token}`},
    }); // token

    dispatch({type: ADD_TODO_SUCCESS, payload: result.data});

    // dispatch({type: GET_TODO, payload: result.data.todos});
  } catch (error) {
    const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
    dispatch({
      type: ADD_TODO_FAIL,
      payload: {msg},
    });
  }
};
