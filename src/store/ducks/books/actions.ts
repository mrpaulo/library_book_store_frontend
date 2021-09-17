import { action } from 'typesafe-actions';
import { CustomEnum } from '../../../components/utils/constants';
import { BooksTypes as Types, Book, BookRequestFilter as Filter, BookSubject, BookLanguage} from './types';

export const loadRequest = () => action(Types.LOAD_REQUEST);
export const loadSuccess = (booksData: Book[]) => action(Types.LOAD_SUCCESS,  { booksData });

export const searchRequest = () => action(Types.SEARCH_REQUEST);
export const searchSuccess = (booksData: Book[]) => action(Types.SEARCH_SUCCESS,  { booksData });

export const findByIdRequest = (id: number) => action(Types.FIND_BY_ID_REQUEST,  { id });
export const findByIdSuccess = (bookData: Book) => action(Types.FIND_BY_ID_SUCCESS,  { bookData });

export const updateRequest = (book: Book) => action(Types.UPDATE_REQUEST,  { book });
export const updateSuccess = (bookData: Book) => action(Types.UPDATE_SUCCESS,  { bookData });

export const deleteByIdRequest = (id: number) => action(Types.DELETE_BY_ID_REQUEST,  { id });
export const deleteByIdSuccess = (data: any) => action(Types.DELETE_BY_ID_SUCCESS,  { data });

export const createRequest = (book: Book) => action(Types.CREATE_REQUEST,  { book });
export const createSuccess = (bookData: Book) => action(Types.CREATE_SUCCESS,  { bookData });

export const changeFlagEditing = () => action(Types.CHANGE_FLAG_EDITING);
export const changeFlagDetail = () => action(Types.CHANGE_FLAG_DETAIL);
export const cleanBookEdit = () => action(Types.CLEAN_BOOK_EDIT);

export const bookFormatRequest = () => action(Types.BOOK_FORMAT_REQUEST,  { });
export const bookFormatSuccess = (bookFormatData: CustomEnum[]) => action(Types.BOOK_FORMAT_SUCCESS,  { bookFormatData });

export const bookConditionRequest = () => action(Types.BOOK_CONDITION_REQUEST,  { });
export const bookConditionSuccess = (bookConditionData: CustomEnum[]) => action(Types.BOOK_CONDITION_SUCCESS,  { bookConditionData });

export const bookSubjectRequest = () => action(Types.BOOK_SUBJECT_REQUEST,  { });
export const bookSubjectSuccess = (bookSubjectListData: BookSubject[]) => action(Types.BOOK_SUBJECT_SUCCESS,  { bookSubjectListData });

export const bookLanguageRequest = () => action(Types.BOOK_LANGUAGE_REQUEST,  { });
export const bookLanguageSuccess = (languageListData: BookLanguage[]) => action(Types.BOOK_LANGUAGE_SUCCESS,  { languageListData });

export const updateRequestFilter = (requestFilter: Filter) => action(Types.UPDATE_FILTER,  { requestFilter });
export const cleanRequestFilter = () => action(Types.CLEAN_FILTER);

export const updateTotalRows = (requestData: any) => {
  const responseTotalRows = requestData.headers.totalcount || 0;
  return action(Types.UPDATE_RESPONSE_TOTAL_ROWS,  { responseTotalRows: responseTotalRows });
}