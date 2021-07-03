import { Reducer } from 'redux';
import { AddressesState, AddressesTypes } from './types'

const INITIAL_STATE: AddressesState = {
  addressData: undefined,
  addressesData: [],
  addressesDTO: [],
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
    case AddressesTypes.LOAD_FAILURE:
      return { ...state, loading: false, error: true, addressesData: [] };
    case AddressesTypes.SEARCH_REQUEST:
      return { ...state, loading: true };
    case AddressesTypes.SEARCH_SUCCESS:
      return { ...state, loading: false, error: false, addressesData: action.payload.addressesData };
    case AddressesTypes.SEARCH_FAILURE:
      return { ...state, loading: false, error: true, addressesData: [] };
    case AddressesTypes.FIND_BY_ID_REQUEST:
      return { ...state, loading: true };
    case AddressesTypes.FIND_BY_ID_SUCCESS:
      return { ...state, loading: false, error: false, addressData: action.payload.addressData };
    case AddressesTypes.FIND_BY_ID_FAILURE:
      return { ...state, loading: false, error: true, addressData: undefined };
    case AddressesTypes.FIND_BY_NAME_REQUEST:
      return { ...state, loading: true };
    case AddressesTypes.FIND_BY_NAME_SUCCESS:
      return { ...state, loading: false, error: false, addressesDTO: action.payload.addressesData };
    case AddressesTypes.FIND_BY_NAME_FAILURE:
      return { ...state, loading: false, error: true, addressesDTO: undefined };
    case AddressesTypes.UPDATE_REQUEST:
      return { ...state, loading: true };
    case AddressesTypes.UPDATE_SUCCESS:
      return { ...state, loading: false, error: false, addressData: action.payload.addressData };
    case AddressesTypes.UPDATE_FAILURE:
      return { ...state, loading: false, error: true, addressData: undefined };
    case AddressesTypes.CREATE_REQUEST:
      return { ...state, loading: true };
    case AddressesTypes.CREATE_SUCCESS:
      return { ...state, loading: false, error: false, addressData: action.payload.addressData };
    case AddressesTypes.CREATE_FAILURE:
      return { ...state, loading: false, error: true, addressData: undefined };
    case AddressesTypes.DELETE_BY_ID_REQUEST:
      return { ...state, loading: true };
    case AddressesTypes.DELETE_BY_ID_SUCCESS:
      return { ...state, loading: false, error: false, addressData: action.payload.addressData };
    case AddressesTypes.DELETE_BY_ID_FAILURE:
      return { ...state, loading: false, error: true, addressData: undefined };
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