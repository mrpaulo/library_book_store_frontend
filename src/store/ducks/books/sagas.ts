import { all, call, put, } from 'redux-saga/effects';
import * as Eff from 'redux-saga/effects'
import api from '../../../services/api/api';

import {
  loadSuccess, loadFailure,
  updateSuccess, updateFailure,
  createSuccess, createFailure,
  findByIdSuccess, findByIdFailure,
  deleteByIdSuccess, deleteByIdFailure,
  searchSuccess, searchFailure,
  bookConditionFailure, bookConditionSuccess,
  bookFormatFailure, bookFormatSuccess, bookSubjectSuccess, bookSubjectFailure, bookLanguageSuccess, bookLanguageFailure
} from './actions'
import { Book, BookFilter, BooksTypes as types } from './types';
import { enqueue as notifierEnqueue } from '../notifications/actions'

const takeEvery: any = Eff.takeEvery;
const BOOKS_V1 = 'v1/books';

function* load(): Generator<any, any, any> {
  try {
    const reponse = yield call(api.get, `${BOOKS_V1}/all`);

    yield put(loadSuccess(reponse.data));
  } catch (error) {
    yield put(loadFailure())
  }
}

function* search(action: any): Generator<any, any, any> {
  const filter: BookFilter = action.payload.filter;
  try {
    const reponse = yield call(api.post, `${BOOKS_V1}/fetch`, filter);

    yield put(searchSuccess(reponse.data));
  } catch (error) {
    yield put(searchFailure())
  }
}

function* findById(action: any): Generator<any, any, any> {
  const id: number = action.payload.id;
  try {
    const reponse = yield call(api.get, `${BOOKS_V1}/${id}`);

    yield put(findByIdSuccess(reponse.data));
  } catch (error) {
    yield put(findByIdFailure())
  }
}

function* deleteById(action: any): Generator<any, any, any> {
  const id: number = action.payload.id;
  try {
    const reponse = yield call(api.delete, `${BOOKS_V1}/${id}`);

    yield put(deleteByIdSuccess(reponse.data));
  } catch (error) {
    yield put(deleteByIdFailure())
  }
}

function* create(action: any): Generator<any, any, any> {
  const book: Book = action.payload.book;
  try {
    const reponse = yield call(api.post, BOOKS_V1, book);

    yield put(createSuccess(reponse.data));
  } catch (error) {
      yield put(notifierEnqueue(error, true))     
  }
}

function* update(action: any): Generator<any, any, any> {
  const book: Book = action.payload.book;
  try {
    const reponse = yield call(api.put, `${BOOKS_V1}/${book.id}`, book);

    yield put(updateSuccess(reponse.data));
  } catch (error) {
    yield put(updateFailure())
  }
}

function* getBookFormats(): Generator<any> {
  try {
    const reponse: any = yield call(api.get, `${BOOKS_V1}/formats`);

    yield put(bookFormatSuccess(reponse.data));
  } catch (error) {
    yield put(bookFormatFailure())
  }
}

function* getBookConditions(): Generator<any> {
  try {
    const reponse: any = yield call(api.get, `${BOOKS_V1}/conditions`);

    yield put(bookConditionSuccess(reponse.data));
  } catch (error) {
    yield put(bookConditionFailure())
  }
}

function* getBookSubjectList(): Generator<any> {
  try {
    const reponse: any = yield call(api.get, `${BOOKS_V1}/subjects`);

    yield put(bookSubjectSuccess(reponse.data));
  } catch (error) {
    yield put(bookSubjectFailure())
  }
}

function* getBookLanguageList(): Generator<any> {
  try {
    const reponse: any = yield call(api.get, `${BOOKS_V1}/languages`);

    yield put(bookLanguageSuccess(reponse.data));
  } catch (error) {
    yield put(bookLanguageFailure())
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