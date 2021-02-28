/**
* Action types 
*/
export enum BooksTypes {
  LOAD_REQUEST =  '@books/LOAD_REQUEST',
  LOAD_SUCCESS =  '@books/LOAD_SUCCESS',
  LOAD_FAILURE =  '@books/LOAD_FAILURE'
};
/**
 * Data types
 */
export interface Book {
  id: number,
  title: string
}

 /**
  *  State type
  */
 export interface BooksState {
   readonly data: Book[]
   readonly loading: boolean
   readonly error: boolean
   
 }