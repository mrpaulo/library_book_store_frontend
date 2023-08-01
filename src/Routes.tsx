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
import CssBaseline from '@mui/material/CssBaseline'
import Drawer from '@mui/material/Drawer'
import Container from '@mui/material/Container'
import { pageMenuStyles } from './styles/Styles';

import Notifier from './components/utils/Notifier';
import HomePage from './components/home';
import AboutPage from './components/about';
import NotFoundPage from './components/not-found';
import './styles/global.css';
import ErrorBoundary from './components/utils/ErrorBoundary';
import RequireAuth from './services/security/requireAuth';
import { ThemeProvider, Theme  } from '@emotion/react';
import { createMuiTheme, StyledEngineProvider } from '@mui/material';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const Routes: React.FC = () => {
  const classes = pageMenuStyles()
  const theme = createMuiTheme();
  
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
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
                  <Route path={ADD_BOOK_URL} element={
                    <RequireAuth path={ADD_BOOK_URL} children={<EditBook />} />                    
                  } />
                  <Route path={PUBLISHERS_URL} element={<PageCompany />} />
                  <Route path={ADD_PUBLISHER_URL} element={
                    <RequireAuth path={ADD_PUBLISHER_URL} children={<EditCompany />} />                    
                  } />
                  <Route path={AUTHORS_URL} element={<PagePerson />} />
                  
                  <Route path={ADD_AUTHOR_URL} element={
                    <RequireAuth path={ADD_AUTHOR_URL} children={<EditPerson />} />                    
                  } />
                  <Route path={USERS_URL} element={
                    <RequireAuth path={USERS_URL} children={<PageUser />} />                    
                  } />
                  <Route path={ADD_USER_URL} element={
                    <RequireAuth path={ADD_USER_URL} children={<EditUser />} />                    
                  } />
                  <Route path={LOGIN_URL} element={<LoginPage />} />
                  <Route path={CREATE_LOGIN_URL} element={LoginCreatePage as any} />
                  <Route path={UPDATE_PASSWORD_URL} element={<UpdatePasswordPage />} />
                  <Route path={ABOUT_URL} element={<AboutPage />} />
                  <Route path={"*"} element={<NotFoundPage />} />
                </MyRoutes>
                <Notifier />
              </Container>
            </main>
          </div>
        </BrowserRouter>
      </ErrorBoundary>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Routes;