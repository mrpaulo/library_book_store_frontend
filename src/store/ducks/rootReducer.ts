import {combineReducers} from 'redux';
import addresses from './addresses';
import books from './books';
import companies from './companies';
import people from './people';

export default combineReducers({
  addresses,
  books,
  companies,
  people
});