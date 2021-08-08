import {
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
} from "../actions/actionTypes";

import { updateObj } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchase: false,
};

const fetchOrdersStart = (state, action) => {
  return updateObj(state, { loading: true });
};

const fetchOrderSuccess = (state, action) => {
  return updateObj(state, { orders: action.orders, loading: false });
};

const fetchOrdersFail = (state, action) => {
  return updateObj(state, { loading: false });
};

const purchaseInit = (state, action) => {
  return updateObj(state, { purchase: false });
};

const purchaseBurgetStart = (state, action) => {
  return updateObj(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObj(action.orderData, action.orderId);
  return updateObj(state, {
    loading: false,
    purchase: true,
    orders: state.orders.concat(newOrder),
  });
};

const purchaseBurgerFail = (state, action) => {
  updateObj(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case FETCH_ORDERS_SUCCESS:
      return fetchOrderSuccess(state, action);
    case FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    case PURCHASE_INIT:
      return purchaseInit(state, action);
    case PURCHASE_BURGER_START:
      return purchaseBurgetStart(state, action);
    case PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    default:
      return state;
  }
};

export default reducer;
