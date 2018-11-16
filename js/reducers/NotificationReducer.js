import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  request: false,
  complete: false,
  error: false,
  errorMessage: null,
  data: null,
  notifications: {
    request: false,
    complete: false,
    error: false,
    errorMessage: null,
    data: null,
  }
};

const notifications = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_NOTIFICATION_REQUEST:
      let notificationsState = Object.assign({}, state.notifications, {
        request: true,
        complete: false,
        error: false,
      });
      return Object.assign({}, state, {
        notifications: notificationsState,
      });
    case ActionTypes.FETCH_NOTIFICATION_COMPLETE:
      notificationsState = Object.assign({}, state.notifications, {
        request: false,
        complete: true,
        error: false,
        data: action.payload,
      });
      return Object.assign({}, state, {
        notifications: notificationsState,
      });
    case ActionTypes.FETCH_NOTIFICATION_ERROR:
      notificationsState = Object.assign({}, state.notifications, {
        request: false,
        complete: false,
        error: true,
        errorMessage: action.error,
      });
      return Object.assign({}, state, {
        notifications: notificationsState,
      });
    default:
      return state;
  }
}

export default notifications;
