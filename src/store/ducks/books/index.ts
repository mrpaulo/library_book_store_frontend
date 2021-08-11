import { Reducer } from 'redux';
import { BooksState, BooksTypes } from './types'

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
    case BooksTypes.SEARCH_REQUEST:
      return { ...state, loading: true };
    case BooksTypes.SEARCH_SUCCESS:
      return { ...state, loading: false, error: false, booksData: action.payload.booksData };    
    case BooksTypes.FIND_BY_ID_REQUEST:
      return { ...state, loading: true };
    case BooksTypes.FIND_BY_ID_SUCCESS:
      return { ...state, loading: false, error: false, bookData: action.payload.bookData };    
    case BooksTypes.UPDATE_REQUEST:
      return { ...state, loading: true };
    case BooksTypes.UPDATE_SUCCESS:
      return { ...state, loading: false, error: false, flagEditing: !state.flagEditing, bookData: undefined };    
    case BooksTypes.CREATE_REQUEST:
      return { ...state, loading: true };
    case BooksTypes.CREATE_SUCCESS:
      return { ...state, loading: false, error: false, flagEditing: !state.flagEditing, bookData: undefined };    
    case BooksTypes.DELETE_BY_ID_REQUEST:
      return { ...state, loading: true };
    case BooksTypes.DELETE_BY_ID_SUCCESS:     
      return { 
        ...state, 
        loading: true,
        booksData: state.booksData.filter(
          (book) => book.id !== action.payload.data.id
        ) };    
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
    case BooksTypes.BOOK_CONDITION_REQUEST:
      return { ...state, loading: true };
    case BooksTypes.BOOK_CONDITION_SUCCESS:
      return { ...state, booksConditionData: action.payload.bookConditionData };    
    case BooksTypes.BOOK_SUBJECT_REQUEST:
      return { ...state, loading: true };
    case BooksTypes.BOOK_SUBJECT_SUCCESS:
      return { ...state, bookSubjectListData: action.payload.bookSubjectListData };   
    case BooksTypes.BOOK_LANGUAGE_REQUEST:
      return { ...state, loading: true };
    case BooksTypes.BOOK_LANGUAGE_SUCCESS:
      return { ...state, languageListData: action.payload.languageListData };    
    default:
      return state;
  }
}

export default reducer;