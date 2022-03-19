import { Reducer } from 'redux';
import { ApplicationState } from '../..';
import { UsersState, UsersTypes as Types } from './types'

const INITIAL_STATE: UsersState = {
  userData: undefined,
  usersData: [],
  usersAutoComplete: [],
  rolesListData: [],
  error: false,
  loading: false,
  flagEditing: false,
  flagDetail: false,
  requestFilter: undefined,
  responseTotalRows: 0
};

const reducer: Reducer<UsersState> = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case Types.LOAD_REQUEST:
      return { ...state, loading: true };
    case Types.LOAD_SUCCESS:
      return { ...state, loading: false, error: false, usersData: action.payload.usersData };    
    case Types.SEARCH_REQUEST:
      return { ...state, loading: true };
    case Types.SEARCH_SUCCESS:
      return { ...state, loading: false, error: false, usersData: action.payload.usersData };    
    case Types.FIND_BY_ID_REQUEST:
      return { ...state, loading: true };
    case Types.FIND_BY_ID_SUCCESS:
      return { ...state, loading: false, error: false, userData: action.payload.userData };    
    case Types.FIND_BY_NAME_REQUEST:
      return { ...state, loading: true };
    case Types.FIND_BY_NAME_SUCCESS:
      return { ...state, loading: false, error: false, usersAutoComplete: action.payload.usersData };    
    case Types.UPDATE_REQUEST:
      return { ...state, loading: true };
    case Types.UPDATE_SUCCESS:
      return { ...state, loading: false, error: false, flagEditing: !state.flagEditing, userData: undefined };    
    case Types.CREATE_REQUEST:
      return { ...state, loading: true };
    case Types.CREATE_SUCCESS:
      return { ...state, loading: false, error: false, flagEditing: !state.flagEditing, userData: undefined };    
    case Types.DELETE_BY_ID_REQUEST:
      return { ...state, loading: true };
    case Types.DELETE_BY_ID_SUCCESS:
      return { ...state, loading: false, error: false, userData: action.payload.userData };    
    case Types.CHANGE_FLAG_EDITING:
      return { ...state, flagEditing: !state.flagEditing };
    case Types.CHANGE_FLAG_DETAIL:
      return { ...state, flagDetail: !state.flagDetail };
    case Types.CLEAN_BOOK_EDIT:
      return { ...state, userData: undefined };    
      case Types.UPDATE_FILTER:
        return { ...state, requestFilter: action.payload.requestFilter };
      case Types.CLEAN_FILTER:
        return { ...state, requestFilter: undefined };
      case Types.UPDATE_RESPONSE_TOTAL_ROWS:
        return { ...state, responseTotalRows: action.payload.responseTotalRows };
        case Types.ROLE_REQUEST:
          return { ...state, loading: true };
        case Types.ROLE_SUCCESS:
          return { ...state, loading: false, error: false, rolesListData: action.payload.rolesListData };
    default:
      return state;
  }
}

export default reducer;

// SELECTORS
const getRequestFilter = (state: ApplicationState) => state.users.requestFilter || {};

export const selectors = {
  getRequestFilter
} 