import { all, call, put, select, } from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects'
import {apiBasic, apiBearer } from '../../../services/api/api';

import {
  loadSuccess,
  updateSuccess,
  createSuccess,
  findByIdSuccess,
  deleteByIdSuccess,
  searchSuccess,
  bookConditionSuccess,
  bookFormatSuccess, 
  bookSubjectSuccess, 
  bookLanguageSuccess,
  updateTotalRows, 
} from './actions'
import { Book, BooksTypes as types } from './types';
import { enqueue as notifierEnqueue, enqueueError } from '../notifications/actions'
import { selectors } from '.';

const takeEvery: any = Eff.takeEvery;
const BOOKS_V1 = 'v1/books';

function* load(): Generator<any, any, any> {
  try {
    const reponse = yield call(apiBasic.get, `${BOOKS_V1}/all`);

    yield put(loadSuccess(reponse.data));
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* search(): Generator<any, any, any> {
  const filter = yield select(selectors.getRequestFilter);
  try {
    const reponse = yield call(apiBasic.post, `${BOOKS_V1}/fetch`, filter);

    yield put(updateTotalRows(reponse));
    yield put(searchSuccess(reponse.data));
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* findById(action: any): Generator<any, any, any> {
  const id: number = action.payload.id;
  try {
    const reponse = yield call(apiBasic.get, `${BOOKS_V1}/${id}`);

    yield put(findByIdSuccess(reponse.data));
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* deleteById(action: any): Generator<any, any, any> {
  const id: number = action.payload.id;
  try {
    const reponse = yield call(apiBearer.delete, `${BOOKS_V1}/${id}`);

    yield put(deleteByIdSuccess(reponse.data));
    yield put(notifierEnqueue({ message: "notifications.deleted" }));    
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* create(action: any): Generator<any, any, any> {
  const book: Book = action.payload.book;
  try {
    const reponse = yield call(apiBasic.post, BOOKS_V1, book);

    yield put(createSuccess(reponse.data));
    yield put(notifierEnqueue({ message: "notifications.created" }));
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* update(action: any): Generator<any, any, any> {
  const book: Book = action.payload.book;
  try {
    const reponse = yield call(apiBasic.put, `${BOOKS_V1}/${book.id}`, book);

    yield put(updateSuccess(reponse.data));
    yield put(notifierEnqueue({ message: "notifications.updated" }));
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* getBookFormats(): Generator<any> {
  try {
    const reponse: any = yield call(apiBasic.get, `${BOOKS_V1}/formats`);

    yield put(bookFormatSuccess(reponse.data));
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* getBookConditions(): Generator<any> {
  try {
    const reponse: any = yield call(apiBasic.get, `${BOOKS_V1}/conditions`);

    yield put(bookConditionSuccess(reponse.data));
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* getBookSubjectList(): Generator<any> {
  try {
    const reponse: any = yield call(apiBasic.get, `${BOOKS_V1}/subjects`);

    yield put(bookSubjectSuccess(reponse.data));
  } catch (error) {
    yield put(enqueueError(error));
  }
}

function* getBookLanguageList(): Generator<any> {
  try {
    const reponse: any = yield call(apiBasic.get, `${BOOKS_V1}/languages`);

    yield put(bookLanguageSuccess(reponse.data));
  } catch (error) {
    yield put(enqueueError(error));
  }
}

export default function* root() {
  yield all([takeEvery(types.LOAD_REQUEST, load)]);
  yield all([takeEvery(types.SEARCH_REQUEST, search)]);
  yield all([takeEvery(types.FIND_BY_ID_REQUEST, findById)]);
  yield all([takeEvery(types.DELETE_BY_ID_REQUEST, deleteById)]);
  yield all([takeEvery(types.CREATE_REQUEST, create)]);
  yield all([takeEvery(types.UPDATE_REQUEST, update)]);
  yield all([takeEvery(types.BOOK_FORMAT_REQUEST, getBookFormats)]);
  yield all([takeEvery(types.BOOK_CONDITION_REQUEST, getBookConditions)]);
  yield all([takeEvery(types.BOOK_SUBJECT_REQUEST, getBookSubjectList)]);
  yield all([takeEvery(types.BOOK_LANGUAGE_REQUEST, getBookLanguageList)]);
}