import {
  ORDER_LOADING,
  ORDER_SET_DATA,
} from "./constants";
import {_fetchOrders, _placeOrder} from "./services";
import {fetchCart} from "../cart/actions";

export function orderSetLoading(loading) {
  return {
    type: ORDER_LOADING,
    payload: loading,
  };
}
export function orderSetData(params) {
  return {
    type: ORDER_SET_DATA,
    payload: params,
  };
}
export const fetchOrders = () => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch(orderSetLoading(true));
		_fetchOrders().then(async (res) => {
			await dispatch(orderSetData(res));
			resolve(res);
		}).catch((err) => {
			reject(err)
		}).finally(() => {
			dispatch(orderSetLoading(false));
		})
	})
};
export const placeOrder = (formData) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch(orderSetLoading(true));
		_placeOrder(formData).then(async (res) => {
			await dispatch(fetchOrders());
			await dispatch(fetchCart());
			resolve(res);
		}).catch((err) => {
			reject(err)
		}).finally(() => {
			dispatch(orderSetLoading(false));
		})
	})
};