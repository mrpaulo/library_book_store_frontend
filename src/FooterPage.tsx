import React, { useEffect, useRef, useState } from 'react';

import { LOGIN_URL } from './services/api/constants';

import { footerStyles } from './styles/Styles';

import { i18n } from './services/i18n/i18n';
import { languages } from './services/i18n/constants';
import { useTranslation } from "react-i18next";

import { Box, Button, IconButton, Link, Toolbar, Typography } from '@material-ui/core';
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
import './styles/global.css';
import linkdinIcon from './assets/images/linkdinIcon.png';
import githubIcon from './assets/images/githubIcon.png';

const FooterPage = () => {
  const { t } = useTranslation();

  return (
    <footer >
      <h3>
        {t("messages.developed_by")} Paulo Rodrigues © {new Date().getFullYear()}
      </h3>
      <p style={{marginTop: "15px" }}>
        <a href="https://github.com/mrpaulo" target="_blank">
          <img src={githubIcon} style={{ width: "52px", height: "35px" }} />
        </a>
        <a href="https://www.linkedin.com/in/paulo-ricardo-melo-rodrigues/" target="_blank">
          <img src={linkdinIcon} style={{ width: "32px", height: "32px", marginLeft: "15px"}} />
        </a>
      </p>
    </footer>
  )
};

export default FooterPage;
