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
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux';
//Actions and store
import * as authActions from '../../store/ducks/authentications/actions';
import { ApplicationState } from '../../store'
//Types, constants and local components
import { ValidToken } from '../../store/ducks/authentications/types'
import AppMenuItem from './AppMenuItem'
import { menuItems } from './MenuItems'
//Styles
import { List } from '@mui/material'
import { menuStyles } from '../../styles/Styles'
import { checkRoles } from '../../services/security/visibleRoles';

interface StateProps {
  validToken?: ValidToken
}

interface DispatchProps {}

type Props = StateProps & DispatchProps

const AppMenu: React.FC<Props> = (props) => {
  const { validToken } = props;
  
  const classes = menuStyles()

  return (
    <List component="nav" className={classes.appMenu} disablePadding>
      {menuItems.map((item, index) => (
        <div key={index}>
          {checkRoles(item.visibleToRoles, validToken) ?
            <AppMenuItem {...item} key={index} /> :
            <></>
          }
        </div>
      ))}
    </List>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  validToken: state.authentications.validTokenData
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(authActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);