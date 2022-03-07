import {
  CART_LOADING,
  CART_SET_DATA
} from "./constants";

const initialState = {
  cartItems: [],
  loading: false,
};
export function cartReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case CART_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case CART_SET_DATA:
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
}
