
import { List } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import { ValidToken } from '../../store/ducks/authentications/types'
import { menuStyles } from '../../styles/Styles'
import AppMenuItem from './AppMenuItem'
import { menuItems } from './MenuItems'
import { bindActionCreators, Dispatch } from 'redux';
import * as authActions from '../../store/ducks/authentications/actions';
import { ROLE_CLIENT } from '../../services/api/constants'

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
    return visibleToRoles.some(visibleToRole => visibleToRole == ROLE_CLIENT);
  }

  function checkRoles(visibleToRoles: string[]) {    
    let visible = false;
    if (validToken) {
      if (validToken.authorities.length > 0) {
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
