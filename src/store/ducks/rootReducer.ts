import {combineReducers} from 'redux';
import addresses from './addresses';
import books from './books';
import publishers from './publishers';
import notifications from './notifications';
import authors from './authors';

export default combineReducers({
  addresses,
  books,
  publishers,
  notifications,
  authors
});