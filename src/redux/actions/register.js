import {actionType} from '../acitonType';
import axios from 'axios';
import _ from 'lodash';
import {apiUrl} from '../../api/api';
const {REGISTER, REGISTER_FAIL} = actionType;
const {REGISTER_URL} = apiUrl;

export const register = (data) => async (dispatch) => {
  let result;
  try {
    result = await axios.post(REGISTER_URL, data);
    dispatch({type: REGISTER, payload: result.data});
  } catch (error) {
    const msg = _.get(error.response, 'data.msg') || "Cant't connect network";
    dispatch({
      type: REGISTER_FAIL,
      payload: {msg},
    });
  }
};
