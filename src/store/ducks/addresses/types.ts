import { PageableFilter } from "../../../components/utils/PageableFilter";
import { CustomEnum } from "../../../components/utils/constants";

/**
* Action types 
*/
export enum AddressesTypes {
  LOAD_REQUEST = '@addresses/LOAD_REQUEST',
  LOAD_SUCCESS = '@addresses/LOAD_SUCCESS',
  
  SEARCH_REQUEST = '@addresses/SEARCH_REQUEST',
  SEARCH_SUCCESS = '@addresses/SEARCH_SUCCESS',
  
  FIND_BY_ID_REQUEST = '@addresses/FIND_BY_ID_REQUEST',
  FIND_BY_ID_SUCCESS = '@addresses/FIND_BY_ID_SUCCESS',
  
  FIND_BY_NAME_REQUEST = '@addresses/FIND_BY_NAME_REQUEST',
  FIND_BY_NAME_SUCCESS = '@addresses/FIND_BY_NAME_SUCCESS',
  
  DELETE_BY_ID_REQUEST = '@addresses/DELETE_BY_ID_REQUEST',
  DELETE_BY_ID_SUCCESS = '@addresses/DELETE_BY_ID_SUCCESS',
  
  CREATE_REQUEST = '@addresses/CREATE_REQUEST',
  CREATE_SUCCESS = '@addresses/CREATE_SUCCESS',
  
  UPDATE_REQUEST = '@addresses/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@addresses/UPDATE_SUCCESS',

  LOGRADOURO_REQUEST = '@addresses/LOGRADOURO_REQUEST',
  LOGRADOURO_SUCCESS = '@addresses/LOGRADOURO_SUCCESS',
  
  CITY_REQUEST = '@addresses/CITY_REQUEST',
  CITY_SUCCESS = '@addresses/CITY_SUCCESS',

  STATE_REQUEST = '@addresses/STATE_REQUEST',
  STATE_SUCCESS = '@addresses/STATE_SUCCESS',

  COUNTRY_REQUEST = '@addresses/COUNTRY_REQUEST',
  COUNTRY_SUCCESS = '@addresses/COUNTRY_SUCCESS',

  CHANGE_FLAG_EDITING = '@addresses/CHANGE_FLAG_EDITING',
  CHANGE_FLAG_DETAIL = '@addresses/CHANGE_FLAG_DETAIL',
  CLEAN_ADDRESS_EDIT = '@addresses/CLEAN_ADDRESS_EDIT'

};
/**
 * Data types
 */
export interface Address {
  id?: number,
  name: String,
  city?: City
  logradouro?: CustomEnum
  number?: String,
  cep?: String,
  zipCode?: String,
  neighborhood?: String,
  coordination?: String,
  referencialPoint?: String,
  fmtAddress?:String,
  cityName?: String,
  stateName?: String,
  countryName?: String
}

export interface City {
  id: number,
  name: String,
  state: StateCountry,
  country: Country,
  ibgeCode: String
}

export interface StateCountry {
  id: number,
  name: String,
  country: Country
}
export interface Country {
  id: number,
  name: String
}

export interface AddressDTO {
  id: Number,
  fmtAddress: string
}

/**
 *  State type
 */
export interface AddressesState {
  readonly addressData?: Address
  readonly addressesData?: AddressDTO[]
  readonly addressesDTO?: AddressDTO[]
  readonly logradourosListData?: CustomEnum[]
  readonly citiesListData?: City[]
  readonly statesListData?: City[]
  readonly countriesListData?: City[]
  readonly loading: boolean
  readonly error: boolean
  readonly flagEditing: boolean
  readonly flagDetail: boolean
}

