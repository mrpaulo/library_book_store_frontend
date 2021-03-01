/**
* Action types 
*/
export enum BooksTypes {
  LOAD_REQUEST = '@books/LOAD_REQUEST',
  LOAD_SUCCESS = '@books/LOAD_SUCCESS',
  LOAD_FAILURE = '@books/LOAD_FAILURE'
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
  subject?: String,
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
  
}

export interface CompanyDTO {

}
/**
 *  State type
 */
export interface BooksState {
  readonly data: Book[]
  readonly loading: boolean
  readonly error: boolean

}