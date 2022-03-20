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
import { ROLE_CLIENT } from '../../services/api/constants'
//Styles
import { List } from '@material-ui/core'
import { menuStyles } from '../../styles/Styles'

interface StateProps {
  validToken?: ValidToken
}

interface DispatchProps {

}

type Props = StateProps & DispatchProps

const AppMenu: React.FC<Props> = (props) => {
  const { validToken } = props;

  console.log("Valid Token")
  console.log(validToken)
  const classes = menuStyles()

  function checkRoleClient(visibleToRoles: string[]) {
    return visibleToRoles.some(visibleToRole => visibleToRole === ROLE_CLIENT);
  }

  function checkRoles(visibleToRoles: string[]) {    
    let visible = false;
    if (validToken) {
      if (validToken.authorities && validToken.authorities.length > 0) {
        visible = visibleToRoles.some(visibleToRole => validToken.authorities.includes(visibleToRole));
      } else {
        visible = checkRoleClient(visibleToRoles)
      }
    } else {
      visible = checkRoleClient(visibleToRoles)
    }

    return visible;
  }

  return (
    <List component="nav" className={classes.appMenu} disablePadding>
      {menuItems.map((item, index) => (
        <>
          {checkRoles(item.visibleToRoles) ?
            <AppMenuItem {...item} key={index} /> :
            <></>
          }
        </>
      ))}
    </List>
  )
}



const mapStateToProps = (state: ApplicationState) => ({
  validToken: state.authentications.validTokenData
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(authActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);
