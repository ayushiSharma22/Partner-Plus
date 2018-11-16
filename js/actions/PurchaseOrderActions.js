import * as ActionTypes from './actionTypes';
import * as PurchaseOrderServices from '../services/PurchaseOrderServices';
import * as Utils from '../commons/Utils';

export function fetchPurchaseOrders(options) {
  return dispatch => {
    dispatch(fetchPurchaseOrdersRequest());
    return PurchaseOrderServices.fetchPurchaseOrdersService(options)
      .then(data => {
        let error = Utils.checkErrors(data);
        if (error) {
          dispatch(fetchPurchaseOrdersError(error));
          return { error: error };
        } else {
          dispatch(fetchPurchaseOrdersComplete(data));
        }
        return data;
      })
      .catch(error => {
        dispatch(fetchPurchaseOrdersError(Utils.getPrettyError(error)));
        return { error: Utils.getPrettyError(error) };
      });
  };
}

function fetchPurchaseOrdersRequest() {
  return {
    type: ActionTypes.FETCH_PURCHASE_ORDERS_REQUEST
  };
}

function fetchPurchaseOrdersComplete(data) {
  return {
    type: ActionTypes.FETCH_PURCHASE_ORDERS_COMPLETE,
    payload: data
  };
}

function fetchPurchaseOrdersError(error) {
  return {
    type: ActionTypes.FETCH_PURCHASE_ORDERS_ERROR,
    error: error
  };
}

export function fetchPurchaseOrder(purchase_order_id) {
  return dispatch => {
    dispatch(fetchPurchaseOrderRequest());
    return PurchaseOrderServices.fetchPurchaseOrderService(purchase_order_id)
      .then(data => {
        let error = Utils.checkErrors(data);
        if (error) {
          dispatch(fetchPurchaseOrderError(error, purchase_order_id));
          return { error: error };
        } else {
          dispatch(fetchPurchaseOrderDispatchPlans(purchase_order_id));
          dispatch(fetchPurchaseOrderComplete(data, purchase_order_id));
        }
        return data;
      })
      .catch(error => {
        dispatch(
          fetchPurchaseOrderError(
            Utils.getPrettyError(error),
            purchase_order_id
          )
        );
        return { error: Utils.getPrettyError(error) };
      });
  };
}

function fetchPurchaseOrderRequest() {
  return {
    type: ActionTypes.FETCH_PURCHASE_ORDER_REQUEST
  };
}

function fetchPurchaseOrderComplete(data, purchase_order_id) {
  return {
    type: ActionTypes.FETCH_PURCHASE_ORDER_COMPLETE,
    payload: data,
    id: purchase_order_id
  };
}

function fetchPurchaseOrderError(error, purchase_order_id) {
  return {
    type: ActionTypes.FETCH_PURCHASE_ORDER_ERROR,
    error: error,
    id: purchase_order_id
  };
}

/* Fetch Purchase Order Items */
export function fetchPurchaseOrderItems(params, purchase_order_id) {
  return dispatch => {
    dispatch(fetchPurchaseOrderItemsRequest());
    return PurchaseOrderServices.fetchPurchaseOrderItemsService(
      params,
      purchase_order_id
    )
      .then(data => {
        let error = Utils.checkErrors(data);
        if (error) {
          dispatch(fetchPurchaseOrderItemsError(error, purchase_order_id));
          return { error: error };
        } else {
          dispatch(fetchPurchaseOrder(purchase_order_id));
          dispatch(fetchPurchaseOrderItemsComplete(data, purchase_order_id));
        }
        return data;
      })
      .catch(error => {
        dispatch(
          fetchPurchaseOrderItemsError(
            Utils.getPrettyError(error),
            purchase_order_id
          )
        );
        return { error: Utils.getPrettyError(error) };
      });
  };
}

function fetchPurchaseOrderItemsRequest() {
  return {
    type: ActionTypes.FETCH_PURCHASE_ORDER_ITEMS_REQUEST
  };
}

function fetchPurchaseOrderItemsComplete(data, purchase_order_id) {
  return {
    type: ActionTypes.FETCH_PURCHASE_ORDER_ITEMS_COMPLETE,
    payload: data,
    id: purchase_order_id
  };
}

function fetchPurchaseOrderItemsError(error, purchase_order_id) {
  return {
    type: ActionTypes.FETCH_PURCHASE_ORDER_ITEMS_ERROR,
    error: error,
    id: purchase_order_id
  };
}

/* Fetch Purchase Order Dispatch Plans */
export function fetchPurchaseOrderDispatchPlans(purchase_order_id) {
  return dispatch => {
    dispatch(fetchPurchaseOrderDispatchPlansRequest());
    return PurchaseOrderServices.fetchPurchaseOrderDispatchPlansService(
      purchase_order_id
    )
      .then(data => {
        let error = Utils.checkErrors(data);
        if (error) {
          dispatch(
            fetchPurchaseOrderDispatchPlansError(error, purchase_order_id)
          );
          return { error: error };
        } else {
          dispatch(
            fetchPurchaseOrderDispatchPlansComplete(data, purchase_order_id)
          );
        }
        return data;
      })
      .catch(error => {
        dispatch(
          fetchPurchaseOrderDispatchPlansError(
            Utils.getPrettyError(error),
            purchase_order_id
          )
        );
        return { error: Utils.getPrettyError(error) };
      });
  };
}

function fetchPurchaseOrderDispatchPlansRequest() {
  return {
    type: ActionTypes.FETCH_PURCHASE_ORDER_DISPATCH_PLANS_REQUEST
  };
}

function fetchPurchaseOrderDispatchPlansComplete(data, purchase_order_id) {
  return {
    type: ActionTypes.FETCH_PURCHASE_ORDER_DISPATCH_PLANS_COMPLETE,
    payload: data,
    id: purchase_order_id
  };
}

function fetchPurchaseOrderDispatchPlansError(error, purchase_order_id) {
  return {
    type: ActionTypes.FETCH_PURCHASE_ORDER_DISPATCH_PLANS_ERROR,
    error: error,
    id: purchase_order_id
  };
}

/* Actions on Purchase Order */
export function acceptPurchaseOrder(
  purchase_order_item_ids,
  purchase_order_id
) {
  return dispatch => {
    return PurchaseOrderServices.acceptPurchaseOrderService(
      purchase_order_item_ids,
      purchase_order_id
    )
      .then(data => {
        let error = Utils.checkErrors(data);
        if (error) {
          return { error: error };
        } else {
          return data;
        }
      })
      .catch(error => {
        return { error: Utils.getPrettyError(error) };
      });
  };
}

export function rejectPurchaseOrder(
  purchase_order_item_ids,
  purchase_order_id
) {
  return dispatch => {
    return PurchaseOrderServices.rejectPurchaseOrderService(
      purchase_order_item_ids,
      purchase_order_id
    )
      .then(data => {
        let error = Utils.checkErrors(data);
        if (error) {
          return { error: error };
        } else {
          return data;
        }
      })
      .catch(error => {
        return { error: Utils.getPrettyError(error) };
      });
  };
}
