import { action } from 'typesafe-actions';
import { AuthenticationsTypes as Types, Login, Token } from './types';

export const loginRequest = (loginData: Login) => action(Types.LOGIN_REQUEST, { loginData });
export const loginSuccess = (tokenData: Token ) => action(Types.LOGIN_SUCCESS,  { tokenData });

export const logoutRequest = () => action(Types.LOGOUT_REQUEST);
export const logoutSuccess = () => action(Types.LOGOUT_SUCCESS);

export const isTokenValidRequest = () => action(Types.IS_VALID_REQUEST);
export const isTokenValidSuccess = (isAuthenticated: any) => action(Types.IS_VALID_SUCCESS, { isAuthenticated });
