import {createStore, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { AddressesState } from './ducks/addresses/types';
import {BooksState} from './ducks/books/types';
import {CompaniesState} from './ducks/companies/types';
import { PeopleState } from './ducks/people/types';

import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga'

export interface ApplicationState {
  addresses: AddressesState,
  books: BooksState,
  companies: CompaniesState,
  people: PeopleState,
}

const sagaMiddleware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga)

export default store;