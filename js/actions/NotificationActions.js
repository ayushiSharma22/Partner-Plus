import * as ActionTypes from './actionTypes';
import * as NotificationsServices from '../services/NotificationsServices';
import * as Utils from '../commons/Utils';

export function fetchNotifications(options) {
  return (dispatch, getState) => {
    dispatch(fetchNotificationsRequest());
    return NotificationsServices.fetchNotificationsService(options).then(data => {
      let error = Utils.checkErrors(data);
      if(error) {
        dispatch(fetchNotificationsError(error));
        return { error: error };
      } else {
        dispatch(fetchNotificationsComplete(data));
      }
      return data;
    }).catch(error => {
      dispatch(fetchNotificationsError(Utils.getPrettyError(error)));
      return {error: Utils.getPrettyError(error)};
    });
  }
}

function fetchNotificationsRequest() {
  return {
    type: ActionTypes.FETCH_NOTIFICATION_REQUEST,
  }
}

function fetchNotificationsComplete(data) {
  return {
    type: ActionTypes.FETCH_NOTIFICATION_COMPLETE,
    payload: data
  }
}

function fetchNotificationsError(error) {
  return {
    type: ActionTypes.FETCH_NOTIFICATION_ERROR,
    error: error,
  }
}

export function updateNotifications(ids) {
  payload = {
    ids: ids,
    status: 'read'
  }
  return (dispatch, getState) => {
    return NotificationsServices.updateNotificationsService(payload).then(data => {
      let error = Utils.checkErrors(data);
      if(error) {
        return { error: error };
      } else {
        return data;
      }
      // return data;
    }).catch(error => {
      return {error: Utils.getPrettyError(error)};
    });
  }
}
