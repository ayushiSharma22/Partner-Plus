import * as Urls from '../commons/Urls';
import * as Constants from '../commons/Constants';
import * as FetchServices from './fetchData';

export async function fetchSellerDashboardService() {
  let request = {
    url: Urls.SELLER_DASHBOARD_URL,
    type: Constants.GET_REQUEST
  };
  return FetchServices.callApi(request);
}
