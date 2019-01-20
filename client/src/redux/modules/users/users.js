import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ROOT_URL } from '../../../config/NetworkSettings';

import {
  SIGNING_UP,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  LOGGING_IN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from '../../types';

let userLoggedIn = JSON.parse(localStorage.getItem('user'));

// Initial States
export const initialState = {
  userLoggedIn: userLoggedIn ? true : false,
  success: false,
  isLoading: false,
  error: false,
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNING_UP:
      return {
        ...state, isLoading: true, error: false, success: false, userLoggedIn: false 
      };
    case SIGNUP_FAIL:
      return {
        ...state, isLoading: false, error: true, success: false, userLoggedIn: false 
      };
    case SIGNUP_SUCCESS:
      return {
        ...state, isLoading: false, error: false, success: true, userLoggedIn: false 
      };
    case LOGGING_IN:
      return {
        ...state, isLoading: true, error: false, success: false, userLoggedIn: false 
      };
    case LOGIN_FAIL:
      return {
        ...state, isLoading: false, error: true, success: false, userLoggedIn: false 
      };
    case LOGIN_SUCCESS:
      return {
        ...state, isLoading: false, error: false, success: true, userLoggedIn: true 
      };
    default:
      return state;
  }
};

// Actions
export const userSignup = params => async (dispatch) => {
  try {
    dispatch({ type: LOGGING_IN });
    const response = await axios.post(`${ROOT_URL}/api/userSignup`, params);
    if (response.data !== 'email-taken' || response.data !== 'username-taken') {
      localStorage.setItem('user', JSON.stringify(response.data));
      dispatch({ type: SIGNUP_SUCCESS });
    } else {
      dispatch({ type: SIGNUP_FAIL });
    }
  } catch (err) {
    if (err) {
      dispatch({ type: SIGNUP_FAIL, payload: 'signup-fail' });
    }
  }
};

export const userLogin = params => async (dispatch) => {
  try {
    dispatch({ type: LOGGING_IN });
    const response = await axios.post(`${ROOT_URL}/api/userLogin`, params);
    if (response.data !== 'password-invalid' || response.data !== 'user-not-found') {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    dispatch({ type: LOGIN_SUCCESS });
  } catch (err) {
    if (err) {
      dispatch({ type: LOGIN_FAIL, payload: 'login-fail' });
    }
  }
};
