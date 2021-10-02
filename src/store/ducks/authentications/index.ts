import { Reducer } from 'redux';
import { ApplicationState } from '../..';
import { AuthenticationsState, AuthenticationsTypes as Types } from './types'

const INITIAL_STATE: AuthenticationsState = {
  loginData: undefined,
  tokenData: undefined,
  loading: false,
  failure: false
};

const reducer: Reducer<AuthenticationsState> = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case Types.LOGIN_REQUEST:
      return { ...state, loading: true };
    case Types.LOGIN_SUCCESS:
      return { ...state, loading: false, tokenData: action.payload.tokenData };    
    case Types.LOGOUT_REQUEST:
      return { ...state, loading: true };
    case Types.LOGOUT_SUCCESS:
      return { ...state, loading: false,  tokenData: undefined};    
    default:
      return state;
  }
}

export default reducer;

// SELECTORS
const getRequestFilter = (state: ApplicationState) => state.publishers.requestFilter || {};

export const selectors = {
  getRequestFilter
} 