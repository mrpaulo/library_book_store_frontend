import { action } from 'typesafe-actions';
import { CustomEnum } from '../../../components/utils/constants';
import { AddressesTypes, Address, AddressDTO, City, StateCountry, Country } from './types';

export const loadRequest = () => action(AddressesTypes.LOAD_REQUEST);
export const loadSuccess = (addressesData: Address[]) => action(AddressesTypes.LOAD_SUCCESS,  { addressesData });

export const searchRequest = (filter: AddressDTO) => action(AddressesTypes.SEARCH_REQUEST, { filter});
export const searchSuccess = (addressesData: Address[]) => action(AddressesTypes.SEARCH_SUCCESS,  { addressesData });

export const findByIdRequest = (id: number) => action(AddressesTypes.FIND_BY_ID_REQUEST,  { id });
export const findByIdSuccess = (addressData: Address) => action(AddressesTypes.FIND_BY_ID_SUCCESS,  { addressData });

export const findByNameRequest = (name: string) => action(AddressesTypes.FIND_BY_NAME_REQUEST,  { name });
export const findByNameSuccess = (addressesData: AddressDTO) => action(AddressesTypes.FIND_BY_NAME_SUCCESS,  { addressesData});

export const updateRequest = (address: Address) => action(AddressesTypes.UPDATE_REQUEST,  { address });
export const updateSuccess = (addressData: Address) => action(AddressesTypes.UPDATE_SUCCESS,  { addressData });

export const deleteByIdRequest = (id: number) => action(AddressesTypes.DELETE_BY_ID_REQUEST,  { id });
export const deleteByIdSuccess = (data: boolean) => action(AddressesTypes.DELETE_BY_ID_SUCCESS,  { data });

export const createRequest = (address: Address) => action(AddressesTypes.CREATE_REQUEST,  { address });
export const createSuccess = (addressData: Address) => action(AddressesTypes.CREATE_SUCCESS,  { addressData });

export const countryRequest = () => action(AddressesTypes.COUNTRY_REQUEST);
export const countrySuccess = (countriesListData: Country[]) => action(AddressesTypes.COUNTRY_SUCCESS,  { countriesListData });

export const stateRequest = (countryId: number) => action(AddressesTypes.STATE_REQUEST,  { countryId });
export const stateSuccess = (statesListData: StateCountry[]) => action(AddressesTypes.STATE_SUCCESS,  { statesListData });

export const cityRequest = (countryId: number, stateId: number) => action(AddressesTypes.CITY_REQUEST,  { countryId, stateId });
export const citySuccess = (citiesListData: City[]) => action(AddressesTypes.CITY_SUCCESS,  { citiesListData });

export const logradouroRequest = () => action(AddressesTypes.LOGRADOURO_REQUEST);
export const logradouroSuccess = (logradourosListData: CustomEnum[]) => action(AddressesTypes.LOGRADOURO_SUCCESS,  { logradourosListData });

export const changeFlagEditing = () => action(AddressesTypes.CHANGE_FLAG_EDITING);
export const changeFlagDetail = () => action(AddressesTypes.CHANGE_FLAG_DETAIL);
export const cleanAddressEdit = () => action(AddressesTypes.CLEAN_ADDRESS_EDIT);
