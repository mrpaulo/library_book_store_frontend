import { action } from 'typesafe-actions';
import { CustomEnum } from '../../../components/utils/constants';
import { BooksTypes, Book, BookFilter, BookSubject, BookLanguage} from './types';

export const loadRequest = () => action(BooksTypes.LOAD_REQUEST);
export const loadSuccess = (booksData: Book[]) => action(BooksTypes.LOAD_SUCCESS,  { booksData });

export const searchRequest = (filter: BookFilter) => action(BooksTypes.SEARCH_REQUEST, { filter});
export const searchSuccess = (booksData: Book[]) => action(BooksTypes.SEARCH_SUCCESS,  { booksData });

export const findByIdRequest = (id: number) => action(BooksTypes.FIND_BY_ID_REQUEST,  { id });
export const findByIdSuccess = (bookData: Book) => action(BooksTypes.FIND_BY_ID_SUCCESS,  { bookData });

export const updateRequest = (book: Book) => action(BooksTypes.UPDATE_REQUEST,  { book });
export const updateSuccess = (bookData: Book) => action(BooksTypes.UPDATE_SUCCESS,  { bookData });

export const deleteByIdRequest = (id: number) => action(BooksTypes.DELETE_BY_ID_REQUEST,  { id });
export const deleteByIdSuccess = (data: any) => action(BooksTypes.DELETE_BY_ID_SUCCESS,  { data });

export const createRequest = (book: Book) => action(BooksTypes.CREATE_REQUEST,  { book });
export const createSuccess = (bookData: Book) => action(BooksTypes.CREATE_SUCCESS,  { bookData });

export const changeFlagEditing = () => action(BooksTypes.CHANGE_FLAG_EDITING);
export const changeFlagDetail = () => action(BooksTypes.CHANGE_FLAG_DETAIL);
export const cleanBookEdit = () => action(BooksTypes.CLEAN_BOOK_EDIT);

export const bookFormatRequest = () => action(BooksTypes.BOOK_FORMAT_REQUEST,  { });
export const bookFormatSuccess = (bookFormatData: CustomEnum[]) => action(BooksTypes.BOOK_FORMAT_SUCCESS,  { bookFormatData });

export const bookConditionRequest = () => action(BooksTypes.BOOK_CONDITION_REQUEST,  { });
export const bookConditionSuccess = (bookConditionData: CustomEnum[]) => action(BooksTypes.BOOK_CONDITION_SUCCESS,  { bookConditionData });

export const bookSubjectRequest = () => action(BooksTypes.BOOK_SUBJECT_REQUEST,  { });
export const bookSubjectSuccess = (bookSubjectListData: BookSubject[]) => action(BooksTypes.BOOK_SUBJECT_SUCCESS,  { bookSubjectListData });

export const bookLanguageRequest = () => action(BooksTypes.BOOK_LANGUAGE_REQUEST,  { });
export const bookLanguageSuccess = (languageListData: BookLanguage[]) => action(BooksTypes.BOOK_LANGUAGE_SUCCESS,  { languageListData });