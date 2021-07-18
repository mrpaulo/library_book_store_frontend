import {combineReducers} from 'redux';
import addresses from './addresses';
import books from './books';
import companies from './companies';
import notifications from './notifications';
import people from './people';

export default combineReducers({
  addresses,
  books,
  companies,
  notifications,
  people
});