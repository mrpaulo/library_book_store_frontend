import { PageableFilter } from "../../../components/utils/PageableFilter";
import { AddressDTO } from "../addresses/types";

/**
* Action types 
*/
export enum PeopleTypes {
  LOAD_REQUEST = '@people/LOAD_REQUEST',
  LOAD_SUCCESS = '@people/LOAD_SUCCESS',
  LOAD_FAILURE = '@people/LOAD_FAILURE',

  SEARCH_REQUEST = '@people/SEARCH_REQUEST',
  SEARCH_SUCCESS = '@people/SEARCH_SUCCESS',
  SEARCH_FAILURE = '@people/SEARCH_FAILURE',

  FIND_BY_ID_REQUEST = '@people/FIND_BY_ID_REQUEST',
  FIND_BY_ID_SUCCESS = '@people/FIND_BY_ID_SUCCESS',
  FIND_BY_ID_FAILURE = '@people/FIND_BY_ID_FAILURE',

  FIND_BY_NAME_REQUEST = '@people/FIND_BY_NAME_REQUEST',
  FIND_BY_NAME_SUCCESS = '@people/FIND_BY_NAME_SUCCESS',
  FIND_BY_NAME_FAILURE = '@people/FIND_BY_NAME_FAILURE',

  DELETE_BY_ID_REQUEST = '@people/DELETE_BY_ID_REQUEST',
  DELETE_BY_ID_SUCCESS = '@people/DELETE_BY_ID_SUCCESS',
  DELETE_BY_ID_FAILURE = '@people/DELETE_BY_ID_FAILURE',

  CREATE_REQUEST = '@people/CREATE_REQUEST',
  CREATE_SUCCESS = '@people/CREATE_SUCCESS',
  CREATE_FAILURE = '@people/CREATE_FAILURE',

  UPDATE_REQUEST = '@people/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@people/UPDATE_SUCCESS',
  UPDATE_FAILURE = '@people/UPDATE_FAILURE',

  CHANGE_FLAG_EDITING = '@people/CHANGE_FLAG_EDITING',
  CHANGE_FLAG_DETAIL = '@people/CHANGE_FLAG_DETAIL',
  CLEAN_BOOK_EDIT = '@people/CLEAN_BOOK_EDIT'

};
/**
 * Data types
 */
export interface Person {
  id: number,
  name: String,
  cnpj: String,
  description: String,
  createDate: Date
}

export interface PersonFilter extends PageableFilter {
  title: String,
  author?: String,
  publisher?: String,
  subject?: String
}

export interface PersonDTO {
  id: Number,
  name: string,
  birthdate: Date,
  cpf: String,
  sex: String,
  email: String,
  birthCity: String,
  birthCountry: String,
  address: AddressDTO
}

export const companyFormLabel: any = {
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
export interface PeopleState {
  readonly companyData?: Person
  readonly peopleData: PersonDTO[]
  readonly peopleAutoComplete?: PersonDTO[]
  readonly loading: boolean
  readonly error: boolean
  readonly flagEditing: boolean
  readonly flagDetail: boolean
}

