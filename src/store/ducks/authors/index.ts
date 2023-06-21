import { Reducer } from 'redux';
import { ApplicationState } from '../..';
import { AuthorsState, AuthorsTypes as Types } from './types'

const INITIAL_STATE: AuthorsState = {
  authorData: undefined,
  authorsData: [],
  authorsAutoComplete: [],
  requestFilter: undefined,
  error: false,
  loading: false,
  flagEditing: false,
  flagDetail: false,
  responseTotalRows: 0
};

const reducer: Reducer<AuthorsState> = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case Types.LOAD_REQUEST:
      return { ...state, loading: true };
    case Types.LOAD_SUCCESS:
      return { ...state, loading: false, error: false, authorsData: action.payload.authorsData };

    case Types.SEARCH_REQUEST:
      return { ...state, loading: true };
    case Types.SEARCH_SUCCESS:
      return { ...state, loading: false, error: false, authorsData: action.payload.authorsData };
    case Types.FIND_BY_ID_REQUEST:
      return { ...state, loading: true };
    case Types.FIND_BY_ID_SUCCESS:
      return { ...state, loading: false, error: false, authorData: action.payload.authorData };
    case Types.FIND_BY_NAME_REQUEST:
      return { ...state, loading: true };
    case Types.FIND_BY_NAME_SUCCESS:
      return { ...state, loading: false, error: false, authorsAutoComplete: action.payload.authorsData };
    case Types.CLEAN_AUTHORS_AUTO_COMPLET_LIST:
      return { ...state, loading: false, error: false, authorsAutoComplete: [] };
    case Types.UPDATE_REQUEST:
      return { ...state, loading: true };
    case Types.UPDATE_SUCCESS:
      return { ...state, loading: false, error: false, flagEditing: !state.flagEditing, authorData: undefined };
    case Types.CREATE_REQUEST:
      return { ...state, loading: true };
    case Types.CREATE_SUCCESS:
      return { ...state, loading: false, error: false, flagEditing: !state.flagEditing, authorData: undefined };
    case Types.DELETE_BY_ID_REQUEST:
      return { ...state, loading: true };
    case Types.DELETE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: true,
        authorsData: state.authorsData.filter(
          (author) => author.id !== action.payload.data.id
        )
      };
    case Types.CHANGE_FLAG_EDITING:
      return { ...state, flagEditing: !state.flagEditing };
    case Types.CHANGE_FLAG_DETAIL:
      return { ...state, flagDetail: !state.flagDetail };
    case Types.CLEAN_BOOK_EDIT:
      return { ...state, authorData: undefined };
    case Types.UPDATE_FILTER:      
      return { ...state, requestFilter: action.payload.requestFilter };
    case Types.CLEAN_FILTER:
      return { ...state, requestFilter: undefined };
    case Types.UPDATE_RESPONSE_TOTAL_ROWS:
      return{...state, responseTotalRows: action.payload.responseTotalRows};
    default:
      return state;
  }
}

export default reducer;

// SELECTORS
const getRequestFilter = (state: ApplicationState) => state.authors.requestFilter || {};

export const selectors = {
  getRequestFilter
}