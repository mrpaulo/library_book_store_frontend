import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import {
  BOOKS_URL,
  ADD_BOOK_URL,
  PUBLISHERS_URL,
  ADD_PUBLISHER_URL,
  AUTHORS_URL,
  ADD_AUTHOR_URL
} from './services/api/constants';
import AppMenu from './components/menu/AppMenu';
import PageBook from './components/book';
import EditBook from './components/book/edit';
import PageCompany from './components/publishers';
import EditCompany from './components/publishers/edit';
import PagePerson from './components/author';
import EditPerson from './components/author/edit';

import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Container from '@material-ui/core/Container'
import { pageMenuStyles } from './styles/Styles';

import { i18n } from './services/i18n/i18n';
import { languages } from './services/i18n/constants';
import { IconButton, Toolbar, Typography } from '@material-ui/core';
import { AppBar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LanguageIcon from '@material-ui/icons/Language';
import Notifier from './components/utils/Notifier';

const App: React.FC = () => {
  const classes = pageMenuStyles()
  const [languageSelected, setLanguageSelect] = useState(languages.en);

  const changeLaguage = (e: any) => {
    e.preventDefault();
    if (languageSelected === languages.en) {
      setLanguageSelect(languages.pt)
      i18n.changeLanguage(languages.pt)
    } else {
      setLanguageSelect(languages.en)
      i18n.changeLanguage(languages.en)
    }
  }

  return (
    <>     
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Library Book Store
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls='ds'
              aria-haspopup="true"
              onClick={changeLaguage}
              color="inherit"
            >
              <LanguageIcon />
              {languageSelected}
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls='ds'
              aria-haspopup="true"
              onClick={() => alert("Autentication not defined yet")}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
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
                  <Route path={PUBLISHERS_URL} exact component={PageCompany} />
                  <Route path={ADD_PUBLISHER_URL} component={EditCompany} />
                  <Route path={AUTHORS_URL} exact component={PagePerson} />
                  <Route path={ADD_AUTHOR_URL} component={EditPerson} />
                </Switch>
                <Notifier />
              </Provider>
            </Container>
          </main>
        </div>
      </BrowserRouter>
    </>)
}
export default App;
