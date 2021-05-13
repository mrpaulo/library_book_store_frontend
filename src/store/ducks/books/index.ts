import { Reducer } from 'redux';
import { BooksState, BooksTypes } from './types'

const INITIAL_STATE: BooksState = {
  booksData: [],
  bookData: undefined,
  error: false,
  loading: false,
  flagEditing: false,
  flagDetail: false
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
      return { ...state, loading: false, error: false, bookData: action.payload.bookData };
    case BooksTypes.CREATE_FAILURE:
      return { ...state, loading: false, error: true, bookData: undefined };
    case BooksTypes.DELETE_BY_ID_REQUEST:
      return { ...state, loading: true };
    case BooksTypes.DELETE_BY_ID_SUCCESS:
      return { ...state, loading: false, error: false, bookData: action.payload.bookData };
    case BooksTypes.DELETE_BY_ID_FAILURE:
      return { ...state, loading: false, error: true, bookData: undefined };
    case BooksTypes.CHANGE_FLAG_EDITING:      
      return { ...state, flagEditing: !state.flagEditing};
    case BooksTypes.CHANGE_FLAG_DETAIL:
      return { ...state, flagDetail: !state.flagDetail };
    default:
      return state;
  }
}


export default reducer;