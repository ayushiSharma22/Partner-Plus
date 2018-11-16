import * as ActionTypes from './actionTypes';
import * as InquiryServices from '../services/InquiryServices';
import * as Utils from '../commons/Utils';

export function fetchInquiries(options) {
  return (dispatch, getState) => {
    dispatch(fetchInquiriesRequest());
    return InquiryServices.fetchInquiriesService(options).then(data => {
      let error = Utils.checkErrors(data);
      if(error) {
        dispatch(fetchInquiriesError(error));
        return { error: error };
      } else {
        dispatch(fetchInquiriesComplete(data));
      }
      return data;
    }).catch(error => {
      dispatch(fetchInquiriesError(Utils.getPrettyError(error)));
      return {error: Utils.getPrettyError(error)};
    });
  }
}

function fetchInquiriesRequest() {
  return {
    type: ActionTypes.FETCH_INQUIRIES_REQUEST,
  }
}

function fetchInquiriesComplete(data) {
  return {
    type: ActionTypes.FETCH_INQUIRIES_COMPLETE,
    payload: data
  }
}

function fetchInquiriesError(error) {
  return {
    type: ActionTypes.FETCH_INQUIRIES_ERROR,
    error: error,
  }
}

export function submitQuote(requestData, inquiry_id) {
  return (dispatch, getState) => {
    return InquiryServices.submitQuoteService(requestData, inquiry_id).then(data => {
      let error = Utils.checkErrors(data);
      if(error) {
        return { error: error };
      } else {
        return dispatch(fetchInquiry(inquiry_id));
      }
      // return data;
    }).catch(error => {
      return {error: Utils.getPrettyError(error)};
    });
  }
}

export function fetchInquiry(inquiry_id) {
  return (dispatch, getState) => {
    dispatch(fetchInquiryRequest());
    return InquiryServices.fetchInquiryService(inquiry_id).then(data => {
      let error = Utils.checkErrors(data);
      let quote = data.quotes[0]
      if(error) {
        dispatch(fetchInquiryError(error));
        return { error: error };
      } else {
        dispatch(fetchInquiryComplete(quote));
      }
      return data;
    }).catch(error => {
      dispatch(fetchInquiryError(Utils.getPrettyError(error)));
      return {error: Utils.getPrettyError(error)};
    });
  }
}

function fetchInquiryRequest() {
  return {
    type: ActionTypes.FETCH_INQUIRY_REQUEST,
  }
}

function fetchInquiryComplete(data) {
  return {
    type: ActionTypes.FETCH_INQUIRY_COMPLETE,
    payload: data
  }
}

function fetchInquiryError(error) {
  return {
    type: ActionTypes.FETCH_INQUIRY_ERROR,
    error: error,
  }
}

export function fetchInquiryHistory(inquiry_id) {
  return (dispatch, getState) => {
    dispatch(fetchInquiryHistoryRequest());
    return InquiryServices.fetchInquiryHistoryService(inquiry_id).then(data => {
      let error = Utils.checkErrors(data);
      if(error) {
        dispatch(fetchInquiryHistoryRequest(error));
        return { error: error };
      } else {
        dispatch(fetchInquiryHistoryComplete(data));
      }
      return data;
    }).catch(error => {
      dispatch(fetchInquiryHistoryError(Utils.getPrettyError(error)));
      return {error: Utils.getPrettyError(error)};
    });
  }
}

function fetchInquiryHistoryRequest() {
  return {
    type: ActionTypes.FETCH_INQUIRY_HISTORY_REQUEST,
  }
}

function fetchInquiryHistoryComplete(data) {
  return {
    type: ActionTypes.FETCH_INQUIRY_HISTORY_COMPLETE,
    payload: data
  }
}

function fetchInquiryHistoryError(error) {
  return {
    type: ActionTypes.FETCH_INQUIRY_HISTORY_ERROR,
    error: error,
  }
}

export function editQuote(requestData, inquiry_id, quote_id) {
  return (dispatch, getState) => {
    return InquiryServices.editQuoteService(requestData, inquiry_id, quote_id).then(data => {
      let error = Utils.checkErrors(data);
      if(error) {
        return { error: error };
      } else {
        return dispatch(fetchInquiry(inquiry_id));
      }
    }).catch(error => {
      return {error: Utils.getPrettyError(error)};
    });
  }
}

export function rejectBid(inquiry_id, requestData) {
  return (dispatch, getState) => {
    return InquiryServices.rejectBidService(inquiry_id, requestData).then(data => {
      let error = Utils.checkErrors(data);
      if(error) {
        return { error: error };
      } else {
        return dispatch(fetchInquiry(inquiry_id));
      }
    }).catch(error => {
      return {error: Utils.getPrettyError(error)};
    });
  }
}
