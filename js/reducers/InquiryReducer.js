import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  request: false,
  complete: false,
  error: false,
  errorMessage: null,
  data: null,
  history: {
    request: false,
    complete: false,
    error: false,
    errorMessage: null,
    data: null,
  },
  inquiry: {
    request: false,
    complete: false,
    error: false,
    errorMessage: null,
    data: null,
    history: null
  }
};

const inquiry = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_INQUIRY_REQUEST:
      let inquiryState = Object.assign({}, state.inquiry, {
        request: true,
        complete: false,
        error: false,
      });
      return Object.assign({}, state, {
        inquiry: inquiryState,
      });
    case ActionTypes.FETCH_INQUIRY_COMPLETE:
      inquiryState = Object.assign({}, state.inquiry, {
        request: false,
        complete: true,
        error: false,
        data: action.payload,
      });
      return Object.assign({}, state, {
        inquiry: inquiryState,
      });
    case ActionTypes.FETCH_INQUIRY_ERROR:
      inquiryState = Object.assign({}, state.inquiry, {
        request: false,
        complete: false,
        error: true,
        errorMessage: action.error,
      });
      return Object.assign({}, state, {
        inquiry: inquiryState,
      });
    case ActionTypes.FETCH_INQUIRIES_REQUEST:
      return Object.assign({}, state, {
        request: true,
        complete: false,
        error: false,
      });
    case ActionTypes.FETCH_INQUIRIES_COMPLETE:
      return Object.assign({}, state, {
        request: false,
        complete: true,
        error: false,
        data: action.payload,
      });
    case ActionTypes.FETCH_INQUIRIES_ERROR:
      return Object.assign({}, state, {
        request: false,
        complete: false,
        error: true,
        errorMessage: action.error,
      });
    case ActionTypes.FETCH_INQUIRY_HISTORY_REQUEST:
      let inquiryHistoryState = Object.assign({}, state.history, {
        request: true,
        complete: false,
        error: false,
      });
      return Object.assign({}, state, {
        inquiry: inquiryHistoryState,
      });
    case ActionTypes.FETCH_INQUIRY_HISTORY_COMPLETE:
      inquiryHistoryState = Object.assign({}, state.history, {
        request: false,
        complete: true,
        error: false,
        data: action.payload,
      });
      return Object.assign({}, state, {
        history: inquiryHistoryState,
      });
    case ActionTypes.FETCH_INQUIRY_HISTORY_ERROR:
      inquiryHistoryState = Object.assign({}, state.history, {
        request: false,
        complete: false,
        error: true,
        errorMessage: action.error,
      });
      return Object.assign({}, state, {
        history: inquiryHistoryState,
      });
    default:
      return state;
  }
}

export default inquiry;
