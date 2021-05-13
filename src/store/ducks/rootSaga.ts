import { all, fork } from 'redux-saga/effects';

import  BookSaga  from './books/sagas';

//export default function* rootSaga() {
  const root = function* run() {
   yield all([
    fork(BookSaga)    
  ])
};

export default root;