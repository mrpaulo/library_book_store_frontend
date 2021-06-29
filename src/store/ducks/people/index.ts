import { Reducer } from 'redux';
import { PeopleState, PeopleTypes } from './types'

const INITIAL_STATE: PeopleState = {
  companyData: undefined,
  peopleData: [],
  peopleAutoComplete: [],
  error: false,
  loading: false,
  flagEditing: false,
  flagDetail: false
};

const reducer: Reducer<PeopleState> = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case PeopleTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case PeopleTypes.LOAD_SUCCESS:
      return { ...state, loading: false, error: false, peopleData: action.payload.peopleData };
    case PeopleTypes.LOAD_FAILURE:
      return { ...state, loading: false, error: true, peopleData: [] };
    case PeopleTypes.SEARCH_REQUEST:
      return { ...state, loading: true };
    case PeopleTypes.SEARCH_SUCCESS:
      return { ...state, loading: false, error: false, peopleData: action.payload.peopleData };
    case PeopleTypes.SEARCH_FAILURE:
      return { ...state, loading: false, error: true, peopleData: [] };
    case PeopleTypes.FIND_BY_ID_REQUEST:
      return { ...state, loading: true };
    case PeopleTypes.FIND_BY_ID_SUCCESS:
      return { ...state, loading: false, error: false, companyData: action.payload.companyData };
    case PeopleTypes.FIND_BY_ID_FAILURE:
      return { ...state, loading: false, error: true, companyData: undefined };
    case PeopleTypes.FIND_BY_NAME_REQUEST:
      return { ...state, loading: true };
    case PeopleTypes.FIND_BY_NAME_SUCCESS:
      return { ...state, loading: false, error: false, peopleAutoComplete: action.payload.peopleData };
    case PeopleTypes.FIND_BY_NAME_FAILURE:
      return { ...state, loading: false, error: true, peopleAutoComplete: undefined };
    case PeopleTypes.UPDATE_REQUEST:
      return { ...state, loading: true };
    case PeopleTypes.UPDATE_SUCCESS:
      return { ...state, loading: false, error: false, companyData: action.payload.companyData };
    case PeopleTypes.UPDATE_FAILURE:
      return { ...state, loading: false, error: true, companyData: undefined };
    case PeopleTypes.CREATE_REQUEST:
      return { ...state, loading: true };
    case PeopleTypes.CREATE_SUCCESS:
      return { ...state, loading: false, error: false, companyData: action.payload.companyData };
    case PeopleTypes.CREATE_FAILURE:
      return { ...state, loading: false, error: true, companyData: undefined };
    case PeopleTypes.DELETE_BY_ID_REQUEST:
      return { ...state, loading: true };
    case PeopleTypes.DELETE_BY_ID_SUCCESS:
      return { ...state, loading: false, error: false, companyData: action.payload.companyData };
    case PeopleTypes.DELETE_BY_ID_FAILURE:
      return { ...state, loading: false, error: true, companyData: undefined };
    case PeopleTypes.CHANGE_FLAG_EDITING:
      return { ...state, flagEditing: !state.flagEditing };
    case PeopleTypes.CHANGE_FLAG_DETAIL:
      return { ...state, flagDetail: !state.flagDetail };
    case PeopleTypes.CLEAN_BOOK_EDIT:
      return { ...state, companyData: undefined };    
    default:
      return state;
  }
}

export default reducer;