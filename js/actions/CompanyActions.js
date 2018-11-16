import * as ActionTypes from './actionTypes';
import {
  fetchCompanyService,
  saveCompanyService,
  saveStatutoryDetailsService
} from '../services/CompanyServices';
import * as Utils from '../commons/Utils';

export function fetchCompany(company_id) {
  return (dispatch, getState) => {
    dispatch(fetchCompanyRequest());
    return fetchCompanyService(company_id)
      .then(data => {
        let error = Utils.checkErrors(data);
        if (error) {
          dispatch(fetchCompanyError(error));
          return { error: error };
        } else {
          dispatch(fetchCompanyComplete(data));
        }
        return data;
      })
      .catch(error => {
        dispatch(fetchCompanyError(Utils.getPrettyError(error)));
        return { error: Utils.getPrettyError(error) };
      });
  };
}

function fetchCompanyRequest() {
  return {
    type: ActionTypes.FETCH_COMPANY_REQUEST
  };
}

function fetchCompanyComplete(json_data) {
  return {
    type: ActionTypes.FETCH_COMPANY_COMPLETE,
    payload: json_data
  };
}

function fetchCompanyError(error) {
  return {
    type: ActionTypes.FETCH_COMPANY_ERROR,
    error: error
  };
}

export function saveCompanyDetails(company_id, credentials) {
  return (dispatch, getState) => {
    return saveCompanyService(company_id, credentials)
      .then(data => {
        let error = Utils.checkErrors(data);
        if (error) {
          return { error: error };
        } else {
          return dispatch(fetchCompany(company_id));
        }
      })
      .catch(error => {
        return { error: Utils.getPrettyError(error) };
      });
  };
}

export function saveStatutoryData(company_id, credentials) {
  return (dispatch, getState) => {
    return saveStatutoryDetailsService(company_id, credentials)
      .then(data => {
        let error = Utils.checkErrors(data);
        if (error) {
          return { error: error };
        } else {
          return dispatch(fetchCompany(company_id));
        }
      })
      .catch(error => {
        return { error: Utils.getPrettyError(error) };
      });
  };
}
