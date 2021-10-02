import {createStore, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'

import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga'

import { AddressesState } from './ducks/addresses/types';
import { AuthenticationsState } from './ducks/authentications/types';
import { AuthorsState } from './ducks/authors/types';
import { BooksState } from './ducks/books/types';
import { NotificationsState } from './ducks/notifications/types';
import {PublishersState} from './ducks/publishers/types';

export interface ApplicationState {
  addresses: AddressesState,
  authentications: AuthenticationsState
  authors: AuthorsState,
  books: BooksState,
  notifications: NotificationsState,
  publishers: PublishersState,
}

const sagaMiddleware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga)

export default store;