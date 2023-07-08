import React from 'react';
import { Routes as MyRoutes, Route, BrowserRouter } from 'react-router-dom'

import {
  BOOKS_URL,
  ADD_BOOK_URL,
  PUBLISHERS_URL,
  ADD_PUBLISHER_URL,
  AUTHORS_URL,
  ADD_AUTHOR_URL,
  LOGIN_URL,
  ABOUT_URL,
  USERS_URL,
  ADD_USER_URL,
  CREATE_LOGIN_URL,
  UPDATE_PASSWORD_URL
} from './services/api/constants';
import AppMenu from './components/menu/AppMenu';
import PageBook from './components/book';
import EditBook from './components/book/edit';
import PageCompany from './components/publisher';
import EditCompany from './components/publisher/edit';
import PagePerson from './components/author';
import EditPerson from './components/author/edit';
import LoginPage from './components/login'
import LoginCreatePage from './components/login/create'
import UpdatePasswordPage from './components/login/update-password'
import PageUser from './components/user'
import EditUser from './components/user/edit';

import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Container from '@material-ui/core/Container'
import { pageMenuStyles } from './styles/Styles';

import Notifier from './components/utils/Notifier';
import PrivateRoute from './services/security/privateRoute';
import HomePage from './components/home';
import AboutPage from './components/about';
import './styles/global.css';
import ErrorBoundary from './components/utils/ErrorBoundary';

const Routes: React.FC = () => {
  const classes = pageMenuStyles()

  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <BrowserRouter>
        <div className={clsx('App', classes.root)}>
          <CssBaseline />
          <Drawer
            variant="permanent"
            classes={{
              paper: 'drawerPaper-5'//classes.drawerPaper
            }}
          >
            <AppMenu />
          </Drawer>
          <main className={classes.content}>
            <Container maxWidth="lg" className={classes.container}>
              <MyRoutes>
                <Route path="/" element={<HomePage />} />
                <Route path={BOOKS_URL} element={<PageBook />} />
                {/* <PrivateRoute path={ADD_BOOK_URL} exact component={EditBook} /> */}
                <Route path={PUBLISHERS_URL} element={<PageCompany />} />
                {/* <PrivateRoute path={ADD_PUBLISHER_URL} exact component={EditCompany} /> */}
                <Route path={AUTHORS_URL} element={<PagePerson />} />
                {/* <PrivateRoute path={ADD_AUTHOR_URL} exact component={EditPerson} />
                <PrivateRoute path={USERS_URL} exact component={PageUser} />
                <PrivateRoute path={ADD_USER_URL} exact component={EditUser} /> */}
                <Route path={LOGIN_URL} element={<LoginPage />} />
                <Route path={CREATE_LOGIN_URL} element={LoginCreatePage as any} />
                <Route path={UPDATE_PASSWORD_URL} element={<UpdatePasswordPage />} />
                <Route path={ABOUT_URL} element={<AboutPage />} />
              </MyRoutes>
              <Notifier />
            </Container>
          </main>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  )
};

export default Routes;