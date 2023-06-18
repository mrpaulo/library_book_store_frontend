import { action } from 'typesafe-actions';
import { AuthorsTypes as Types, Author, AuthorRequestFilter as Filter, AuthorDTO } from './types';

export const loadRequest = () => action(Types.LOAD_REQUEST);
export const loadSuccess = (authorsData: Author[]) => action(Types.LOAD_SUCCESS,  { authorsData });

export const searchRequest = () => action(Types.SEARCH_REQUEST);
export const searchSuccess = (authorsData: Author[]) => action(Types.SEARCH_SUCCESS,  { authorsData });

export const findByIdRequest = (id: number) => action(Types.FIND_BY_ID_REQUEST,  { id });
export const findByIdSuccess = (authorData: Author) => action(Types.FIND_BY_ID_SUCCESS,  { authorData });

export const findByNameRequest = (name: string) => action(Types.FIND_BY_NAME_REQUEST,  { name });
export const findByNameSuccess = (authorsData: AuthorDTO) => action(Types.FIND_BY_NAME_SUCCESS,  { authorsData});
export const cleanAuthorsAutoCompleteList = () => action(Types.CLEAN_AUTORS_AUTOCOMPLET_LIST);

export const updateRequest = (author: Author) => action(Types.UPDATE_REQUEST,  { author });
export const updateSuccess = (authorData: Author) => action(Types.UPDATE_SUCCESS,  { authorData });

export const deleteByIdRequest = (id: number) => action(Types.DELETE_BY_ID_REQUEST,  { id });
export const deleteByIdSuccess = (data: boolean) => action(Types.DELETE_BY_ID_SUCCESS,  { data });

export const createRequest = (author: Author) => action(Types.CREATE_REQUEST,  { author });
export const createSuccess = (authorData: Author) => action(Types.CREATE_SUCCESS,  { authorData });

export const changeFlagEditing = () => action(Types.CHANGE_FLAG_EDITING);
export const changeFlagDetail = () => action(Types.CHANGE_FLAG_DETAIL);
export const cleanAuthorEdit = () => action(Types.CLEAN_BOOK_EDIT);

export const updateRequestFilter = (requestFilter: Filter) => action(Types.UPDATE_FILTER,  { requestFilter });
export const cleanRequestFilter = () => action(Types.CLEAN_FILTER);

export const updateTotalRows = (requestData: any) => {
  const responseTotalRows = requestData.headers.totalcount || 0;
  return action(Types.UPDATE_RESPONSE_TOTAL_ROWS,  { responseTotalRows: responseTotalRows });
}