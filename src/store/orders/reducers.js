import {
  ORDER_LOADING,
  ORDER_SET_DATA,
} from "./constants";

const initialState = {
  orders: [],
  loading: false,
};
export function orderReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case ORDER_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case ORDER_SET_DATA:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
}
