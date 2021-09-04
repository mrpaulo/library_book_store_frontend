import { all, fork } from 'redux-saga/effects';

import AddressSaga from './addresses/sagas';
import BookSaga from './books/sagas';
import PublisherSaga from './publishers/sagas';
import AuthorSaga from './authors/sagas';

const root = function* run() {
  yield all([
    fork(AddressSaga),
    fork(BookSaga),
    fork(PublisherSaga),
    fork(AuthorSaga),
  ])
};

export default root;