import { action } from 'typesafe-actions';
import { BooksTypes, Book, BookFilter} from './types';

export const loadRequest = () => action(BooksTypes.LOAD_REQUEST);
export const loadSuccess = (booksData: Book[]) => action(BooksTypes.LOAD_SUCCESS,  { booksData });
export const loadFailure = () => action(BooksTypes.LOAD_FAILURE);

export const searchRequest = (filter: BookFilter) => action(BooksTypes.SEARCH_REQUEST, { filter});
export const searchSuccess = (booksData: Book[]) => action(BooksTypes.SEARCH_SUCCESS,  { booksData });
export const searchFailure = () => action(BooksTypes.SEARCH_FAILURE);

export const findByIdRequest = (id: number) => action(BooksTypes.FIND_BY_ID_REQUEST,  { id });
export const findByIdSuccess = (bookData: Book) => action(BooksTypes.FIND_BY_ID_SUCCESS,  { bookData });
export const findByIdFailure = () => action(BooksTypes.FIND_BY_ID_FAILURE);

export const updateRequest = (book: Book) => action(BooksTypes.UPDATE_REQUEST,  { book });
export const updateSuccess = (bookData: Book) => action(BooksTypes.UPDATE_SUCCESS,  { bookData });
export const updateFailure = () => action(BooksTypes.UPDATE_FAILURE);

export const deleteByIdRequest = (id: number) => action(BooksTypes.DELETE_BY_ID_REQUEST,  { id });
export const deleteByIdSuccess = (data: boolean) => action(BooksTypes.DELETE_BY_ID_SUCCESS,  { data });
export const deleteByIdFailure = () => action(BooksTypes.DELETE_BY_ID_FAILURE);

export const createRequest = (book: Book) => action(BooksTypes.CREATE_REQUEST,  { book });
export const createSuccess = (bookData: Book) => action(BooksTypes.CREATE_SUCCESS,  { bookData });
export const createFailure = () => action(BooksTypes.CREATE_FAILURE);

export const changeFlagEditing = () => action(BooksTypes.CHANGE_FLAG_EDITING);
export const changeFlagDetail = () => action(BooksTypes.CHANGE_FLAG_DETAIL);
export const cleanBookEdit = () => action(BooksTypes.CLEAN_BOOK_EDIT);