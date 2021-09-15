import { action } from 'typesafe-actions';
import { AuthorsTypes, Author, AuthorRequestFilter, AuthorDTO } from './types';
import { selectors } from '.';
import { select } from 'redux-saga/effects';

export const loadRequest = () => action(AuthorsTypes.LOAD_REQUEST);
export const loadSuccess = (authorsData: Author[]) => action(AuthorsTypes.LOAD_SUCCESS,  { authorsData });

export const searchRequest = () => action(AuthorsTypes.SEARCH_REQUEST);
export const searchSuccess = (authorsData: Author[]) => action(AuthorsTypes.SEARCH_SUCCESS,  { authorsData });

export const findByIdRequest = (id: number) => action(AuthorsTypes.FIND_BY_ID_REQUEST,  { id });
export const findByIdSuccess = (authorData: Author) => action(AuthorsTypes.FIND_BY_ID_SUCCESS,  { authorData });

export const findByNameRequest = (name: string) => action(AuthorsTypes.FIND_BY_NAME_REQUEST,  { name });
export const findByNameSuccess = (authorsData: AuthorDTO) => action(AuthorsTypes.FIND_BY_NAME_SUCCESS,  { authorsData});

export const updateRequest = (author: Author) => action(AuthorsTypes.UPDATE_REQUEST,  { author });
export const updateSuccess = (authorData: Author) => action(AuthorsTypes.UPDATE_SUCCESS,  { authorData });

export const deleteByIdRequest = (id: number) => action(AuthorsTypes.DELETE_BY_ID_REQUEST,  { id });
export const deleteByIdSuccess = (data: boolean) => action(AuthorsTypes.DELETE_BY_ID_SUCCESS,  { data });

export const createRequest = (author: Author) => action(AuthorsTypes.CREATE_REQUEST,  { author });
export const createSuccess = (authorData: Author) => action(AuthorsTypes.CREATE_SUCCESS,  { authorData });

export const changeFlagEditing = () => action(AuthorsTypes.CHANGE_FLAG_EDITING);
export const changeFlagDetail = () => action(AuthorsTypes.CHANGE_FLAG_DETAIL);
export const cleanAuthorEdit = () => action(AuthorsTypes.CLEAN_BOOK_EDIT);

export const updateRequestFilter = (requestFilter: AuthorRequestFilter) => action(AuthorsTypes.UPDATE_FILTER,  { requestFilter });
export const cleanRequestFilter = () => action(AuthorsTypes.CLEAN_FILTER);

export const updateTotalRows = (requestData: any) => {
  const responseTotalRows = requestData.headers.totalcount || 0;
  return action(AuthorsTypes.UPDATE_RESPONSE_TOTAL_ROWS,  { responseTotalRows: responseTotalRows });
}