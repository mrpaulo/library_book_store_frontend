import { all, call, put, select,  } from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects' 
import api from '../../../services/api/api';

import { 
  loginSuccess, 
 logoutSuccess
  } from './actions'
import { Login, AuthenticationsTypes as types } from './types';
import { enqueueError, enqueue as notifierEnqueue } from '../notifications/actions';
import { selectors } from '.';

const takeEvery: any = Eff.takeEvery;
const PUBLISHERS_V1 =  'v1/publishers';


function* login(action: any): Generator<any, any, any> {
 const login:Login = action.payload.loginData;
  try {
    const reponse = yield call(api.get, `${PUBLISHERS_V1}/${login}`);

    yield put(loginSuccess(reponse.data));    
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* logout(action: any): Generator<any, any, any> {
  const login:Login = action.payload.loginData;
   try {
     const reponse = yield call(api.get, `${PUBLISHERS_V1}/${login}`);
 
     yield put(logoutSuccess());    
   } catch (error) {
     yield put(enqueueError(error));
   }
 }


export default function* root() {
  yield all([takeEvery(types.LOGIN_REQUEST, login)]);
  yield all([takeEvery(types.LOGOUT_REQUEST, logout)]);
}