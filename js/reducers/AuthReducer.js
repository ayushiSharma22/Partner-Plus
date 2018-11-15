import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  loggedIn: false,
  loggingIn: false,
  error: false,
  nextRoute: null,
  user: null,
  message: null,
  stateRequest: false,
  stateComplete: false,
  stateError: false,
  stateErrorMessage: null,
};

const auth = (state = initialState, action) => {
  switch(action.type) {
    case ActionTypes.LOGIN_REQUEST: {
      return {
        ...state,
        loggingIn: true,
        loggedIn: false,
        error: false,
      }
    }
    case ActionTypes.LOGIN_COMPLETE: {
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        error: false,
        nextRoute: 'home',
        user: action.payload,
      }
    }
    case ActionTypes.LOGIN_ERROR: {
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
        error: true,
        message: action.message,
      }
    }
    case ActionTypes.LOGOUT_COMPLETE: {
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
        error: false,
        nextRoute: 'login',
        user: null,
      }
    }
    case ActionTypes.GET_STATE_REQUEST: {
      return {
        ...state,
        stateRequest: true,
        stateComplete: false,
        stateError: false,
      }
    }
    case ActionTypes.GET_STATE_COMPLETE: {
      return {
        ...state,
        stateRequest: false,
        stateComplete: true,
        stateError: false,
        ...action.payload,
      }
    }
    case ActionTypes.GET_STATE_ERROR: {
      return {
        ...state,
        stateRequest: false,
        stateComplete: false,
        stateError: true,
        stateErrorMessage: action.error,
      }
    }
    default: {
      return state;
    }
  }
}

export default auth;
