import {createStore, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { AddressesState } from './ducks/addresses/types';
import {BooksState} from './ducks/books/types';
import {PublishersState} from './ducks/publishers/types';
import { NotificationsState } from './ducks/notifications/types';
import { AuthorsState } from './ducks/authors/types';

import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga'

export interface ApplicationState {
  addresses: AddressesState,
  books: BooksState,
  publishers: PublishersState,
  notifications: NotificationsState,
  authors: AuthorsState,
}

const sagaMiddleware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga)

export default store;