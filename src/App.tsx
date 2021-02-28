import React from 'react';
import { Provider } from 'react-redux';

import BookList from './components/book/bookList';

import store from './store';


const App = () => <Provider store={store}><BookList /></Provider> ;

export default App;
