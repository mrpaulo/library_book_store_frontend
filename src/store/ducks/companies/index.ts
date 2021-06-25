import { Reducer } from 'redux';
import { CompaniesState, CompaniesTypes } from './types'

const INITIAL_STATE: CompaniesState = {
  companyData: undefined,
  companiesData: [],
  companiesAutoComplete: [],
  error: false,
  loading: false,
  flagEditing: false,
  flagDetail: false
};

const reducer: Reducer<CompaniesState> = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case CompaniesTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case CompaniesTypes.LOAD_SUCCESS:
      return { ...state, loading: false, error: false, companiesData: action.payload.companiesData };
    case CompaniesTypes.LOAD_FAILURE:
      return { ...state, loading: false, error: true, companiesData: [] };
    case CompaniesTypes.SEARCH_REQUEST:
      return { ...state, loading: true };
    case CompaniesTypes.SEARCH_SUCCESS:
      return { ...state, loading: false, error: false, companiesData: action.payload.companiesData };
    case CompaniesTypes.SEARCH_FAILURE:
      return { ...state, loading: false, error: true, companiesData: [] };
    case CompaniesTypes.FIND_BY_ID_REQUEST:
      return { ...state, loading: true };
    case CompaniesTypes.FIND_BY_ID_SUCCESS:
      return { ...state, loading: false, error: false, companyData: action.payload.companyData };
    case CompaniesTypes.FIND_BY_ID_FAILURE:
      return { ...state, loading: false, error: true, companyData: undefined };
    case CompaniesTypes.FIND_BY_NAME_REQUEST:
      return { ...state, loading: true };
    case CompaniesTypes.FIND_BY_NAME_SUCCESS:
      return { ...state, loading: false, error: false, companiesAutoComplete: action.payload.companiesData };
    case CompaniesTypes.FIND_BY_NAME_FAILURE:
      return { ...state, loading: false, error: true, companiesAutoComplete: undefined };
    case CompaniesTypes.UPDATE_REQUEST:
      return { ...state, loading: true };
    case CompaniesTypes.UPDATE_SUCCESS:
      return { ...state, loading: false, error: false, companyData: action.payload.companyData };
    case CompaniesTypes.UPDATE_FAILURE:
      return { ...state, loading: false, error: true, companyData: undefined };
    case CompaniesTypes.CREATE_REQUEST:
      return { ...state, loading: true };
    case CompaniesTypes.CREATE_SUCCESS:
      return { ...state, loading: false, error: false, companyData: action.payload.companyData };
    case CompaniesTypes.CREATE_FAILURE:
      return { ...state, loading: false, error: true, companyData: undefined };
    case CompaniesTypes.DELETE_BY_ID_REQUEST:
      return { ...state, loading: true };
    case CompaniesTypes.DELETE_BY_ID_SUCCESS:
      return { ...state, loading: false, error: false, companyData: action.payload.companyData };
    case CompaniesTypes.DELETE_BY_ID_FAILURE:
      return { ...state, loading: false, error: true, companyData: undefined };
    case CompaniesTypes.CHANGE_FLAG_EDITING:
      return { ...state, flagEditing: !state.flagEditing };
    case CompaniesTypes.CHANGE_FLAG_DETAIL:
      return { ...state, flagDetail: !state.flagDetail };
    case CompaniesTypes.CLEAN_BOOK_EDIT:
      return { ...state, companyData: undefined };    
    default:
      return state;
  }
}

export default reducer;