import { Reducer } from 'redux';
import { BooksState, BooksTypes } from './types'
import { enqueue as notifierEnqueue } from '../notifications/actions'

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
  languageListData: []
};

const reducer: Reducer<BooksState> = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case BooksTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case BooksTypes.LOAD_SUCCESS:
      return { ...state, loading: false, error: false, booksData: action.payload.booksData };
    case BooksTypes.LOAD_FAILURE:
      return { ...state, loading: false, error: true, booksData: [] };
    case BooksTypes.SEARCH_REQUEST:
      return { ...state, loading: true };
    case BooksTypes.SEARCH_SUCCESS:
      return { ...state, loading: false, error: false, booksData: action.payload.booksData };
    case BooksTypes.SEARCH_FAILURE:
      return { ...state, loading: false, error: true, booksData: [] };
    case BooksTypes.FIND_BY_ID_REQUEST:
      return { ...state, loading: true };
    case BooksTypes.FIND_BY_ID_SUCCESS:
      return { ...state, loading: false, error: false, bookData: action.payload.bookData };
    case BooksTypes.FIND_BY_ID_FAILURE:
      return { ...state, loading: false, error: true, bookData: undefined };
    case BooksTypes.UPDATE_REQUEST:
      return { ...state, loading: true };
    case BooksTypes.UPDATE_SUCCESS:
      return { ...state, loading: false, error: false, bookData: action.payload.bookData };
    case BooksTypes.UPDATE_FAILURE:
      return { ...state, loading: false, error: true, bookData: undefined };
    case BooksTypes.CREATE_REQUEST:
      return { ...state, loading: true };
    case BooksTypes.CREATE_SUCCESS:
      let book =  action.payload.bookData;   
      notifierEnqueue({message: "notifications.sucess", id: book.id}, false);
      return { ...state, loading: false, error: false, bookData: book, flagEditing: !state.flagEditing };
    case BooksTypes.CREATE_FAILURE:   
      notifierEnqueue({message: "notifications.error", id: 1}, false);   
      return { ...state, loading: false, error: true, bookData: undefined };
    case BooksTypes.DELETE_BY_ID_REQUEST:
      return { ...state, loading: true };
    case BooksTypes.DELETE_BY_ID_SUCCESS:
      return { ...state, loading: false, error: false, bookData: action.payload.bookData };
    case BooksTypes.DELETE_BY_ID_FAILURE:
      return { ...state, loading: false, error: true, bookData: undefined };
    case BooksTypes.CHANGE_FLAG_EDITING:
      return { ...state, flagEditing: !state.flagEditing };
    case BooksTypes.CHANGE_FLAG_DETAIL:
      return { ...state, flagDetail: !state.flagDetail };
    case BooksTypes.CLEAN_BOOK_EDIT:
      return { ...state, bookData: undefined };
    case BooksTypes.BOOK_FORMAT_REQUEST:
      return { ...state, loading: true };
    case BooksTypes.BOOK_FORMAT_SUCCESS:
      return { ...state, booksFormatData: action.payload.bookFormatData };
    case BooksTypes.BOOK_FORMAT_FAILURE:
      return { ...state, loading: false, booksFormatData: [] };
    case BooksTypes.BOOK_CONDITION_REQUEST:
      return { ...state, loading: true };
    case BooksTypes.BOOK_CONDITION_SUCCESS:
      return { ...state, booksConditionData: action.payload.bookConditionData };
    case BooksTypes.BOOK_CONDITION_FAILURE:
      return { ...state, loading: false, booksConditionData: [] };
    case BooksTypes.BOOK_SUBJECT_REQUEST:
      return { ...state, loading: true };
    case BooksTypes.BOOK_SUBJECT_SUCCESS:
      return { ...state, bookSubjectListData: action.payload.bookSubjectListData };
    case BooksTypes.BOOK_SUBJECT_FAILURE:
      return { ...state, loading: false, booksConditionData: [] };
    case BooksTypes.BOOK_LANGUAGE_REQUEST:
      return { ...state, loading: true };
    case BooksTypes.BOOK_LANGUAGE_SUCCESS:
      return { ...state, languageListData: action.payload.languageListData };
    case BooksTypes.BOOK_LANGUAGE_FAILURE:
      return { ...state, loading: false, languageListData: [] };
    default:
      return state;
  }
}

export default reducer;