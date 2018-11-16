import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  request: false,
  complete: false,
  error: false,
  errorMessage: null,
  data: null,
  rating: {
    request: false,
    complete: false,
    error: false,
    errorMessage: null,
    data: null,
  }
};

const rating = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_RATING_REQUEST:
      let ratingState = Object.assign({}, state.rating, {
        request: true,
        complete: false,
        error: false,
      });
      return Object.assign({}, state, {
        rating: ratingState,
      });
    case ActionTypes.FETCH_RATING_COMPLETE:
      ratingState = Object.assign({}, state.rating, {
        request: false,
        complete: true,
        error: false,
        data: action.payload,
      });
      return Object.assign({}, state, {
        rating: ratingState,
      });
    case ActionTypes.FETCH_RATING_ERROR:
      ratingState = Object.assign({}, state.rating, {
        request: false,
        complete: false,
        error: true,
        errorMessage: action.error,
      });
      return Object.assign({}, state, {
        rating: ratingState,
      });
    default:
      return state;
  }
}

export default rating;
