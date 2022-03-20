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
import React from 'react';
//Translation
import { useTranslation } from "react-i18next";
//Style
import './styles/global.css';
//Images
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
        <a href="https://github.com/mrpaulo" target="_blank" rel="noopener noreferrer" >
          <img alt="github" src={githubIcon} style={{ width: "52px", height: "35px" }} />
        </a>
        <a href="https://www.linkedin.com/in/paulo-ricardo-melo-rodrigues/" target="_blank" rel="noopener noreferrer" >
          <img alt="linkedin" src={linkdinIcon} style={{ width: "32px", height: "32px", marginLeft: "15px"}} />
        </a>
      </p>
    </footer>
  )
};

export default FooterPage;