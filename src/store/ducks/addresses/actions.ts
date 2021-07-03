import { action } from 'typesafe-actions';
import { AddressesTypes, Address, AddressDTO } from './types';

export const loadRequest = () => action(AddressesTypes.LOAD_REQUEST);
export const loadSuccess = (addressesData: Address[]) => action(AddressesTypes.LOAD_SUCCESS,  { addressesData });
export const loadFailure = () => action(AddressesTypes.LOAD_FAILURE);

export const searchRequest = (filter: AddressDTO) => action(AddressesTypes.SEARCH_REQUEST, { filter});
export const searchSuccess = (addressesData: Address[]) => action(AddressesTypes.SEARCH_SUCCESS,  { addressesData });
export const searchFailure = () => action(AddressesTypes.SEARCH_FAILURE);

export const findByIdRequest = (id: number) => action(AddressesTypes.FIND_BY_ID_REQUEST,  { id });
export const findByIdSuccess = (addressData: Address) => action(AddressesTypes.FIND_BY_ID_SUCCESS,  { addressData });
export const findByIdFailure = () => action(AddressesTypes.FIND_BY_ID_FAILURE);

export const findByNameRequest = (name: string) => action(AddressesTypes.FIND_BY_NAME_REQUEST,  { name });
export const findByNameSuccess = (addressesData: AddressDTO) => action(AddressesTypes.FIND_BY_NAME_SUCCESS,  { addressesData});
export const findByNameFailure = () => action(AddressesTypes.FIND_BY_NAME_FAILURE);

export const updateRequest = (address: Address) => action(AddressesTypes.UPDATE_REQUEST,  { address });
export const updateSuccess = (addressData: Address) => action(AddressesTypes.UPDATE_SUCCESS,  { addressData });
export const updateFailure = () => action(AddressesTypes.UPDATE_FAILURE);

export const deleteByIdRequest = (id: number) => action(AddressesTypes.DELETE_BY_ID_REQUEST,  { id });
export const deleteByIdSuccess = (data: boolean) => action(AddressesTypes.DELETE_BY_ID_SUCCESS,  { data });
export const deleteByIdFailure = () => action(AddressesTypes.DELETE_BY_ID_FAILURE);

export const createRequest = (address: Address) => action(AddressesTypes.CREATE_REQUEST,  { address });
export const createSuccess = (addressData: Address) => action(AddressesTypes.CREATE_SUCCESS,  { addressData });
export const createFailure = () => action(AddressesTypes.CREATE_FAILURE);

export const changeFlagEditing = () => action(AddressesTypes.CHANGE_FLAG_EDITING);
export const changeFlagDetail = () => action(AddressesTypes.CHANGE_FLAG_DETAIL);
export const cleanAddressEdit = () => action(AddressesTypes.CLEAN_ADDRESS_EDIT);
