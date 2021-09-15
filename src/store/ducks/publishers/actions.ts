import { action } from 'typesafe-actions';
import { PublishersTypes, Publisher, PublisherRequestFilter, PublisherDTO } from './types';

export const loadRequest = () => action(PublishersTypes.LOAD_REQUEST);
export const loadSuccess = (publishersData: Publisher[]) => action(PublishersTypes.LOAD_SUCCESS,  { publishersData });

export const searchRequest = (filter: PublisherRequestFilter) => action(PublishersTypes.SEARCH_REQUEST, { filter});
export const searchSuccess = (publishersData: Publisher[]) => action(PublishersTypes.SEARCH_SUCCESS,  { publishersData });

export const findByIdRequest = (id: number) => action(PublishersTypes.FIND_BY_ID_REQUEST,  { id });
export const findByIdSuccess = (publisherData: Publisher) => action(PublishersTypes.FIND_BY_ID_SUCCESS,  { publisherData });

export const findByNameRequest = (name: string) => action(PublishersTypes.FIND_BY_NAME_REQUEST,  { name });
export const findByNameSuccess = (publishersData: PublisherDTO) => action(PublishersTypes.FIND_BY_NAME_SUCCESS,  { publishersData});

export const updateRequest = (publisher: Publisher) => action(PublishersTypes.UPDATE_REQUEST,  { publisher });
export const updateSuccess = (publisherData: Publisher) => action(PublishersTypes.UPDATE_SUCCESS,  { publisherData });

export const deleteByIdRequest = (id: number) => action(PublishersTypes.DELETE_BY_ID_REQUEST,  { id });
export const deleteByIdSuccess = (data: boolean) => action(PublishersTypes.DELETE_BY_ID_SUCCESS,  { data });

export const createRequest = (publisher: Publisher) => action(PublishersTypes.CREATE_REQUEST,  { publisher });
export const createSuccess = (publisherData: Publisher) => action(PublishersTypes.CREATE_SUCCESS,  { publisherData });

export const changeFlagEditing = () => action(PublishersTypes.CHANGE_FLAG_EDITING);
export const changeFlagDetail = () => action(PublishersTypes.CHANGE_FLAG_DETAIL);
export const cleanPublisherEdit = () => action(PublishersTypes.CLEAN_BOOK_EDIT);
