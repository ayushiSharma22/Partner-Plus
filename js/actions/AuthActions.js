import * as ActionTypes from './actionTypes';
import {
  loginService,
  userConfirmationService,
  getCurrentStateService,
  logoutService,
  saveFCMTokenService,
  fetchAppUpdatesService
} from '../services/AuthServices';
import { createErrorMessage } from '../commons/Utils';

export function saveFCMToken(token) {
  return saveFCMTokenService(token);
}

export function login(userCredentials) {
  return (dispatch, getState) => {
    dispatch(loginRequest());
    return loginService(userCredentials)
      .then(json => {
        userConfirmationService().then(json_data => {
          let user = json_data;
          if (json.error) {
            dispatch(loginError('Please enter valid credentials'));
          } else if (json.errors) {
            dispatch(loginError(createErrorMessage(json.errors)));
          } else if (user.confirmed_at === null) {
            dispatch(
              loginError(
                createErrorMessage(
                  'Mobile Number not verified. Please complete the signup process through our Desktop site to Login.'
                )
              )
            );
          } else if (!user.company_exist) {
            dispatch(
              loginError(
                createErrorMessage(
                  'Company Name not given. Please complete the signup process through our Desktop site to Login.'
                )
              )
            );
          } else if (!user.seller_company_details_filled) {
            dispatch(
              loginError(
                createErrorMessage(
                  'Company Details not completed. Please complete the signup process through our Desktop site to Login.'
                )
              )
            );
          } else if (!user.billing_details_filled) {
            dispatch(
              loginError(
                createErrorMessage(
                  'Billing Details not completed. Please complete the signup process through our Desktop site to Login.'
                )
              )
            );
          } else {
            dispatch(loginComplete(json));
          }
        });
      })
      .catch(error => {
        dispatch(loginError('Some error occured'));
      });
  };
}

export function logout() {
  return (dispatch, getState) => {
    dispatch(logoutRequest());
    return logoutService().then(data => {
      if (data.status === 'SUCCESS') {
        dispatch(logoutComplete());
      } else if (data.status === 'ERROR') {
        dispatch(logoutError());
      }
    });
  };
}

export function getLoginState() {
  return (dispatch, getState) => {
    dispatch(getStateRequest());
    return getCurrentStateService()
      .then(json_data => {
        dispatch(getStateComplete(json_data));
        return json_data;
      })
      .catch(error => {
        dispatch(getStateError(error));
      });
  };
}

export function fetchAppUpdates() {
  return (dispatch, getState) => {
    return fetchAppUpdatesService()
      .then(json_data => {
        return json_data;
      })
      .catch(error => {
        return { errors: [error] };
      });
  };
}

let loginRequest = () => {
  return {
    type: ActionTypes.LOGIN_REQUEST
  };
};
let loginComplete = json_data => {
  return {
    type: ActionTypes.LOGIN_COMPLETE,
    payload: json_data
  };
};
let loginError = message => {
  return {
    type: ActionTypes.LOGIN_ERROR,
    message: message
  };
};

let getStateRequest = () => {
  return {
    type: ActionTypes.GET_STATE_REQUEST
  };
};

let getStateComplete = json_data => {
  return {
    type: ActionTypes.GET_STATE_COMPLETE,
    payload: json_data
  };
};

let getStateError = error => {
  return {
    type: ActionTypes.GET_STATE_ERROR,
    error: error
  };
};

let logoutRequest = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  };
};

let logoutComplete = () => {
  return {
    type: ActionTypes.LOGOUT_COMPLETE
  };
};

let logoutError = () => {
  return {
    type: ActionTypes.LOGOUT_ERROR
  };
};
