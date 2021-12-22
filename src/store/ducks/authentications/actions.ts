import { action } from 'typesafe-actions';
import { AuthenticationsTypes as Types, Login, Token, ValidToken } from './types';

export const loginRequest = (loginData: Login) => action(Types.LOGIN_REQUEST, { loginData });
export const loginSuccess = (tokenData: Token, userName: String ) => action(Types.LOGIN_SUCCESS,  { tokenData, userName });

export const logoutRequest = () => action(Types.LOGOUT_REQUEST);
export const logoutSuccess = () => action(Types.LOGOUT_SUCCESS);

export const isTokenValidRequest = () => action(Types.IS_VALID_REQUEST);
export const isTokenValidSuccess = (validTokenData: ValidToken) => action(Types.IS_VALID_SUCCESS, { validTokenData });

export const savePathToRedirect = (path: String) => action(Types.SAVE_PATH_TO_REDIRECT, {path});