import { PageableFilter } from "../../../components/utils/PageableFilter";
import { Address, AddressDTO, City, Country } from "../addresses/types";

/**
* Action types 
*/
export enum AuthorsTypes {
  LOAD_REQUEST = '@authors/LOAD_REQUEST',
  LOAD_SUCCESS = '@authors/LOAD_SUCCESS',

  SEARCH_REQUEST = '@authors/SEARCH_REQUEST',
  SEARCH_SUCCESS = '@authors/SEARCH_SUCCESS',

  FIND_BY_ID_REQUEST = '@authors/FIND_BY_ID_REQUEST',
  FIND_BY_ID_SUCCESS = '@authors/FIND_BY_ID_SUCCESS',

  FIND_BY_NAME_REQUEST = '@authors/FIND_BY_NAME_REQUEST',
  FIND_BY_NAME_SUCCESS = '@authors/FIND_BY_NAME_SUCCESS',

  DELETE_BY_ID_REQUEST = '@authors/DELETE_BY_ID_REQUEST',
  DELETE_BY_ID_SUCCESS = '@authors/DELETE_BY_ID_SUCCESS',

  CREATE_REQUEST = '@authors/CREATE_REQUEST',
  CREATE_SUCCESS = '@authors/CREATE_SUCCESS',

  UPDATE_REQUEST = '@authors/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@authors/UPDATE_SUCCESS',

  CHANGE_FLAG_EDITING = '@authors/CHANGE_FLAG_EDITING',
  CHANGE_FLAG_DETAIL = '@authors/CHANGE_FLAG_DETAIL',
  CLEAN_BOOK_EDIT = '@authors/CLEAN_BOOK_EDIT',
  
  UPDATE_FILTER= '@authors/UPDATE_FILTER',
  CLEAN_FILTER= '@authors/CLEAN_FILTER',
  UPDATE_RESPONSE_TOTAL_ROWS= '@authors/UPDATE_RESPONSE_TOTAL_ROWS'
  
};
/**
 * Data types
 */
export interface Author {
  id: number,
  name: string,
  birthdate?: Date,  
  sex: String,
  email: String,
  birthCity?: City,
  birthCityName?: String,
  birthStateName?: String,
  birthCountry?: Country,
  birthCountryName?: String,
  address?: Address,
  description?: String
}

export interface AuthorRequestFilter extends PageableFilter {  
  cpf?: String,
  sex?: String  
}

export interface AuthorDTO {
  id: number,
  name: string,
  birthdate: Date,  
  sex: String,
  email: String,
  birthCity: String,
  birthState: String,
  birthCountry: String,
  address: AddressDTO,
  description?: String
}

/**
 *  State type
 */
export interface AuthorsState {
  readonly authorData?: Author
  readonly authorsData: AuthorDTO[]
  readonly authorsAutoComplete?: AuthorDTO[]
  readonly requestFilter?: AuthorRequestFilter
  readonly loading: boolean
  readonly error: boolean
  readonly flagEditing: boolean
  readonly flagDetail: boolean
  readonly responseTotalRows: number
}

