import { action } from 'typesafe-actions';
import { AuthenticationsTypes as Types, Login, Token } from './types';

export const loginRequest = (loginData: Login) => action(Types.LOGIN_REQUEST, { loginData });
export const loginSuccess = (tokenData: Token ) => action(Types.LOGIN_SUCCESS,  { tokenData });

export const logoutRequest = (loginData: Login) => action(Types.LOGOUT_REQUEST, { loginData });
export const logoutSuccess = () => action(Types.LOGOUT_SUCCESS);
