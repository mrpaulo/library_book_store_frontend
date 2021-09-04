import { Reducer } from 'redux';
import { PublishersState, PublishersTypes } from './types'

const INITIAL_STATE: PublishersState = {
  publisherData: undefined,
  publishersData: [],
  publishersAutoComplete: [],
  error: false,
  loading: false,
  flagEditing: false,
  flagDetail: false
};

const reducer: Reducer<PublishersState> = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case PublishersTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case PublishersTypes.LOAD_SUCCESS:
      return { ...state, loading: false, error: false, publishersData: action.payload.publishersData };    
    case PublishersTypes.SEARCH_REQUEST:
      return { ...state, loading: true };
    case PublishersTypes.SEARCH_SUCCESS:
      return { ...state, loading: false, error: false, publishersData: action.payload.publishersData };    
    case PublishersTypes.FIND_BY_ID_REQUEST:
      return { ...state, loading: true };
    case PublishersTypes.FIND_BY_ID_SUCCESS:
      return { ...state, loading: false, error: false, publisherData: action.payload.publisherData };    
    case PublishersTypes.FIND_BY_NAME_REQUEST:
      return { ...state, loading: true };
    case PublishersTypes.FIND_BY_NAME_SUCCESS:
      return { ...state, loading: false, error: false, publishersAutoComplete: action.payload.publishersData };    
    case PublishersTypes.UPDATE_REQUEST:
      return { ...state, loading: true };
    case PublishersTypes.UPDATE_SUCCESS:
      return { ...state, loading: false, error: false, publisherData: action.payload.publisherData };    
    case PublishersTypes.CREATE_REQUEST:
      return { ...state, loading: true };
    case PublishersTypes.CREATE_SUCCESS:
      return { ...state, loading: false, error: false, publisherData: action.payload.publisherData };    
    case PublishersTypes.DELETE_BY_ID_REQUEST:
      return { ...state, loading: true };
    case PublishersTypes.DELETE_BY_ID_SUCCESS:
      return { ...state, loading: false, error: false, publisherData: action.payload.publisherData };    
    case PublishersTypes.CHANGE_FLAG_EDITING:
      return { ...state, flagEditing: !state.flagEditing };
    case PublishersTypes.CHANGE_FLAG_DETAIL:
      return { ...state, flagDetail: !state.flagDetail };
    case PublishersTypes.CLEAN_BOOK_EDIT:
      return { ...state, publisherData: undefined };    
    default:
      return state;
  }
}

export default reducer;