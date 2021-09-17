import { CustomEnum } from "../../../components/utils/constants";
import { PageableFilter } from "../../../components/utils/PageableFilter";
import { PublisherDTO } from "../publishers/types";
import { AuthorDTO } from "../authors/types";

/**
* Action types 
*/
export enum BooksTypes {
  LOAD_REQUEST = '@books/LOAD_REQUEST',
  LOAD_SUCCESS = '@books/LOAD_SUCCESS',

  SEARCH_REQUEST = '@books/SEARCH_REQUEST',
  SEARCH_SUCCESS = '@books/SEARCH_SUCCESS',

  FIND_BY_ID_REQUEST = '@books/FIND_BY_ID_REQUEST',
  FIND_BY_ID_SUCCESS = '@books/FIND_BY_ID_SUCCESS',

  DELETE_BY_ID_REQUEST = '@books/DELETE_BY_ID_REQUEST',
  DELETE_BY_ID_SUCCESS = '@books/DELETE_BY_ID_SUCCESS',

  CREATE_REQUEST = '@books/CREATE_REQUEST',
  CREATE_SUCCESS = '@books/CREATE_SUCCESS',

  UPDATE_REQUEST = '@books/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@books/UPDATE_SUCCESS',

  BOOK_FORMAT_REQUEST = '@books/BOOK_FORMAT_REQUEST',
  BOOK_FORMAT_SUCCESS = '@books/BOOK_FORMAT_SUCCESS',

  BOOK_CONDITION_REQUEST = '@books/BOOK_CONDITION_REQUEST',
  BOOK_CONDITION_SUCCESS = '@books/BOOK_CONDITION_SUCCESS',

  BOOK_SUBJECT_REQUEST = '@books/BOOK_SUBJECT_REQUEST',
  BOOK_SUBJECT_SUCCESS = '@books/BOOK_SUBJECT_SUCCESS',

  BOOK_LANGUAGE_REQUEST = '@books/BOOK_LANGUAGE_REQUEST',
  BOOK_LANGUAGE_SUCCESS = '@books/BOOK_LANGUAGE_SUCCESS',

  CHANGE_FLAG_EDITING = '@books/CHANGE_FLAG_EDITING',
  CHANGE_FLAG_DETAIL = '@books/CHANGE_FLAG_DETAIL',
  CLEAN_BOOK_EDIT = '@books/CLEAN_BOOK_EDIT',

  UPDATE_FILTER= '@books/UPDATE_FILTER',
  CLEAN_FILTER= '@books/CLEAN_FILTER',
  UPDATE_RESPONSE_TOTAL_ROWS= '@books/UPDATE_RESPONSE_TOTAL_ROWS' 
};
/**
 * Data types
 */
export interface Book {
  id: number,
  title: String,
  authors?: AuthorDTO[],
  languageName?: String,
  language?: BookLanguage,
  publisher?: PublisherDTO,
  subject?: BookSubject,
  subjectName?: String,
  subtitle?: String,
  review?: String,
  link?: String,
  format?: CustomEnum,
  condition?: CustomEnum,
  edition?: Number,
  publishDate?: Date,
  rating?: Number,
  length?: Number,
}

export interface BookRequestFilter extends PageableFilter{  
  title: String,
  author?: String,  
  publisher?: String,
  subject?: String 
}

export interface BookSubject {
  id: number,
  name: String,
  description: String
}

export interface BookLanguage {
  id: number,
  name: String  
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
  readonly booksFormatData: CustomEnum[],
  readonly booksConditionData: CustomEnum[],
  readonly bookSubjectListData: BookSubject[],
  readonly languageListData: BookLanguage[],
  readonly requestFilter?: BookRequestFilter
  readonly responseTotalRows: number
}
