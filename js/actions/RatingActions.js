import * as ActionTypes from './actionTypes';
import * as RatingServices from '../services/RatingServices';
import * as Utils from '../commons/Utils';

export function fetchRating() {
  return (dispatch, getState) => {
    dispatch(fetchRatingRequest());
    return RatingServices.fetchRatingService().then(data => {
      let error = Utils.checkErrors(data);
      if(error) {
        dispatch(fetchRatingError(error));
        return { error: error };
      } else {
        dispatch(fetchRatingComplete(data));
      }
      return data;
    }).catch(error => {
      dispatch(fetchRatingError(Utils.getPrettyError(error)));
      return {error: Utils.getPrettyError(error)};
    });
  }
}

function fetchRatingRequest() {
  return {
    type: ActionTypes.FETCH_RATING_REQUEST,
  }
}

function fetchRatingComplete(data) {
  return {
    type: ActionTypes.FETCH_RATING_COMPLETE,
    payload: data
  }
}

function fetchRatingError(error) {
  return {
    type: ActionTypes.FETCH_RATING_ERROR,
    error: error,
  }
}
