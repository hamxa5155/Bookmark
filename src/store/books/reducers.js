import {
  BOOKS_LOADING,
  BOOKS_SET_DATA,
  BOOKS_SET_ALL_BOOKS
} from "./constants";

const initialState = {
  books: [],
  allBooks: [],
  loading: false,
};
export function booksReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case BOOKS_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case BOOKS_SET_DATA:
      return {
        ...state,
        books: action.payload,
      };
    case BOOKS_SET_ALL_BOOKS:
      return {
        ...state,
        allBooks: action.payload,
      };
    default:
      return state;
  }
}
