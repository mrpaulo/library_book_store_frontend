import { all, fork } from 'redux-saga/effects';

import  BookSaga  from './books/sagas';
import  CompanySaga  from './companies/sagas';

//export default function* rootSaga() {
  const root = function* run() {
   yield all([
    fork(BookSaga),    
    fork(CompanySaga)    
  ])
};

export default root;