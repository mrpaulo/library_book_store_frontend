import { PageableFilter } from "../../../components/utils/PageableFilter";
import { Address } from "../addresses/types";

/**
* Action types 
*/
export enum PublishersTypes {
  LOAD_REQUEST = '@publishers/LOAD_REQUEST',
  LOAD_SUCCESS = '@publishers/LOAD_SUCCESS',

  SEARCH_REQUEST = '@publishers/SEARCH_REQUEST',
  SEARCH_SUCCESS = '@publishers/SEARCH_SUCCESS',

  FIND_BY_ID_REQUEST = '@publishers/FIND_BY_ID_REQUEST',
  FIND_BY_ID_SUCCESS = '@publishers/FIND_BY_ID_SUCCESS',

  FIND_BY_NAME_REQUEST = '@publishers/FIND_BY_NAME_REQUEST',
  FIND_BY_NAME_SUCCESS = '@publishers/FIND_BY_NAME_SUCCESS',

  DELETE_BY_ID_REQUEST = '@publishers/DELETE_BY_ID_REQUEST',
  DELETE_BY_ID_SUCCESS = '@publishers/DELETE_BY_ID_SUCCESS',

  CREATE_REQUEST = '@publishers/CREATE_REQUEST',
  CREATE_SUCCESS = '@publishers/CREATE_SUCCESS',

  UPDATE_REQUEST = '@publishers/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@publishers/UPDATE_SUCCESS',

  CHANGE_FLAG_EDITING = '@publishers/CHANGE_FLAG_EDITING',
  CHANGE_FLAG_DETAIL = '@publishers/CHANGE_FLAG_DETAIL',
  CLEAN_BOOK_EDIT = '@publishers/CLEAN_BOOK_EDIT',
  
  UPDATE_FILTER= '@publishers/UPDATE_FILTER',
  CLEAN_FILTER= '@publishers/CLEAN_FILTER',
  UPDATE_RESPONSE_TOTAL_ROWS= '@publishers/UPDATE_RESPONSE_TOTAL_ROWS' 
};
/**
 * Data types
 */
export interface Publisher {
  id?: number,
  name: String, 
  cnpj: String, 
  description?: String, 
  foundationDate?:Date,
  address?: Address
}

export interface PublisherRequestFilter extends PageableFilter{  
  name?: String, 
  cnpj?: String, 
}

export interface PublisherDTO {
  id: number, 
  name: string, 
  cnpj: String, 
  description: String, 
  foundationDate:Date
}

/**
 *  State type
 */
export interface PublishersState {
  readonly publisherData?: Publisher
  readonly publishersData: PublisherDTO[]
  readonly publishersAutoComplete?: PublisherDTO[]
  readonly loading: boolean
  readonly error: boolean
  readonly flagEditing: boolean
  readonly flagDetail: boolean  
  readonly requestFilter?: PublisherRequestFilter
  readonly responseTotalRows: number
}

