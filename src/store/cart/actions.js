import {
  CART_LOADING,
  CART_SET_DATA,
} from "./constants";
import {_fetchCart, _addItem, _removeItem} from "./services";

/* Login actions */
export function cartSetLoading(loading) {
  return {
    type: CART_LOADING,
    payload: loading,
  };
}
export function cartSetData(params) {
  return {
    type: CART_SET_DATA,
    payload: params,
  };
}
export const fetchCart = () => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch(cartSetLoading(true));
		_fetchCart().then(async (res) => {
			await dispatch(cartSetData(res));
			resolve(res);
		}).catch((err) => {
			reject(err)
		}).finally(() => {
			dispatch(cartSetLoading(false));
		})
	})
};
export const addItem = (formData) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch(cartSetLoading(true));
		_addItem(formData).then(async (res) => {
			await dispatch(fetchCart());
			resolve(res);
		}).catch((err) => {
			reject(err)
		}).finally(() => {
			dispatch(cartSetLoading(false));
		})
	})
};
export const removeItem = (formData) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch(cartSetLoading(true));
		_removeItem(formData).then(async (res) => {
			await dispatch(fetchCart());
			resolve(res);
		}).catch((err) => {
			reject(err)
		}).finally(() => {
			dispatch(cartSetLoading(false));
		})
	})
};