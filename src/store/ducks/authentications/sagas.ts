import { all, call, put, select, } from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects'
import { apiBearer, apiLogin, getBearerHeader } from '../../../services/api/api';

import {
  isTokenValidSuccess,
  loginSuccess,
  logoutSuccess
} from './actions'
import { Login, AuthenticationsTypes as types, Token } from './types';
import { enqueueError } from '../notifications/actions';
import { selectors } from '.';

const takeEvery: any = Eff.takeEvery;
const AUTHENTICATIONS_V1 = 'v1/authentications';


function* login(action: any): Generator<any, any, any> {
  const login: Login = action.payload.loginData;    
  var bodyFormData = new FormData();
  bodyFormData.append('grant_type', 'password');
  bodyFormData.append('username', login.username as string);
  bodyFormData.append('password', login.password as string);

  try {    
    const reponse = yield call(apiLogin.post, `oauth/token`, bodyFormData);
    yield put(loginSuccess(reponse.data, login.username));
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* logout(): Generator<any, any, any> {
  const token: Token = yield select(selectors.getToken);
  if (token) {
    try {
      yield call(apiBearer.get, `${AUTHENTICATIONS_V1}/logout`, getBearerHeader());
      yield put(logoutSuccess());
    } catch (error) {
      yield put(enqueueError(error));
      yield put(logoutSuccess());
    }
  } else {
    yield put(logoutSuccess());
  }
}

function* isValidToken(): Generator<any, any, any> {
  const token: Token = yield select(selectors.getToken);
  
  if (token) {
    try {
      var bodyFormData = new FormData();
      bodyFormData.append('token', token.access_token as string);
      const reponse = yield call(apiLogin.post, `oauth/check_token`, bodyFormData);

      yield put(isTokenValidSuccess(reponse.data));
    } catch (error) {
      yield put(logoutSuccess());
      yield put(enqueueError(error));
    }
  } else {
    yield put(logoutSuccess());
  }
}

export default function* root() {
  yield all([takeEvery(types.LOGIN_REQUEST, login)]);
  yield all([takeEvery(types.LOGOUT_REQUEST, logout)]);
  yield all([takeEvery(types.IS_VALID_REQUEST, isValidToken)]);
}