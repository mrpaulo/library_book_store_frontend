import { Reducer } from 'redux';
import { ApplicationState } from '../..';
import { getTokenStorage, removeTokenStorage, saveTokenStorage } from '../../../services/security/auth';
import { AuthenticationsState, AuthenticationsTypes as Types } from './types'

const INITIAL_STATE: AuthenticationsState = {
  loginData: undefined,
  tokenData: undefined,
  isAuthenticated: false,
  loading: false,
  failure: false
};

const reducer: Reducer<AuthenticationsState> = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case Types.LOGIN_REQUEST:
      return { ...state, loading: true };
    case Types.LOGIN_SUCCESS:
      let token = action.payload.tokenData;
      saveTokenStorage(token);
      return { ...state, loading: false, isAuthenticated: true, tokenData: token };
    case Types.IS_VALID_REQUEST:
      return { ...state, loading: true };
    case Types.IS_VALID_SUCCESS:
      return { ...state, loading: false, isAuthenticated: action.payload.isAuthenticated };
    case Types.LOGOUT_REQUEST:
      return { ...state, loading: true };
    case Types.LOGOUT_SUCCESS:
      removeTokenStorage();
      return { ...state, loading: false, tokenData: undefined, isAuthenticated: false };
    default:
      return state;
  }
}

export default reducer;

// SELECTORS
const getToken = (state: ApplicationState) => {
  let token = state.authentications.tokenData;

  if (!token) {
    token = getTokenStorage();    
  }

  return token || null;
}

export const selectors = {
  getToken
}