import * as FetchServices from './fetchData';

export async function fetchRatingService() {
  let request = {
    url: 'api/seller/supplier-ratings/rating-show',
    type: 'GET'
  };
  return FetchServices.callApi(request);
}
