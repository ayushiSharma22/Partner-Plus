import * as ActionTypes from './actionTypes';
import * as SignUpServices from '../services/SignUpServices';
import { createErrorMessage } from '../commons/Utils';

/* -- Company Registration - Sign up -- */
export function loadCategories() {
  return (dispatch, getState) => {
    dispatch(loadCategoriesRequest());
    return SignUpServices.loadCategoriesService()
      .then(json => {
        if (json.errors) {
          dispatch(loadCategoriesError(createErrorMessage(json.errors)));
        } else {
          dispatch(loadCategoriesComplete(json));
        }
      })
      .catch(error => {
        dispatch(loadCategoriesError(error));
      });
  };
}

function loadCategoriesRequest() {
  return {
    type: ActionTypes.LOAD_CATEGORIES_REQUEST
  };
}

function loadCategoriesComplete(json_data) {
  return {
    type: ActionTypes.LOAD_CATEGORIES_COMPLETE,
    payload: json_data
  };
}

function loadCategoriesError(error) {
  return {
    type: ActionTypes.LOAD_CATEGORIES_ERROR,
    error: error
  };
}
