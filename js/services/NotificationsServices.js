import * as FetchServices from './fetchData';
import * as Utils from '../commons/Utils';

export async function fetchNotificationsService(options) {
  let request = {
    url: 'api/seller/notifications?' + Utils.createGetUrlFromOptions(options),
    type: 'GET'
  };
  return FetchServices.callApi(request);
}

export async function updateNotificationsService(data) {
  let request = {
    url: 'api/seller/notifications/bulk-update',
    type: 'POST',
    body: data
  };
  return FetchServices.callApi(request);
}
