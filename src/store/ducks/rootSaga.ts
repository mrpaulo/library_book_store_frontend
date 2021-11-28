import { all, fork } from 'redux-saga/effects';

import AddressSaga from './addresses/sagas';
import AuthenticationSaga from './authentications/sagas'
import AuthorSaga from './authors/sagas';
import BookSaga from './books/sagas';
import PublisherSaga from './publishers/sagas';
import UserSaga from './users/sagas';

const root = function* run() {
  yield all([
    fork(AddressSaga),
    fork(AuthenticationSaga),
    fork(AuthorSaga),
    fork(BookSaga),
    fork(PublisherSaga),
    fork(UserSaga),
  ])
};

export default root;