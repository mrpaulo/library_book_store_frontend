import { PageableFilter } from "../../../components/utils/PageableFilter";
import { CompanyDTO } from "../companies/types";
import { PersonDTO } from "../people/types";

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

  BOOK_FORMAT_REQUEST = '@books/BOOK_FORMAT_REQUEST',
  BOOK_FORMAT_SUCCESS = '@books/BOOK_FORMAT_SUCCESS',
  BOOK_FORMAT_FAILURE = '@books/BOOK_FORMAT_FAILURE',

  BOOK_CONDITION_REQUEST = '@books/BOOK_CONDITION_REQUEST',
  BOOK_CONDITION_SUCCESS = '@books/BOOK_CONDITION_SUCCESS',
  BOOK_CONDITION_FAILURE = '@books/BOOK_CONDITION_FAILURE',

  BOOK_SUBJECT_REQUEST = '@books/BOOK_SUBJECT_REQUEST',
  BOOK_SUBJECT_SUCCESS = '@books/BOOK_SUBJECT_SUCCESS',
  BOOK_SUBJECT_FAILURE = '@books/BOOK_SUBJECT_FAILURE',

  BOOK_LANGUAGE_REQUEST = '@books/BOOK_LANGUAGE_REQUEST',
  BOOK_LANGUAGE_SUCCESS = '@books/BOOK_LANGUAGE_SUCCESS',
  BOOK_LANGUAGE_FAILURE = '@books/BOOK_LANGUAGE_FAILURE',

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
  languageName?: String,
  language?: BookLanguage,
  publisher: CompanyDTO,
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

export interface BookFilter extends PageableFilter{  
  title: String,
  author?: String,  
  publisher?: String,
  subject?: String 
}

export interface CustomEnum {
  label: String,
  value: String
}

export interface BookSubject {
  id: number,
  name: String,
  description: String
}

export interface AddressDTO {
  id: number  
}
export interface BookLanguage {
  id: number,
  name: String  
}

export const bookFormLabel: any = {
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
}
