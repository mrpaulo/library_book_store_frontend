import { PageableFilter } from "../../../components/utils/PageableFilter";
import { Address } from "../addresses/types";

/**
* Action types 
*/
export enum UsersTypes {
  LOAD_REQUEST = '@users/LOAD_REQUEST',
  LOAD_SUCCESS = '@users/LOAD_SUCCESS',

  SEARCH_REQUEST = '@users/SEARCH_REQUEST',
  SEARCH_SUCCESS = '@users/SEARCH_SUCCESS',

  FIND_BY_ID_REQUEST = '@users/FIND_BY_ID_REQUEST',
  FIND_BY_ID_SUCCESS = '@users/FIND_BY_ID_SUCCESS',

  FIND_BY_NAME_REQUEST = '@users/FIND_BY_NAME_REQUEST',
  FIND_BY_NAME_SUCCESS = '@users/FIND_BY_NAME_SUCCESS',

  DELETE_BY_ID_REQUEST = '@users/DELETE_BY_ID_REQUEST',
  DELETE_BY_ID_SUCCESS = '@users/DELETE_BY_ID_SUCCESS',

  CREATE_REQUEST = '@users/CREATE_REQUEST',
  CREATE_SUCCESS = '@users/CREATE_SUCCESS',

  UPDATE_REQUEST = '@users/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@users/UPDATE_SUCCESS',

  CHANGE_FLAG_EDITING = '@users/CHANGE_FLAG_EDITING',
  CHANGE_FLAG_DETAIL = '@users/CHANGE_FLAG_DETAIL',
  CLEAN_USER_EDIT = '@users/CLEAN_USER_EDIT',
  
  UPDATE_FILTER= '@users/UPDATE_FILTER',
  CLEAN_FILTER= '@users/CLEAN_FILTER',
  UPDATE_RESPONSE_TOTAL_ROWS= '@users/UPDATE_RESPONSE_TOTAL_ROWS' ,

  UPDATE_PASSWORD_REQUEST = '@users/UPDATE_PASSWORD_REQUEST',
  UPDATE_PASSWORD_SUCCESS = '@users/UPDATE_PASSWORD_SUCCESS' ,

  ROLE_REQUEST = '@users/ROLE_REQUEST',
  ROLE_SUCCESS = '@users/ROLE_SUCCESS' 
};
/**
 * Data types
 */
export interface User {
  id?: number,
  username: String,
  password?: String
  name?: String, 
  sex?: String, 
  cpf?: String, 
  email?: String, 
  birthdate?:Date,
  address?: Address,
  roles?: Role[]
}

export interface Role {
  id?: number,
  name?: string
}

export interface UserRequestFilter extends PageableFilter{  
  name?: String, 
  cpf?: String, 
}

export interface UserDTO {
  id: number, 
  name: string, 
  username: String,
  cpf: String, 
  sex?: String, 
  email: String, 
  birthdate:Date
}

/**
 *  State type
 */
export interface UsersState {
  readonly userData?: User
  readonly usersData: UserDTO[]
  readonly usersAutoComplete?: UserDTO[]
  readonly loading: boolean
  readonly error: boolean
  readonly flagEditing: boolean
  readonly flagDetail: boolean  
  readonly rolesListData?: Role[]
  readonly requestFilter?: UserRequestFilter
  readonly responseTotalRows: number
  readonly createdSuccess: boolean
}

