import { PageableFilter } from "../../../components/utils/PageableFilter";

/**
* Action types 
*/
export enum BooksTypes {
  LOAD_REQUEST = '@books/LOAD_REQUEST',
  LOAD_SUCCESS = '@books/LOAD_SUCCESS',
  LOAD_FAILURE = '@books/LOAD_FAILURE',

  SEARCH_REQUEST = '@books/SEARCH_REQUEST',
  SEARCH_SUCCESS = '@books/SEARCH_SUCCESS',
  SEARCH_FAILURE = '@books/SEARCH_FAILURE',

  FIND_BY_ID_REQUEST = '@books/FIND_BY_ID_REQUEST',
  FIND_BY_ID_SUCCESS = '@books/FIND_BY_ID_SUCCESS',
  FIND_BY_ID_FAILURE = '@books/FIND_BY_ID_FAILURE',

  DELETE_BY_ID_REQUEST = '@books/DELETE_BY_ID_REQUEST',
  DELETE_BY_ID_SUCCESS = '@books/DELETE_BY_ID_SUCCESS',
  DELETE_BY_ID_FAILURE = '@books/DELETE_BY_ID_FAILURE',

  CREATE_REQUEST = '@books/CREATE_REQUEST',
  CREATE_SUCCESS = '@books/CREATE_SUCCESS',
  CREATE_FAILURE = '@books/CREATE_FAILURE',

  UPDATE_REQUEST = '@books/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@books/UPDATE_SUCCESS',
  UPDATE_FAILURE = '@books/UPDATE_FAILURE',

  CHANGE_FLAG_EDITING = '@books/CHANGE_FLAG_EDITING',
  CHANGE_FLAG_DETAIL = '@books/CHANGE_FLAG_DETAIL',
  CLEAN_BOOK_EDIT = '@books/CLEAN_BOOK_EDIT'
};
/**
 * Data types
 */
export interface Book {
  id: number,
  title: String,
  authors: PersonDTO[],
  language?: String,
  publisher: CompanyDTO,
  subject?: BookSubject,
  subjectName?: String,
  subtitle?: String,
  review?: String,
  link?: String,
  format?: EBookFormat,
  condition?: EBookCondition,
  edition?: Number,
  publishDate?: Date,
  rating?: Number,
  length?: Number,
}

export interface BookFilter extends PageableFilter{  
  title: String,
  author?: String,  
  publisher?: String,
  subject?: String 
}

export enum EBookFormat {
  PRINTED_BOOK = "Livro impresso",
  HARDCOVER = "Livro capa dura",
  KINDLE_EDITION = "Kindle",
  AUDIO_BOOK = "Audio livro"
}

export enum EBookCondition {
  USED = "Usado",
  NEW = "Novo",
  COLLECTABLE = "Colecionável"
}

export interface PersonDTO {
  id: Number,
  name: String,
   birthdate: Date,
   cpf: String,
   sex: String,
   email: String,
   birthCity: String,
   birthCountry: String,
   address :  AddressDTO 
}

export interface CompanyDTO {
  id: number, name: String, cnpj: String, description: String, createDate:Date
}
export interface BookSubject {
  id: number,
  name: String,
  description: String
}
export interface AddressDTO {
  id: number  
}
/**
 *  State type
 */
export interface BooksState {
  readonly booksData: Book[]
  readonly bookData?: Book
  readonly loading: boolean
  readonly error: boolean
  readonly flagEditing: boolean
  readonly flagDetail: boolean
}