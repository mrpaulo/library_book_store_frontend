import { ActionPattern, all, call, put,  } from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects' 
import api from '../../../services/api/api';

import { 
  loadSuccess, loadFailure,
  updateSuccess, updateFailure,
  createSuccess, createFailure,
  findByIdSuccess, findByIdFailure,
  deleteByIdSuccess, deleteByIdFailure,
  searchSuccess, searchFailure
 } from './actions'
import { Book, BookFilter, BooksTypes as types } from './types';

const takeEvery: any = Eff.takeEvery;
const BOOKS_V1 =  'v1/books';

function* load() {
  try {
    const reponse = yield call(api.get, `${BOOKS_V1}/all`) // '/api/v1/books' users/diego3g/repos

    yield put(loadSuccess(reponse.data));
  } catch (error) {
    yield put(loadFailure())
  }
}

function* search(action: any) {
  const filter:BookFilter = action.payload.filter;
  try {
    const reponse = yield call(api.post, `${BOOKS_V1}/fetch`, filter);

    yield put(searchSuccess(reponse.data));
  } catch (error) {
    yield put(searchFailure())
  }
}

function* findById(action: any) {
 const id:number = action.payload.id;
  try {
    const reponse = yield call(api.get, `${BOOKS_V1}/${id}`);

    yield put(findByIdSuccess(reponse.data));    
  } catch (error) {
    yield put(findByIdFailure())
  }
}

function* deleteById (action: any) {
  const id:number = action.payload.id;
  try {
    const reponse = yield call(api.delete, `${BOOKS_V1}/${id}`);

    yield put(deleteByIdSuccess(reponse.data));
  } catch (error) {
    yield put(deleteByIdFailure())
  }
}

function* create(action: any) {
  const book: Book = action.payload.book;
  try {
    const reponse = yield call(api.post, BOOKS_V1, book);

    yield put(createSuccess(reponse.data));
  } catch (error) {
    yield put(createFailure())
  }
}

function* update(action: any) {
  const book: Book = action.payload.book;
  try {
    const reponse = yield call(api.put, `${BOOKS_V1}/${book.id}`, book);

    yield put(updateSuccess(reponse.data));
  } catch (error) {
    yield put(updateFailure())
  }
}

export default function* root() {
  yield all([takeEvery(types.LOAD_REQUEST, load)]);
  yield all([takeEvery(types.SEARCH_REQUEST, search)]);
  yield all([takeEvery(types.FIND_BY_ID_REQUEST, findById)]);
  yield all([takeEvery(types.DELETE_BY_ID_REQUEST, deleteById)]);
  yield all([takeEvery(types.CREATE_REQUEST, create)]);
  yield all([takeEvery(types.UPDATE_REQUEST, update)]);
}