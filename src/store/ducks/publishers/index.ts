import { Reducer } from 'redux';
import { ApplicationState } from '../..';
import { PublishersState, PublishersTypes as Types } from './types'

const INITIAL_STATE: PublishersState = {
  publisherData: undefined,
  publishersData: [],
  publishersAutoComplete: [],
  booksWillBeDeleted: [],
  error: false,
  loading: false,
  flagEditing: false,
  flagDetail: false,
  requestFilter: undefined,
  responseTotalRows: 0
};

const reducer: Reducer<PublishersState> = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case Types.LOAD_REQUEST:
      return { ...state, loading: true };
    case Types.LOAD_SUCCESS:
      return { ...state, loading: false, error: false, publishersData: action.payload.publishersData };    
    case Types.SEARCH_REQUEST:
      return { ...state, loading: true };
    case Types.SEARCH_SUCCESS:
      return { ...state, loading: false, error: false, publishersData: action.payload.publishersData };    
    case Types.FIND_BY_ID_REQUEST:
      return { ...state, loading: true };
    case Types.FIND_BY_ID_SUCCESS:
      return { ...state, loading: false, error: false, publisherData: action.payload.publisherData };    
    case Types.FIND_BY_NAME_REQUEST:
      return { ...state, loading: true };
    case Types.FIND_BY_NAME_SUCCESS:
      return { ...state, loading: false, error: false, publishersAutoComplete: action.payload.publishersData };    
    case Types.CLEAN_PUBLISHERS_AUTOCOMPLET_LIST:
      return { ...state, loading: false, error: false, publishersAutoComplete: [] };    
    case Types.UPDATE_REQUEST:
      return { ...state, loading: true };
    case Types.UPDATE_SUCCESS:
      return { ...state, loading: false, error: false, flagEditing: !state.flagEditing, publisherData: undefined };    
    case Types.CREATE_REQUEST:
      return { ...state, loading: true };
    case Types.CREATE_SUCCESS:
      return { ...state, loading: false, error: false, publisherData: action.payload.publisherData };    
    case Types.SAFE_DELETE_BY_ID_REQUEST:
      return { ...state, safeDeleteChecked: true };
    case Types.SAFE_DELETE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,          
        booksWillBeDeleted: action.payload.booksData
      };      
    case Types.DELETE_BY_ID_REQUEST:
      return { ...state, loading: true };
    case Types.DELETE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        safeDeleteChecked: false,
        booksWillBeDeleted: [],
        publishersData: state.publishersData.filter(
          (publisher) => publisher.id !== action.payload.data.id
        )
      };      
    case Types.CHANGE_FLAG_EDITING:
      return { ...state, flagEditing: !state.flagEditing };
    case Types.CHANGE_FLAG_DETAIL:
      return { ...state, flagDetail: !state.flagDetail };
    case Types.CLEAN_BOOK_EDIT:
      return { ...state, publisherData: undefined };    
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
const getRequestFilter = (state: ApplicationState) => state.publishers.requestFilter || {};

export const selectors = {
  getRequestFilter
} 