import { action } from 'typesafe-actions';
import { CustomEnum } from '../../../components/utils/constants';
import { AddressesTypes as Types, City, StateCountry, Country, Address } from './types';

export const deleteByIdAddressRequest = (id: number) => action(Types.DELETE_BY_ID_REQUEST,  { id });
export const deleteByIdAddressSuccess = (data: boolean) => action(Types.DELETE_BY_ID_SUCCESS,  { data });

export const countryRequest = () => action(Types.COUNTRY_REQUEST);
export const countrySuccess = (countriesListData: Country[]) => action(Types.COUNTRY_SUCCESS,  { countriesListData });

export const stateRequest = (countryId: number) => action(Types.STATE_REQUEST,  { countryId });
export const stateSuccess = (statesListData: StateCountry[]) => action(Types.STATE_SUCCESS,  { statesListData });

export const cityRequest = (countryId: number, stateId: number) => action(Types.CITY_REQUEST,  { countryId, stateId });
export const citySuccess = (citiesListData: City[]) => action(Types.CITY_SUCCESS,  { citiesListData });

export const logradouroRequest = () => action(Types.LOGRADOURO_REQUEST);
export const logradouroSuccess = (logradourosListData: CustomEnum[]) => action(Types.LOGRADOURO_SUCCESS,  { logradourosListData });

export const cleanAddressEdit = () => action(Types.CLEAN_ADDRESS_EDIT);

export const updateAddressRequest = (address: Address) => action(Types.UPDATE_REQUEST,  { address });
export const updateAddressSuccess = (addressData: Address) => action(Types.UPDATE_SUCCESS,  { addressData });
