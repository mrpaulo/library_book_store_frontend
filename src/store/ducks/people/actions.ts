import { action } from 'typesafe-actions';
import { PeopleTypes, Person, PersonFilter, PersonDTO } from './types';

export const loadRequest = () => action(PeopleTypes.LOAD_REQUEST);
export const loadSuccess = (peopleData: Person[]) => action(PeopleTypes.LOAD_SUCCESS,  { peopleData });
export const loadFailure = () => action(PeopleTypes.LOAD_FAILURE);

export const searchRequest = (filter: PersonFilter) => action(PeopleTypes.SEARCH_REQUEST, { filter});
export const searchSuccess = (peopleData: Person[]) => action(PeopleTypes.SEARCH_SUCCESS,  { peopleData });
export const searchFailure = () => action(PeopleTypes.SEARCH_FAILURE);

export const findByIdRequest = (id: number) => action(PeopleTypes.FIND_BY_ID_REQUEST,  { id });
export const findByIdSuccess = (personData: Person) => action(PeopleTypes.FIND_BY_ID_SUCCESS,  { personData });
export const findByIdFailure = () => action(PeopleTypes.FIND_BY_ID_FAILURE);

export const findByNameRequest = (name: string) => action(PeopleTypes.FIND_BY_NAME_REQUEST,  { name });
export const findByNameSuccess = (peopleData: PersonDTO) => action(PeopleTypes.FIND_BY_NAME_SUCCESS,  { peopleData});
export const findByNameFailure = () => action(PeopleTypes.FIND_BY_NAME_FAILURE);

export const updateRequest = (person: Person) => action(PeopleTypes.UPDATE_REQUEST,  { person });
export const updateSuccess = (personData: Person) => action(PeopleTypes.UPDATE_SUCCESS,  { personData });
export const updateFailure = () => action(PeopleTypes.UPDATE_FAILURE);

export const deleteByIdRequest = (id: number) => action(PeopleTypes.DELETE_BY_ID_REQUEST,  { id });
export const deleteByIdSuccess = (data: boolean) => action(PeopleTypes.DELETE_BY_ID_SUCCESS,  { data });
export const deleteByIdFailure = () => action(PeopleTypes.DELETE_BY_ID_FAILURE);

export const createRequest = (person: Person) => action(PeopleTypes.CREATE_REQUEST,  { person });
export const createSuccess = (personData: Person) => action(PeopleTypes.CREATE_SUCCESS,  { personData });
export const createFailure = () => action(PeopleTypes.CREATE_FAILURE);

export const changeFlagEditing = () => action(PeopleTypes.CHANGE_FLAG_EDITING);
export const changeFlagDetail = () => action(PeopleTypes.CHANGE_FLAG_DETAIL);
export const cleanPersonEdit = () => action(PeopleTypes.CLEAN_BOOK_EDIT);
