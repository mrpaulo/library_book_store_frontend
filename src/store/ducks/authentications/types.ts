
/**
* Action types 
*/
export enum AuthenticationsTypes {
  LOGIN_REQUEST = '@authentications/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@authentications/LOGIN_SUCCESS' ,

  IS_VALID_REQUEST = '@authentications/IS_VALID_REQUEST',
  IS_VALID_SUCCESS = '@authentications/IS_VALID_SUCCESS' ,

  LOGOUT_REQUEST = '@authentications/LOGOUT_REQUEST',
  LOGOUT_SUCCESS = '@authentications/LOGOUT_SUCCESS' 
};
/**
 * Data types
 */
export interface Login {  
  username: String, 
  password: String
}

export interface NewLogin {  
  username: String, 
  repeatPassword: String,
  password: String
}

export interface Token{    
  userName: String, 
  access_token: String,
  refresh_token: String
}

/**
 *  State type
 */
export interface AuthenticationsState {
  readonly loginData?: Login
  readonly tokenData?: Token
  readonly isAuthenticated: boolean
  readonly loading: boolean
  readonly failure: boolean
}

