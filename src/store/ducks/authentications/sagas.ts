import { all, call, put, select, } from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects'
import {apiBasic, apiBearer } from '../../../services/api/api';

import {
  isTokenValidSuccess,
  loginSuccess,
  logoutSuccess
} from './actions'
import { Login, AuthenticationsTypes as types, Token } from './types';
import { enqueueError, enqueue as notifierEnqueue } from '../notifications/actions';
import { selectors } from '.';

const takeEvery: any = Eff.takeEvery;
const AUTHENTICATIONS_V1 = 'v1/authentiations';


function* login(action: any): Generator<any, any, any> {
  const login: Login = action.payload.loginData;
  console.log("Login")
  console.log(login)
  try {
    const reponse = yield call(apiBasic.post, `${AUTHENTICATIONS_V1}`, login);

    yield put(loginSuccess(reponse.data));
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* logout(): Generator<any, any, any> {
  const token: Token = yield select(selectors.getToken);
  if (token) {
    try {
      yield call(apiBasic.get, `${AUTHENTICATIONS_V1}/${token.value}`);
      yield put(logoutSuccess());
    } catch (error) {
      yield put(enqueueError(error));
    }
  } else {
    yield put(logoutSuccess());
  }
}

function* isValidToken(): Generator<any, any, any> {
  const token: Token = yield select(selectors.getToken);
  console.log("Token  saga")
  console.log(token)
  if (token) {
    try {
      const reponse = yield call(apiBasic.post, `${AUTHENTICATIONS_V1}/valid`, token);

      yield put(isTokenValidSuccess(reponse.data));
    } catch (error) {
      yield put(logoutSuccess());
      yield put(enqueueError(error));
    }
  } else {
    yield put(isTokenValidSuccess(false));
  }
}

export default function* root() {
  yield all([takeEvery(types.LOGIN_REQUEST, login)]);
  yield all([takeEvery(types.LOGOUT_REQUEST, logout)]);
  yield all([takeEvery(types.IS_VALID_REQUEST, isValidToken)]);
}