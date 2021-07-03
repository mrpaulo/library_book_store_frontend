import { PageableFilter } from "../../../components/utils/PageableFilter";
import { CustomEnum } from "../books/types";

/**
* Action types 
*/
export enum AddressesTypes {
  LOAD_REQUEST = '@addresses/LOAD_REQUEST',
  LOAD_SUCCESS = '@addresses/LOAD_SUCCESS',
  LOAD_FAILURE = '@addresses/LOAD_FAILURE',

  SEARCH_REQUEST = '@addresses/SEARCH_REQUEST',
  SEARCH_SUCCESS = '@addresses/SEARCH_SUCCESS',
  SEARCH_FAILURE = '@addresses/SEARCH_FAILURE',

  FIND_BY_ID_REQUEST = '@addresses/FIND_BY_ID_REQUEST',
  FIND_BY_ID_SUCCESS = '@addresses/FIND_BY_ID_SUCCESS',
  FIND_BY_ID_FAILURE = '@addresses/FIND_BY_ID_FAILURE',

  FIND_BY_NAME_REQUEST = '@addresses/FIND_BY_NAME_REQUEST',
  FIND_BY_NAME_SUCCESS = '@addresses/FIND_BY_NAME_SUCCESS',
  FIND_BY_NAME_FAILURE = '@addresses/FIND_BY_NAME_FAILURE',

  DELETE_BY_ID_REQUEST = '@addresses/DELETE_BY_ID_REQUEST',
  DELETE_BY_ID_SUCCESS = '@addresses/DELETE_BY_ID_SUCCESS',
  DELETE_BY_ID_FAILURE = '@addresses/DELETE_BY_ID_FAILURE',

  CREATE_REQUEST = '@addresses/CREATE_REQUEST',
  CREATE_SUCCESS = '@addresses/CREATE_SUCCESS',
  CREATE_FAILURE = '@addresses/CREATE_FAILURE',

  UPDATE_REQUEST = '@addresses/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@addresses/UPDATE_SUCCESS',
  UPDATE_FAILURE = '@addresses/UPDATE_FAILURE',

  CHANGE_FLAG_EDITING = '@addresses/CHANGE_FLAG_EDITING',
  CHANGE_FLAG_DETAIL = '@addresses/CHANGE_FLAG_DETAIL',
  CLEAN_ADDRESS_EDIT = '@addresses/CLEAN_ADDRESS_EDIT'

};
/**
 * Data types
 */
export interface Address {
  id: number,
  logradouro: CustomEnum
  name: String,
  number: String,
  cep: String,
  ziCode: String,
  neighborhood: String,
  coordination: String,
  referencialPoint: String,
  city: City
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

export const addressFormLabel: any = {
  title: "Title",
  author: "Author",
  authors: "Authors",
  languageName: "Language",
  publisher: "Publisher",
  subject: "Subject",
  subtitle: "Subtitle",
  review: "Review",
  link: "Link",
  format: "Format",
  condition: "Condition",
  edition: "Edition",
  publishDate: "Publish Date",
  rating: "Rating",
  length: "Length",
}

/**
 *  State type
 */
export interface AddressesState {
  readonly addressData?: Address
  readonly addressesData: AddressDTO[]
  readonly addressesDTO?: AddressDTO[]
  readonly loading: boolean
  readonly error: boolean
  readonly flagEditing: boolean
  readonly flagDetail: boolean
}

