import { all, call, put,  } from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects' 
import api from '../../../services/api/api';

import { 
  loadSuccess, loadFailure,
  updateSuccess, updateFailure,
  createSuccess, createFailure,
  findByIdSuccess, findByIdFailure,
  deleteByIdSuccess, deleteByIdFailure,
  searchSuccess, searchFailure, 
  findByNameSuccess, findByNameFailure
 } from './actions'
import { Address, AddressDTO, AddressesTypes as types } from './types';

const takeEvery: any = Eff.takeEvery;
const ADDRESSES_V1 =  'v1/people';

function* load(): Generator<any, any, any> {
  try {
    const reponse = yield call(api.get, `${ADDRESSES_V1}/all`) ;

    yield put(loadSuccess(reponse.data));
  } catch (error) {
    yield put(loadFailure())
  }
}

function* search(action: any): Generator<any, any, any> {
  const filter:AddressDTO = action.payload.filter;
  try {
    const reponse = yield call(api.post, `${ADDRESSES_V1}/fetch`, filter);

    yield put(searchSuccess(reponse.data));
  } catch (error) {
    yield put(searchFailure())
  }
}

function* findById(action: any): Generator<any, any, any> {
 const id:number = action.payload.id;
  try {
    const reponse = yield call(api.get, `${ADDRESSES_V1}/${id}`);

    yield put(findByIdSuccess(reponse.data));    
  } catch (error) {
    yield put(findByIdFailure())
  }
}

function* findByName(action: any): Generator<any, any, any> {
 const name:string = action.payload.name;
  try {
    const reponse = yield call(api.get, `${ADDRESSES_V1}/fetch/${name}`);

    yield put(findByNameSuccess(reponse.data));    
  } catch (error) {
    yield put(findByNameFailure())
  }
}

function* deleteById (action: any): Generator<any, any, any>{
  const id:number = action.payload.id;
  try {
    const reponse = yield call(api.delete, `${ADDRESSES_V1}/${id}`);

    yield put(deleteByIdSuccess(reponse.data));
  } catch (error) {
    yield put(deleteByIdFailure())
  }
}

function* create(action: any): Generator<any, any, any> {
  const company: Address = action.payload.company;
  try {
    const reponse = yield call(api.post, ADDRESSES_V1, company);

    yield put(createSuccess(reponse.data));
  } catch (error) {
    yield put(createFailure())
  }
}

function* update(action: any): Generator<any, any, any>  {
  const company: Address = action.payload.company;
  try {
    const reponse = yield call(api.put, `${ADDRESSES_V1}/${company.id}`, company);

    yield put(updateSuccess(reponse.data));
  } catch (error) {
    yield put(updateFailure())
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