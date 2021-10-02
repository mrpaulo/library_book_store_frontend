import {combineReducers} from 'redux';
import addresses from './addresses';
import authentications from './authentications';
import authors from './authors';
import books from './books';
import notifications from './notifications';
import publishers from './publishers';

export default combineReducers({
  addresses,
  authentications,
  authors,
  books,
  notifications,
  publishers,
});