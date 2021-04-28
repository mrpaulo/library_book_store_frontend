import React from 'react';
import { Provider } from 'react-redux';

import PageBook from './components/book';

import store from './store';


const App = () => <Provider store={store}><PageBook /></Provider> ;

export default App;
