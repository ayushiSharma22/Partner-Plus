import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  request: false,
  complete: false,
  error: false,
  routePossible: false,
  errorMessage: null,
};

const user = (state = initialState, action) => {
  switch(action.type) {
    case ActionTypes.USER_CONFIRMATION_REQUEST: {
      return {
        ...state,
        request: true,
        complete: false,
        error: false,
        user: null,
      }
    }
    case ActionTypes.USER_CONFIRMATION_COMPLETE: {
      return {
        ...state,
        request: false,
        complete: true,
        routePossible: true,
        error: false,
        user: action.payload,
      }
    }
    case ActionTypes.USER_CONFIRMATION_ERROR: {
      return {
        ...state,
        request: false,
        complete: false,
        error: true,
        errorMessage: action.error,
      }
    }
    case ActionTypes.LOGOUT_COMPLETE: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export default user;
