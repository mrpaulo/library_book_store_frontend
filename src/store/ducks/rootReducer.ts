import {combineReducers} from 'redux';
import books from './books';
import companies from './companies';

export default combineReducers({
  books,
  companies
});