import { call, put } from 'redux-saga/effects';
import api from '../../../services/api/api';

import { loadSuccess, loadFailure } from './actions'

export function* load() {
  try {
    const reponse = yield call(api.get, 'v1/books/all') // '/api/v1/books' users/diego3g/repos

    yield put(loadSuccess(reponse.data));
  } catch (error) {
    yield put(loadFailure())
  }
}