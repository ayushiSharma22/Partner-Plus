import * as ActionTypes from './actionTypes';
import * as AuthServices from '../services/AuthServices';
import { createErrorMessage } from '../commons/Utils';

export function userConfirmation() {
  return (dispatch, getState) => {
    dispatch(userConfirmationRequest());
    return AuthServices.userConfirmationService()
      .then(json => {
        console.log(json);
        if (json.error) {
          dispatch(userConfirmationError(json.error));
          return { error: json };
        } else if (json.errors) {
          dispatch(userConfirmationError(createErrorMessage(json.errors)));
          return { error: json };
        } else {
          dispatch(userConfirmationComplete(json));
          return json;
        }
      })
      .catch(error => {
        dispatch(userConfirmationError(error));
        return { error: error };
      });
  };
}

function userConfirmationRequest() {
  return {
    type: ActionTypes.USER_CONFIRMATION_REQUEST
  };
}

function userConfirmationComplete(json_data) {
  return {
    type: ActionTypes.USER_CONFIRMATION_COMPLETE,
    payload: json_data
  };
}

function userConfirmationError(error) {
  return {
    type: ActionTypes.USER_CONFIRMATION_ERROR,
    error: error
  };
}

export function updateContactNumber(user_id, data) {
  return (dispatch, getState) => {
    dispatch(updateContactNumberRequest());
    return AuthServices.updateContactNumberService(user_id, data)
      .then(json => {
        if (json.error) {
          dispatch(updateContactNumberError(json.error));
        } else if (json.errors) {
          dispatch(updateContactNumberError(createErrorMessage(json.errors)));
        } else {
          dispatch(updateContactNumberComplete(json));
        }
      })
      .catch(error => {
        dispatch(updateContactNumberError(error));
      });
  };
}

function updateContactNumberRequest() {
  return {
    type: ActionTypes.UPDATE_CONTACT_REQUEST
  };
}

function updateContactNumberComplete(json_data) {
  return {
    type: ActionTypes.UPDATE_CONTACT_COMPLETE,
    payload: json_data
  };
}

function updateContactNumberError(error) {
  return {
    type: ActionTypes.UPDATE_CONTACT_ERROR,
    error: error
  };
}
