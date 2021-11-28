import { action } from 'typesafe-actions';
import { UsersTypes as Types, User, UserRequestFilter as Filter, UserDTO, Role } from './types';

export const loadRequest = () => action(Types.LOAD_REQUEST);
export const loadSuccess = (usersData: User[]) => action(Types.LOAD_SUCCESS,  { usersData });

export const searchRequest = () => action(Types.SEARCH_REQUEST);
export const searchSuccess = (usersData: User[]) => action(Types.SEARCH_SUCCESS,  { usersData });

export const findByIdRequest = (id: number) => action(Types.FIND_BY_ID_REQUEST,  { id });
export const findByIdSuccess = (userData: User) => action(Types.FIND_BY_ID_SUCCESS,  { userData });

export const findByNameRequest = (name: string) => action(Types.FIND_BY_NAME_REQUEST,  { name });
export const findByNameSuccess = (usersData: UserDTO) => action(Types.FIND_BY_NAME_SUCCESS,  { usersData});

export const updateRequest = (user: User) => action(Types.UPDATE_REQUEST,  { user });
export const updateSuccess = (userData: User) => action(Types.UPDATE_SUCCESS,  { userData });

export const deleteByIdRequest = (id: number) => action(Types.DELETE_BY_ID_REQUEST,  { id });
export const deleteByIdSuccess = (data: boolean) => action(Types.DELETE_BY_ID_SUCCESS,  { data });

export const createRequest = (user: User) => action(Types.CREATE_REQUEST,  { user });
export const createSuccess = (userData: User) => action(Types.CREATE_SUCCESS,  { userData });

export const changeFlagEditing = () => action(Types.CHANGE_FLAG_EDITING);
export const changeFlagDetail = () => action(Types.CHANGE_FLAG_DETAIL);
export const cleanUserEdit = () => action(Types.CLEAN_BOOK_EDIT);

export const updateRequestFilter = (requestFilter: Filter) => action(Types.UPDATE_FILTER,  { requestFilter });
export const cleanRequestFilter = () => action(Types.CLEAN_FILTER);

export const updateTotalRows = (requestData: any) => {
  const responseTotalRows = requestData.headers.totalcount || 0;
  return action(Types.UPDATE_RESPONSE_TOTAL_ROWS,  { responseTotalRows: responseTotalRows });
} 

export const roleRequest = () => action(Types.ROLE_REQUEST);
export const roleSuccess = (rolesListData: Role[]) => action(Types.ROLE_SUCCESS,  { rolesListData });

