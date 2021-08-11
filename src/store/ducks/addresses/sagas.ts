import { all, call, put,  } from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects' 
import api from '../../../services/api/api';

import { 
  loadSuccess, 
  updateSuccess, 
  createSuccess, 
  findByIdSuccess, 
  deleteByIdSuccess, 
  searchSuccess,  
  findByNameSuccess,  
  logradouroSuccess,
  countrySuccess,
  stateSuccess,
  citySuccess} from './actions'
import { Address, AddressDTO, AddressesTypes as types } from './types';
import { enqueueError, enqueue as notifierEnqueue } from '../notifications/actions';

const takeEvery: any = Eff.takeEvery;
const ADDRESSES_V1 =  'v1/addresses';

function* load(): Generator<any, any, any> {
  try {
    const reponse = yield call(api.get, `${ADDRESSES_V1}/all`) ;

    yield put(loadSuccess(reponse.data));
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* search(action: any): Generator<any, any, any> {
  const filter:AddressDTO = action.payload.filter;
  try {
    const reponse = yield call(api.post, `${ADDRESSES_V1}/fetch`, filter);

    yield put(searchSuccess(reponse.data));
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* findById(action: any): Generator<any, any, any> {
 const id:number = action.payload.id;
  try {
    const reponse = yield call(api.get, `${ADDRESSES_V1}/${id}`);

    yield put(findByIdSuccess(reponse.data));    
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* findByName(action: any): Generator<any, any, any> {
 const name:string = action.payload.name;
  try {
    const reponse = yield call(api.get, `${ADDRESSES_V1}/fetch/${name}`);

    yield put(findByNameSuccess(reponse.data));    
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* deleteById (action: any): Generator<any, any, any>{
  const id:number = action.payload.id;
  try {
    const reponse = yield call(api.delete, `${ADDRESSES_V1}/${id}`);

    yield put(deleteByIdSuccess(reponse.data));
    yield put(notifierEnqueue({ message: "notifications.deleted" }));    
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* create(action: any): Generator<any, any, any> {
  const company: Address = action.payload.company;
  try {
    const reponse = yield call(api.post, ADDRESSES_V1, company);

    yield put(createSuccess(reponse.data));
    yield put(notifierEnqueue({ message: "notifications.created" }));
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* update(action: any): Generator<any, any, any>  {
  const company: Address = action.payload.company;
  try {
    const reponse = yield call(api.put, `${ADDRESSES_V1}/${company.id}`, company);

    yield put(updateSuccess(reponse.data));
    yield put(notifierEnqueue({ message: "notifications.updated" }));
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* getAllLogradouros(): Generator<any, any, any> {
  
   try {
     const reponse = yield call(api.get, `${ADDRESSES_V1}/logradouros`);
 
     yield put(logradouroSuccess(reponse.data));    
   } catch (error) {
     yield put(enqueueError(error));
   }
 }

function* getAllCoutries(): Generator<any, any, any> {
  
   try {
     const reponse = yield call(api.get, `${ADDRESSES_V1}/countries`);
 
     yield put(countrySuccess(reponse.data));    
   } catch (error) {
     yield put(enqueueError(error));
   }
 }

 function* getAllStates(action: any): Generator<any, any, any> {
  const country:number = action.payload.countryId;
   try {
     const reponse = yield call(api.get, `${ADDRESSES_V1}/${country}/states`);
 
     yield put(stateSuccess(reponse.data));    
   } catch (error) {
     yield put(enqueueError(error));
   }
 }

 function* getAllCities(action: any): Generator<any, any, any> {
  const country:number = action.payload.countryId;
  const state:number = action.payload.stateId;
   try {
     const reponse = yield call(api.get, `${ADDRESSES_V1}/${country}/${state}/cities`);
 
     yield put(citySuccess(reponse.data));    
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
  yield all([takeEvery(types.LOGRADOURO_REQUEST, getAllLogradouros)]); 
  yield all([takeEvery(types.CITY_REQUEST, getAllCities)]); 
  yield all([takeEvery(types.STATE_REQUEST, getAllStates)]); 
  yield all([takeEvery(types.COUNTRY_REQUEST, getAllCoutries)]); 
}