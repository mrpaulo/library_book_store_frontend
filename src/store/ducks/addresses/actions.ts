import { action } from 'typesafe-actions';
import { CustomEnum } from '../../../components/utils/constants';
import { AddressesTypes, City, StateCountry, Country } from './types';

export const deleteByIdAddressRequest = (id: number) => action(AddressesTypes.DELETE_BY_ID_REQUEST,  { id });
export const deleteByIdAddressSuccess = (data: boolean) => action(AddressesTypes.DELETE_BY_ID_SUCCESS,  { data });

export const countryRequest = () => action(AddressesTypes.COUNTRY_REQUEST);
export const countrySuccess = (countriesListData: Country[]) => action(AddressesTypes.COUNTRY_SUCCESS,  { countriesListData });

export const stateRequest = (countryId: number) => action(AddressesTypes.STATE_REQUEST,  { countryId });
export const stateSuccess = (statesListData: StateCountry[]) => action(AddressesTypes.STATE_SUCCESS,  { statesListData });

export const cityRequest = (countryId: number, stateId: number) => action(AddressesTypes.CITY_REQUEST,  { countryId, stateId });
export const citySuccess = (citiesListData: City[]) => action(AddressesTypes.CITY_SUCCESS,  { citiesListData });

export const logradouroRequest = () => action(AddressesTypes.LOGRADOURO_REQUEST);
export const logradouroSuccess = (logradourosListData: CustomEnum[]) => action(AddressesTypes.LOGRADOURO_SUCCESS,  { logradourosListData });

export const cleanAddressEdit = () => action(AddressesTypes.CLEAN_ADDRESS_EDIT);
