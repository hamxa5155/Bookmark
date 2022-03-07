import {
  BOOKS_LOADING,
  BOOKS_SET_DATA,
  BOOKS_SET_ALL_BOOKS
} from "./constants";
import {_fetchBooks, _createBook} from "./services";

/* Login actions */
export function booksSetLoading(loading) {
  return {
    type: BOOKS_LOADING,
    payload: loading,
  };
}
export function booksSetData(params) {
  return {
    type: BOOKS_SET_DATA,
    payload: params,
  };
}
export function booksSetAllBooks(params) {
	return {
	  type: BOOKS_SET_ALL_BOOKS,
	  payload: params,
	};
  }
export const fetchBooks = (params) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch(booksSetLoading(true));
		_fetchBooks(params).then(async (res) => {
			if(params.type === "own"){
				await dispatch(booksSetData(res));
			}else{
				await dispatch(booksSetAllBooks(res));
			}
			resolve(res);
		}).catch((err) => {
			reject(err)
		}).finally(() => {
			dispatch(booksSetLoading(false));
		})
	})
};
export const createBook = (formData) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch(booksSetLoading(true));
		_createBook(formData).then(async (res) => {
			await dispatch(fetchBooks({type: "own"}));
			dispatch(fetchBooks({type: "marketplace"}));
			resolve(res);
		}).catch((err) => {
			reject(err)
		}).finally(() => {
			dispatch(booksSetLoading(false));
		})
	})
};
