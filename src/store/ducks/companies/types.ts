import { PageableFilter } from "../../../components/utils/PageableFilter";
import { Address } from "../addresses/types";

/**
* Action types 
*/
export enum CompaniesTypes {
  LOAD_REQUEST = '@companies/LOAD_REQUEST',
  LOAD_SUCCESS = '@companies/LOAD_SUCCESS',

  SEARCH_REQUEST = '@companies/SEARCH_REQUEST',
  SEARCH_SUCCESS = '@companies/SEARCH_SUCCESS',

  FIND_BY_ID_REQUEST = '@companies/FIND_BY_ID_REQUEST',
  FIND_BY_ID_SUCCESS = '@companies/FIND_BY_ID_SUCCESS',

  FIND_BY_NAME_REQUEST = '@companies/FIND_BY_NAME_REQUEST',
  FIND_BY_NAME_SUCCESS = '@companies/FIND_BY_NAME_SUCCESS',

  DELETE_BY_ID_REQUEST = '@companies/DELETE_BY_ID_REQUEST',
  DELETE_BY_ID_SUCCESS = '@companies/DELETE_BY_ID_SUCCESS',

  CREATE_REQUEST = '@companies/CREATE_REQUEST',
  CREATE_SUCCESS = '@companies/CREATE_SUCCESS',

  UPDATE_REQUEST = '@companies/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@companies/UPDATE_SUCCESS',

  CHANGE_FLAG_EDITING = '@companies/CHANGE_FLAG_EDITING',
  CHANGE_FLAG_DETAIL = '@companies/CHANGE_FLAG_DETAIL',
  CLEAN_BOOK_EDIT = '@companies/CLEAN_BOOK_EDIT'
  
};
/**
 * Data types
 */
export interface Company {
  id?: number,
  name: String, 
  cnpj: String, 
  description?: String, 
  createDate?:Date,
  address?: Address
}

export interface CompanyFilter extends PageableFilter{  
  name?: String, 
  cnpj?: String, 
}

export interface CompanyDTO {
  id: number, 
  name: string, 
  cnpj: String, 
  description: String, 
  createDate:Date
}

/**
 *  State type
 */
export interface CompaniesState {
  readonly companyData?: Company
  readonly companiesData: CompanyDTO[]
  readonly companiesAutoComplete?: CompanyDTO[]
  readonly loading: boolean
  readonly error: boolean
  readonly flagEditing: boolean
  readonly flagDetail: boolean  
}

