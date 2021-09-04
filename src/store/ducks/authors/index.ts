import { Reducer } from 'redux';
import { AuthorsState, AuthorsTypes } from './types'

const INITIAL_STATE: AuthorsState = {
  authorData: undefined,
  authorsData: [],
  authorsAutoComplete: [],
  error: false,
  loading: false,
  flagEditing: false,
  flagDetail: false
};

const reducer: Reducer<AuthorsState> = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case AuthorsTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case AuthorsTypes.LOAD_SUCCESS:
      return { ...state, loading: false, error: false, authorsData: action.payload.authorsData };    
    case AuthorsTypes.SEARCH_REQUEST:
      return { ...state, loading: true };
    case AuthorsTypes.SEARCH_SUCCESS:
      return { ...state, loading: false, error: false, authorsData: action.payload.authorsData };    
    case AuthorsTypes.FIND_BY_ID_REQUEST:
      return { ...state, loading: true };
    case AuthorsTypes.FIND_BY_ID_SUCCESS:
      return { ...state, loading: false, error: false, authorData: action.payload.authorData };    
    case AuthorsTypes.FIND_BY_NAME_REQUEST:
      return { ...state, loading: true };
    case AuthorsTypes.FIND_BY_NAME_SUCCESS:
      return { ...state, loading: false, error: false, authorsAutoComplete: action.payload.authorsData };    
    case AuthorsTypes.UPDATE_REQUEST:
      return { ...state, loading: true };
    case AuthorsTypes.UPDATE_SUCCESS:
      return { ...state, loading: false, error: false, flagEditing: !state.flagEditing, authorData: undefined };    
    case AuthorsTypes.CREATE_REQUEST:
      return { ...state, loading: true };
    case AuthorsTypes.CREATE_SUCCESS:
      return { ...state, loading: false, error: false, flagEditing: !state.flagEditing, authorData: undefined };    
    case AuthorsTypes.DELETE_BY_ID_REQUEST:
      return { ...state, loading: true };
    case AuthorsTypes.DELETE_BY_ID_SUCCESS:
      return { 
        ...state, 
        loading: true,
        authorsData: state.authorsData.filter(
          (author) => author.id !== action.payload.data.id
        ) };       
    case AuthorsTypes.CHANGE_FLAG_EDITING:
      return { ...state, flagEditing: !state.flagEditing };
    case AuthorsTypes.CHANGE_FLAG_DETAIL:
      return { ...state, flagDetail: !state.flagDetail };
    case AuthorsTypes.CLEAN_BOOK_EDIT:
      return { ...state, authorData: undefined };    
    default:
      return state;
  }
}

export default reducer;