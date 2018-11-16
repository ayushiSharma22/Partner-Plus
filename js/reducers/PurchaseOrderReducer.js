import * as ActionTypes from '../actions/actionTypes';

const initialState = {
  request: false,
  complete: false,
  error: false,
  errorMessage: null,
  data: null,
  purchaseOrderList: {}
};

const purchase_order = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_PURCHASE_ORDER_REQUEST:
      obj = {
        ...state.purchaseOrderList[action.id],
        request: true,
        complete: false,
        error: false
      };
      state.purchaseOrderList[action.id] = obj;
      return {
        ...state
      };
    case ActionTypes.FETCH_PURCHASE_ORDER_COMPLETE:
      obj = {
        ...state.purchaseOrderList[action.id],
        request: false,
        complete: true,
        error: false,
        data: action.payload
      };
      state.purchaseOrderList[action.id] = obj;
      return {
        ...state
      };
    case ActionTypes.FETCH_PURCHASE_ORDER_ERROR:
      obj = {
        ...state.purchaseOrderList[action.id],
        request: false,
        complete: false,
        error: true,
        errorMessage: action.error
      };
      state.purchaseOrderList[action.id] = obj;
      return {
        ...state
      };
    case ActionTypes.FETCH_PURCHASE_ORDER_ITEMS_REQUEST:
      obj = {
        request: true,
        complete: false,
        error: false
      };
      state.purchaseOrderList[action.id] = {};
      state.purchaseOrderList[action.id].items = obj;
      return {
        ...state
      };
    case ActionTypes.FETCH_PURCHASE_ORDER_ITEMS_COMPLETE:
      obj = {
        request: false,
        complete: true,
        error: false,
        data: action.payload
      };
      state.purchaseOrderList[action.id] = {};
      state.purchaseOrderList[action.id].items = obj;
      return {
        ...state
      };
    case ActionTypes.FETCH_PURCHASE_ORDER_ITEMS_ERROR:
      obj = {
        request: false,
        complete: false,
        error: true,
        errorMessage: action.error
      };
      state.purchaseOrderList[action.id] = {};
      state.purchaseOrderList[action.id].items = obj;
      return {
        ...state
      };
    case ActionTypes.FETCH_PURCHASE_ORDER_DISPATCH_PLANS_REQUEST:
      obj = {
        request: true,
        complete: false,
        error: false
      };
      state.purchaseOrderList[action.id].dispatchPlans = obj;
      return {
        ...state
      };
    case ActionTypes.FETCH_PURCHASE_ORDER_DISPATCH_PLANS_COMPLETE:
      obj = {
        request: false,
        complete: true,
        error: false,
        data: action.payload
      };
      state.purchaseOrderList[action.id].dispatchPlans = obj;
      return {
        ...state
      };
    case ActionTypes.FETCH_PURCHASE_ORDER_DISPATCH_PLANS_ERROR:
      obj = {
        request: false,
        complete: false,
        error: true,
        errorMessage: action.error
      };
      state.purchaseOrderList[action.id].dispatchPlans = obj;
      return {
        ...state
      };
    case ActionTypes.FETCH_PURCHASE_ORDERS_REQUEST:
      return Object.assign({}, state, {
        request: true,
        complete: false,
        error: false
      });
    case ActionTypes.FETCH_PURCHASE_ORDERS_COMPLETE:
      return Object.assign({}, state, {
        request: false,
        complete: true,
        error: false,
        data: action.payload
      });
    case ActionTypes.FETCH_PURCHASE_ORDERS_ERROR:
      return Object.assign({}, state, {
        request: false,
        complete: false,
        error: true,
        errorMessage: action.error
      });
    default:
      return state;
  }
};

export default purchase_order;
