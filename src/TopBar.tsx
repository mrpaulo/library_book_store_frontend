import React, { useEffect, useRef, useState } from 'react';

import { LOGIN_URL } from './services/api/constants';

import { pageMenuStyles } from './styles/Styles';

import { i18n } from './services/i18n/i18n';
import { languages } from './services/i18n/constants';
import { useTranslation } from "react-i18next";

import { Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import { AppBar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LanguageIcon from '@material-ui/icons/Language';
import { ApplicationState } from './store';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import * as authenticationsActions from './store/ducks/authentications/actions';
import { Token } from './store/ducks/authentications/types';
import { createHashHistory } from 'history'

interface StateProps {
  token?: Token,
  isAuthenticated: boolean
}

interface DispatchProps {
  isTokenValidRequest(): void,
  logoutRequest(): void,
}

type Props = StateProps & DispatchProps

const TopBar: React.FC<Props> = (props) => {
  const classes = pageMenuStyles()
  const { t } = useTranslation();
  const { token, isAuthenticated, logoutRequest, isTokenValidRequest } = props;
  const history = createHashHistory()
  const [languageSelected, setLanguageSelect] = useState(languages.en);
  const [showMenuUser, setShowMenuUser] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    isTokenValidRequest();
  }, []);

  

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

  const handleLogout = () => {
    logoutRequest();    
  };

  const handleLogin = () => {
    goToLoginPage();
  };

  const goToLoginPage = () => {
    window.location.href = LOGIN_URL;
  }

  const openMenuUser = () => {
    setShowMenuUser(!showMenuUser)
  }
  return (
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
          <a href='/'  style={{color: 'inherit', textDecoration:'inherit'}}>
          Library Book Store
          </a>
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
            onClick={openMenuUser}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          {showMenuUser
            ? (
              <nav ref={dropdownRef} className={`menu ${showMenuUser ? 'active' : 'inactive'}`}>
                <ul>
                  {isAuthenticated ?
                    (
                      <>
                        <li>
                          <p>
                            <AccountCircle />
                            {token?.userName}
                          </p>
                        </li>
                        <li>
                          <Button
                            className={classes.menuBarButton}
                            type="submit"
                            color="secondary"
                            variant="outlined"
                            onClick={handleLogout}
                          >
                            {t("menu.logout")}
                          </Button>
                        </li>
                      </>
                    ) : (
                      <li>
                        <Button
                          className={classes.menuBarButton}
                          type="submit"
                          color="primary"
                          variant="outlined"
                          onClick={handleLogin}
                        >
                          {t("menu.login")}
                        </Button>
                      </li>
                    )}
                </ul>
              </nav>
            )
            : (null)
          }
        </div>
      </Toolbar>
    </AppBar>
  )
};

const mapStateToProps = (state: ApplicationState) => ({
  token: state.authentications.tokenData,
  isAuthenticated: state.authentications.isAuthenticated
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(authenticationsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);