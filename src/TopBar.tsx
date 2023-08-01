/**
 * Copyright (C) 2021 paulo.rodrigues
 * Profile: <https://github.com/mrpaulo>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

//React
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { useNavigate } from "react-router-dom";
//Types, constants and local components
import { LOGIN_URL } from './services/api/constants';
import { Token } from './store/ducks/authentications/types';
import { UPDATE_PASSWORD_URL } from './services/api/constants';
//Actions and store
import * as authenticationsActions from './store/ducks/authentications/actions';
import { ApplicationState } from './store';
//Translation
import { i18n } from './services/i18n/i18n';
import { languages } from './services/i18n/constants';
import { useTranslation } from "react-i18next";
//Style
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LanguageIcon from '@mui/icons-material/Language';
import { pageMenuStyles } from './styles/Styles';
import ErrorBoundary from './components/utils/ErrorBoundary';

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
  //const history = useNavigate();
  const { token, isAuthenticated, logoutRequest, isTokenValidRequest } = props;
  const [languageSelected, setLanguageSelect] = useState(languages.en);
  const [showMenuUser, setShowMenuUser] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    isTokenValidRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleUpdatePassword = () => {
    // if (history) {
    //   history(UPDATE_PASSWORD_URL as string);
    // } else {
    //   window.location.href = UPDATE_PASSWORD_URL;
    // }
    // Usando o navigate está dando:
    //useNavigate() may be used only in the context of a <Router> component.
    //TODO: Preciso encontrar uma forma de usar o navigate aqui. Porque assim o back booton dá erro
    window.location.href = UPDATE_PASSWORD_URL
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
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            size="large">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <a href='/' style={{ color: 'inherit', textDecoration: 'inherit' }}>
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
              size="large">
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
              size="large">
              <AccountCircle />
            </IconButton>
            {showMenuUser
              ? (
                <nav ref={dropdownRef} className={`menu ${showMenuUser ? 'active' : 'inactive'}`}>
                  <ul>
                    {isAuthenticated ?
                      (<>
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
                            color="primary"
                            variant="outlined"
                            onClick={handleUpdatePassword}
                          >
                            {t("menu.update_password")}
                          </Button>
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
    </ErrorBoundary>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  token: state.authentications.tokenData,
  isAuthenticated: state.authentications.isAuthenticated
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(authenticationsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
