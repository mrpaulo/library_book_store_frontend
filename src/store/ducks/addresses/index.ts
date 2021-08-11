import { Reducer } from 'redux';
import { AddressesState, AddressesTypes } from './types'

const INITIAL_STATE: AddressesState = {
  addressData: undefined,
  addressesData: [],
  addressesDTO: [],
  logradourosListData: [],
  citiesListData: [],
  statesListData: [],
  countriesListData: [],
  error: false,
  loading: false,
  flagEditing: false,
  flagDetail: false
};

const reducer: Reducer<AddressesState> = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case AddressesTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case AddressesTypes.LOAD_SUCCESS:
      return { ...state, loading: false, error: false, addressesData: action.payload.addressesData };
    case AddressesTypes.SEARCH_REQUEST:
      return { ...state, loading: true };
    case AddressesTypes.SEARCH_SUCCESS:
      return { ...state, loading: false, error: false, addressesData: action.payload.addressesData };
    case AddressesTypes.FIND_BY_ID_REQUEST:
      return { ...state, loading: true };
    case AddressesTypes.FIND_BY_ID_SUCCESS:
      return { ...state, loading: false, error: false, addressData: action.payload.addressData };
    case AddressesTypes.FIND_BY_NAME_REQUEST:
      return { ...state, loading: true };
    case AddressesTypes.FIND_BY_NAME_SUCCESS:
      return { ...state, loading: false, error: false, addressesDTO: action.payload.addressesData };
    case AddressesTypes.UPDATE_REQUEST:
      return { ...state, loading: true };
    case AddressesTypes.UPDATE_SUCCESS:
      return { ...state, loading: false, error: false, addressData: action.payload.addressData };
    case AddressesTypes.CREATE_REQUEST:
      return { ...state, loading: true };
    case AddressesTypes.CREATE_SUCCESS:
      return { ...state, loading: false, error: false, addressData: action.payload.addressData };
    case AddressesTypes.DELETE_BY_ID_REQUEST:
      return { ...state, loading: true };
    case AddressesTypes.DELETE_BY_ID_SUCCESS:
      return { ...state, loading: false, error: false, addressData: action.payload.addressData };
    case AddressesTypes.LOGRADOURO_REQUEST:
      return { ...state, loading: true };
    case AddressesTypes.LOGRADOURO_SUCCESS:
      return { ...state, loading: false, error: false, logradourosListData: action.payload.logradourosListData };
    case AddressesTypes.CITY_REQUEST:
      return { ...state, loading: true };
    case AddressesTypes.CITY_SUCCESS:
      return { ...state, loading: false, error: false, citiesListData: action.payload.citiesListData };
    case AddressesTypes.STATE_REQUEST:
      return { ...state, loading: true };
    case AddressesTypes.STATE_SUCCESS:
      return { ...state, loading: false, error: false, statesListData: action.payload.statesListData };
    case AddressesTypes.COUNTRY_REQUEST:
      return { ...state, loading: true };
    case AddressesTypes.COUNTRY_SUCCESS:
      return { ...state, loading: false, error: false, countriesListData: action.payload.countriesListData };
    case AddressesTypes.CHANGE_FLAG_EDITING:
      return { ...state, flagEditing: !state.flagEditing };
    case AddressesTypes.CHANGE_FLAG_DETAIL:
      return { ...state, flagDetail: !state.flagDetail };
    case AddressesTypes.CLEAN_ADDRESS_EDIT:
      return { ...state, addressData: undefined };
    default:
      return state;
  }
}

export default reducer;