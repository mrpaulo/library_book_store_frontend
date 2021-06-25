import { PageableFilter } from "../../../components/utils/PageableFilter";

/**
* Action types 
*/
export enum CompaniesTypes {
  LOAD_REQUEST = '@companies/LOAD_REQUEST',
  LOAD_SUCCESS = '@companies/LOAD_SUCCESS',
  LOAD_FAILURE = '@companies/LOAD_FAILURE',

  SEARCH_REQUEST = '@companies/SEARCH_REQUEST',
  SEARCH_SUCCESS = '@companies/SEARCH_SUCCESS',
  SEARCH_FAILURE = '@companies/SEARCH_FAILURE',

  FIND_BY_ID_REQUEST = '@companies/FIND_BY_ID_REQUEST',
  FIND_BY_ID_SUCCESS = '@companies/FIND_BY_ID_SUCCESS',
  FIND_BY_ID_FAILURE = '@companies/FIND_BY_ID_FAILURE',

  FIND_BY_NAME_REQUEST = '@companies/FIND_BY_NAME_REQUEST',
  FIND_BY_NAME_SUCCESS = '@companies/FIND_BY_NAME_SUCCESS',
  FIND_BY_NAME_FAILURE = '@companies/FIND_BY_NAME_FAILURE',

  DELETE_BY_ID_REQUEST = '@companies/DELETE_BY_ID_REQUEST',
  DELETE_BY_ID_SUCCESS = '@companies/DELETE_BY_ID_SUCCESS',
  DELETE_BY_ID_FAILURE = '@companies/DELETE_BY_ID_FAILURE',

  CREATE_REQUEST = '@companies/CREATE_REQUEST',
  CREATE_SUCCESS = '@companies/CREATE_SUCCESS',
  CREATE_FAILURE = '@companies/CREATE_FAILURE',

  UPDATE_REQUEST = '@companies/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@companies/UPDATE_SUCCESS',
  UPDATE_FAILURE = '@companies/UPDATE_FAILURE',

  CHANGE_FLAG_EDITING = '@companies/CHANGE_FLAG_EDITING',
  CHANGE_FLAG_DETAIL = '@companies/CHANGE_FLAG_DETAIL',
  CLEAN_BOOK_EDIT = '@companies/CLEAN_BOOK_EDIT'
  
};
/**
 * Data types
 */
export interface Company {
  id: number,
  name: String, 
  cnpj: String, 
  description: String, 
  createDate:Date
}

export interface CompanyFilter extends PageableFilter{  
  title: String,
  author?: String,  
  publisher?: String,
  subject?: String 
}

export interface CompanyDTO {
  id: number, 
  name: string, 
  cnpj: String, 
  description: String, 
  createDate:Date
}

export const companyFormLabel: any = {
  title: "Title",
  author: "Author",
  authors: "Authors",
  languageName: "LanguageName",
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
export interface CompaniesState {
  readonly companyData?: Company
  readonly companiesData: CompanyDTO[]
  readonly companiesAutoComplete?: CompanyDTO[]
  readonly loading: boolean
  readonly error: boolean
  readonly flagEditing: boolean
  readonly flagDetail: boolean  
}

