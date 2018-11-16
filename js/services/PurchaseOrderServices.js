import * as FetchServices from './fetchData';
import * as Utils from '../commons/Utils';

export async function fetchPurchaseOrdersService(options) {
  url = 'api/seller/bizongo-purchase-orders?' + options;
  let request = {
    url: url,
    method: 'GET'
  };
  return FetchServices.callApi(request);
}

export async function fetchPurchaseOrderService(purchase_order_id) {
  url = 'api/seller/bizongo-purchase-orders/' + purchase_order_id;
  let request = {
    url: url,
    method: 'GET'
  };
  return FetchServices.callApi(request);
}

/* Service to Fetch Purchase Order Items */
export async function fetchPurchaseOrderItemsService(
  params,
  purchase_order_id
) {
  let request = {
    url:
      'api/seller/bizongo-purchase-orders/' +
      purchase_order_id +
      '/po-items?' +
      Utils.createGetUrlFromOptions(params),
    type: 'GET'
  };
  return FetchServices.callApi(request);
}

/* Service to Fetch Purchase Order Dispatch Plans */
export async function fetchPurchaseOrderDispatchPlansService(
  purchase_order_id
) {
  let request = {
    url:
      'api/seller/dispatch-plans?per_page=30&bizongo_purchase_order_id=' +
      purchase_order_id,
    type: 'GET'
  };
  return FetchServices.callApi(request);
}

/* Services for Actions on Purchase Order */
export async function acceptPurchaseOrderService(data, purchase_order_id) {
  let request = {
    url: 'api/seller/bizongo-purchase-orders/' + purchase_order_id,
    type: 'PUT',
    body: data
  };
  return FetchServices.callApi(request);
}

export async function rejectPurchaseOrderService(data, purchase_order_id) {
  let request = {
    url: 'api/seller/bizongo-purchase-orders/' + purchase_order_id,
    type: 'PUT',
    body: data
  };
  return FetchServices.callApi(request);
}
