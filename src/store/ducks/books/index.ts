import { Reducer } from 'redux';
import { ApplicationState } from '../..';
import { BooksState, BooksTypes as Types } from './types'

const INITIAL_STATE: BooksState = {
  booksData: [],
  bookData: undefined,
  error: false,
  loading: false,
  flagEditing: false,
  flagDetail: false,
  bookSubjectListData: [],
  booksFormatData: [],
  booksConditionData: [],
  languageListData: [],
  responseTotalRows: 0
};

const reducer: Reducer<BooksState> = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case Types.LOAD_REQUEST:
      return { ...state, loading: true };
    case Types.LOAD_SUCCESS:
      return { ...state, loading: false, error: false, booksData: action.payload.booksData };
    case Types.SEARCH_REQUEST:
      return { ...state, loading: true };
    case Types.SEARCH_SUCCESS:
      return { ...state, loading: false, error: false, booksData: action.payload.booksData };
    case Types.FIND_BY_ID_REQUEST:
      return { ...state, loading: true };
    case Types.FIND_BY_ID_SUCCESS:
      return { ...state, loading: false, error: false, bookData: action.payload.bookData };
    case Types.UPDATE_REQUEST:
      return { ...state, loading: true };
    case Types.UPDATE_SUCCESS:
      return { ...state, loading: false, error: false, flagEditing: !state.flagEditing, bookData: undefined };
    case Types.CREATE_REQUEST:
      return { ...state, loading: true };
    case Types.CREATE_SUCCESS:
      return { ...state, loading: false, error: false, flagEditing: !state.flagEditing, bookData: undefined };
    case Types.DELETE_BY_ID_REQUEST:
      return { ...state, loading: true };
    case Types.DELETE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: true,
        booksData: state.booksData.filter(
          (book) => book.id !== action.payload.data.id
        )
      };
    case Types.CHANGE_FLAG_EDITING:
      return { ...state, flagEditing: !state.flagEditing };
    case Types.CHANGE_FLAG_DETAIL:
      return { ...state, flagDetail: !state.flagDetail };
    case Types.CLEAN_BOOK_EDIT:
      return { ...state, bookData: undefined };
    case Types.BOOK_FORMAT_REQUEST:
      return { ...state, loading: true };
    case Types.BOOK_FORMAT_SUCCESS:
      return { ...state, booksFormatData: action.payload.bookFormatData };
    case Types.BOOK_CONDITION_REQUEST:
      return { ...state, loading: true };
    case Types.BOOK_CONDITION_SUCCESS:
      return { ...state, booksConditionData: action.payload.bookConditionData };
    case Types.BOOK_SUBJECT_REQUEST:
      return { ...state, loading: true };
    case Types.BOOK_SUBJECT_SUCCESS:
      return { ...state, bookSubjectListData: action.payload.bookSubjectListData };
    case Types.BOOK_LANGUAGE_REQUEST:
      return { ...state, loading: true };
    case Types.BOOK_LANGUAGE_SUCCESS:
      return { ...state, languageListData: action.payload.languageListData };
    case Types.UPDATE_FILTER:
      return { ...state, requestFilter: action.payload.requestFilter };
    case Types.CLEAN_FILTER:
      return { ...state, requestFilter: undefined };
    case Types.UPDATE_RESPONSE_TOTAL_ROWS:
      return { ...state, responseTotalRows: action.payload.responseTotalRows };
    default:
      return state;
  }
}

export default reducer;

// SELECTORS
const getRequestFilter = (state: ApplicationState) => state.books.requestFilter || {};

export const selectors = {
  getRequestFilter
}