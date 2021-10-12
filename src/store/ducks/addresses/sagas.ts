import { all, call, put,  } from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects' 
import {apiBasic, apiBearer } from '../../../services/api/api';

import {   
  deleteByIdAddressSuccess, 
  logradouroSuccess,
  countrySuccess,
  stateSuccess,
  citySuccess} from './actions'
import { AddressesTypes as types } from './types';
import { enqueueError, enqueue as notifierEnqueue } from '../notifications/actions';

const takeEvery: any = Eff.takeEvery;
const ADDRESSES_V1 =  'v1/addresses';

function* deleteById (action: any): Generator<any, any, any>{
  const id:number = action.payload.id;
  try {
    const reponse = yield call(apiBasic.delete, `${ADDRESSES_V1}/${id}`);

    yield put(deleteByIdAddressSuccess(reponse.data));
    yield put(notifierEnqueue({ message: "notifications.deleted" }));    
  } catch (error) {
    yield put(enqueueError(error));
  }
}



function* getAllLogradouros(): Generator<any, any, any> {
  
   try {
     const reponse = yield call(apiBasic.get, `${ADDRESSES_V1}/logradouros`);
 
     yield put(logradouroSuccess(reponse.data));    
   } catch (error) {
     yield put(enqueueError(error));
   }
 }

function* getAllCoutries(): Generator<any, any, any> {
  
   try {
     const reponse = yield call(apiBasic.get, `${ADDRESSES_V1}/countries`);
 
     yield put(countrySuccess(reponse.data));    
   } catch (error) {
     yield put(enqueueError(error));
   }
 }

 function* getAllStates(action: any): Generator<any, any, any> {
  const country:number = action.payload.countryId;
   try {
     const reponse = yield call(apiBasic.get, `${ADDRESSES_V1}/${country}/states`);
 
     yield put(stateSuccess(reponse.data));    
   } catch (error) {
     yield put(enqueueError(error));
   }
 }

 function* getAllCities(action: any): Generator<any, any, any> {
  const country:number = action.payload.countryId;
  const state:number = action.payload.stateId;
   try {
     const reponse = yield call(apiBasic.get, `${ADDRESSES_V1}/${country}/${state}/cities`);
 
     yield put(citySuccess(reponse.data));    
   } catch (error) {
     yield put(enqueueError(error));
   }
 }

export default function* root() {
  yield all([takeEvery(types.DELETE_BY_ID_REQUEST, deleteById)]);
  yield all([takeEvery(types.LOGRADOURO_REQUEST, getAllLogradouros)]); 
  yield all([takeEvery(types.CITY_REQUEST, getAllCities)]); 
  yield all([takeEvery(types.STATE_REQUEST, getAllStates)]); 
  yield all([takeEvery(types.COUNTRY_REQUEST, getAllCoutries)]); 
}