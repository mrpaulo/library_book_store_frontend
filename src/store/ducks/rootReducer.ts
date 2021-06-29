import {combineReducers} from 'redux';
import books from './books';
import companies from './companies';
import people from './people';

export default combineReducers({
  books,
  companies,
  people
});