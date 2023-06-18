import { action } from 'typesafe-actions';
import { PublishersTypes as Types, Publisher, PublisherRequestFilter as Filter, PublisherDTO } from './types';

export const loadRequest = () => action(Types.LOAD_REQUEST);
export const loadSuccess = (publishersData: Publisher[]) => action(Types.LOAD_SUCCESS,  { publishersData });

export const searchRequest = () => action(Types.SEARCH_REQUEST);
export const searchSuccess = (publishersData: Publisher[]) => action(Types.SEARCH_SUCCESS,  { publishersData });

export const findByIdRequest = (id: number) => action(Types.FIND_BY_ID_REQUEST,  { id });
export const findByIdSuccess = (publisherData: Publisher) => action(Types.FIND_BY_ID_SUCCESS,  { publisherData });

export const findByNameRequest = (name: string) => action(Types.FIND_BY_NAME_REQUEST,  { name });
export const findByNameSuccess = (publishersData: PublisherDTO) => action(Types.FIND_BY_NAME_SUCCESS,  { publishersData});
export const cleanPublishersAutoCompleteList = () => action(Types.CLEAN_PUBLISHERS_AUTOCOMPLET_LIST);


export const updateRequest = (publisher: Publisher) => action(Types.UPDATE_REQUEST,  { publisher });
export const updateSuccess = (publisherData: Publisher) => action(Types.UPDATE_SUCCESS,  { publisherData });

export const safeDeleteByIdRequest = (id: number) => action(Types.SAFE_DELETE_BY_ID_REQUEST,  { id });
export const safeDeleteByIdSuccess = (booksData: String[]) => action(Types.SAFE_DELETE_BY_ID_SUCCESS,  { booksData });

export const deleteByIdRequest = (id: number) => action(Types.DELETE_BY_ID_REQUEST,  { id });
export const deleteByIdSuccess = (data: boolean) => action(Types.DELETE_BY_ID_SUCCESS,  { data });

export const createRequest = (publisher: Publisher) => action(Types.CREATE_REQUEST,  { publisher });
export const createSuccess = (publisherData: Publisher) => action(Types.CREATE_SUCCESS,  { publisherData });

export const changeFlagEditing = () => action(Types.CHANGE_FLAG_EDITING);
export const changeFlagDetail = () => action(Types.CHANGE_FLAG_DETAIL);
export const cleanPublisherEdit = () => action(Types.CLEAN_BOOK_EDIT);

export const updateRequestFilter = (requestFilter: Filter) => action(Types.UPDATE_FILTER,  { requestFilter });
export const cleanRequestFilter = () => action(Types.CLEAN_FILTER);

export const updateTotalRows = (requestData: any) => {
  const responseTotalRows = requestData.headers.totalcount || 0;
  return action(Types.UPDATE_RESPONSE_TOTAL_ROWS,  { responseTotalRows: responseTotalRows });
} 
