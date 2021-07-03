import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import {
  BOOKS_URL,
  ADD_BOOK_URL,
  COMPANIES_URL,
  ADD_COMPANY_URL,
  PEOPLE_URL,
  ADD_PERSON_URL
} from './services/api/constants';
import AppMenu from './components/menu/AppMenu';
import PageBook from './components/book';
import EditBook from './components/book/editBook';
import PageCompany from './components/company';
import EditCompany from './components/company/editCompany';
import PagePerson from './components/person';
import EditPerson from './components/person/editPerson';

import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Container from '@material-ui/core/Container'
import { pageMenuStyles } from './styles/Styles';

//const App = () => <Provider store={store}><PageBook /></Provider> ;
const App: React.FC = () => {
  const classes = pageMenuStyles()

  return (
    <BrowserRouter>
      <div className={clsx('App', classes.root)}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <AppMenu />
        </Drawer>
        <main className={classes.content}>
          <Container maxWidth="lg" className={classes.container}>
            <Provider store={store}>
              <Switch>
                <Route path="/" exact component={PageBook} />
                <Route path={BOOKS_URL} exact component={PageBook} />
                <Route path={ADD_BOOK_URL} component={EditBook} />
                <Route path={COMPANIES_URL} exact component={PageCompany} />
                <Route path={ADD_COMPANY_URL} component={EditCompany} />
                <Route path={PEOPLE_URL} exact component={PagePerson} />
                <Route path={ADD_PERSON_URL} component={EditPerson} />
              </Switch>
            </Provider>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  )
}
export default App;
