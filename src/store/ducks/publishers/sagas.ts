import { all, call, put, select,  } from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects' 
import {apiBasic, apiBearer, getBearerHeader } from '../../../services/api/api';

import { 
  loadSuccess, 
  updateSuccess, 
  createSuccess, 
  findByIdSuccess, 
  deleteByIdSuccess, 
  searchSuccess,  
  findByNameSuccess, 
  updateTotalRows} from './actions'
import { Publisher, PublishersTypes as types } from './types';
import { enqueueError, enqueue as notifierEnqueue } from '../notifications/actions';
import { selectors } from '.';

const takeEvery: any = Eff.takeEvery;
const PUBLISHERS_V1 =  'v1/publishers';

function* load(): Generator<any, any, any> {
  try {
    const reponse = yield call(apiBasic.get, `${PUBLISHERS_V1}/all`) ;

    yield put(loadSuccess(reponse.data));
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* search(): Generator<any, any, any> {
  const filter = yield select(selectors.getRequestFilter);
  
  try {
    const reponse = yield call(apiBasic.post, `${PUBLISHERS_V1}/fetch`, filter);
    
    yield put(updateTotalRows(reponse));
    yield put(searchSuccess(reponse.data));
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* findById(action: any): Generator<any, any, any> {
 const id:number = action.payload.id;
  try {
    const reponse = yield call(apiBasic.get, `${PUBLISHERS_V1}/${id}`);

    yield put(findByIdSuccess(reponse.data));    
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* findByName(action: any): Generator<any, any, any> {
 const name:string = action.payload.name;
  try {
    const reponse = yield call(apiBasic.get, `${PUBLISHERS_V1}/fetch/${name}`);

    yield put(findByNameSuccess(reponse.data));    
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* deleteById (action: any): Generator<any, any, any>{
  const id:number = action.payload.id;
  try {
    const reponse = yield call(apiBearer.delete, `${PUBLISHERS_V1}/${id}` );

    yield put(deleteByIdSuccess(reponse.data));
    yield put(notifierEnqueue({ message: "notifications.deleted" }));   
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* create(action: any): Generator<any, any, any> {
  const publisher: Publisher = action.payload.publisher;
  try {
    
    const reponse = yield call(apiBearer.post, PUBLISHERS_V1, publisher, getBearerHeader());

    yield put(createSuccess(reponse.data));
    yield put(notifierEnqueue({ message: "notifications.created" }));
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* update(action: any): Generator<any, any, any>  {
  const publisher: Publisher = action.payload.publisher;
  try {
    const reponse = yield call(apiBearer.put, `${PUBLISHERS_V1}/${publisher.id}`, publisher, getBearerHeader());

    yield put(updateSuccess(reponse.data));
    yield put(notifierEnqueue({ message: "notifications.updated" }));
  } catch (error) {
    yield put(enqueueError(error));
  }
}

export default function* root() {
  yield all([takeEvery(types.LOAD_REQUEST, load)]);
  yield all([takeEvery(types.SEARCH_REQUEST, search)]);
  yield all([takeEvery(types.FIND_BY_ID_REQUEST, findById)]);
  yield all([takeEvery(types.FIND_BY_NAME_REQUEST, findByName)]);
  yield all([takeEvery(types.DELETE_BY_ID_REQUEST, deleteById)]);
  yield all([takeEvery(types.CREATE_REQUEST, create)]);
  yield all([takeEvery(types.UPDATE_REQUEST, update)]); 
}