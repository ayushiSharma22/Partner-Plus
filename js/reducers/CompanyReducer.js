import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  data: null,
  request: false,
  complete: false,
  error: false,
  errorMessage: null,
  saveRequest: false,
  saveComplete: false,
  saveError: false,
  saveErrorMessage: null,
  saveStatutoryRequest: false,
  saveStatutoryComplete: false,
  saveStatutoryError: false,
  saveStatutoryErrorMessage: null,
};

const company = (state = initialState, action) => {
  switch(action.type) {
    case ActionTypes.FETCH_COMPANY_REQUEST: {
      return {
        ...state,
        request: true,
        complete: false,
        error: false,
      }
    }
    case ActionTypes.FETCH_COMPANY_COMPLETE: {
      return {
        ...state,
        request: false,
        complete: true,
        error: false,
        data: action.payload,
      }
    }
    case ActionTypes.FETCH_COMPANY_ERROR: {
      return {
        ...state,
        request: false,
        complete: false,
        error: true,
        errorMessage: action.error,
      }
    }
    case ActionTypes.SAVE_COMPANY_REQUEST: {
      return {
        ...state,
        saveRequest: true,
        saveComplete: false,
        saveError: false,
      }
    }
    case ActionTypes.SAVE_COMPANY_COMPLETE: {
      let newCompany = action.payload.company;
      return {
        ...state,
        saveRequest: false,
        saveComplete: true,
        data: {
          ...state.data,
          company: {
            ...state.data.company,
            business_category: newCompany.business_category,
            contact_number: newCompany.contact_number,
            name: newCompany.name,
            registered_address: {
              ...state.data.registered_address,
              gstin: newCompany.gstin,
              street_address: newCompany.address,
              city: newCompany.city,
              state: newCompany.state,
              country: newCompany.country,
              pincode: newCompany.pincode
            }
          },
        },
        saveError: false,
      }
    }
    case ActionTypes.SAVE_COMPANY_ERROR: {
      return {
        ...state,
        saveRequest: false,
        saveComplete: false,
        saveError: true,
        saveErrorMessage: action.error,
      }
    }
    case ActionTypes.SAVE_COMPANY_STATUTORY_REQUEST: {
      return {
        ...state,
        saveStatutoryRequest: true,
        saveStatutoryComplete: false,
        saveStatutoryError: false,
      }
    }
    case ActionTypes.SAVE_COMPANY_STATUTORY_COMPLETE: {
      return {
        ...state,
        saveStatutoryRequest: false,
        saveStatutoryComplete: true,
        saveStatutoryData: action.payload,
        saveStatutoryError: false,
      }
    }
    case ActionTypes.SAVE_COMPANY_STATUTORY_ERROR: {
      return {
        ...state,
        saveStatutoryRequest: false,
        saveStatutoryComplete: false,
        saveStatutoryError: true,
        saveStatutoryErrorMessage: action.error,
      }
    }
    default: {
      return state;
    }
  }
}

export default company;
