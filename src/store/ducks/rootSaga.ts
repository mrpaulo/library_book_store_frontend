import { all, fork } from 'redux-saga/effects';

import  BookSaga  from './books/sagas';
import  CompanySaga  from './companies/sagas';
import  PersonSaga  from './people/sagas';

//export default function* rootSaga() {
  const root = function* run() {
   yield all([
    fork(BookSaga),    
    fork(CompanySaga),   
    fork(PersonSaga)    
  ])
};

export default root;