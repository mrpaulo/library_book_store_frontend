import React from 'react';
import { Provider } from 'react-redux';
import PageBook from './components/book';
import store from './store';
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { pageMenuStyles } from './styles/Styles';
import AppMenu from './components/menu/AppMenu';
import editBook from './components/book/editBook';

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
              <Route path="/orders" component={PageBook} />
              <Route path="/customers" component={PageBook} />
              <Route path="/reports" component={editBook} />
            </Switch>
          </Provider>
        </Container>
      </main>
    </div>
    </BrowserRouter>
  )
}
export default App;
