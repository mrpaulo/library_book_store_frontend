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
import React, {  useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from 'redux';
import { Route, Redirect } from "react-router-dom";
//Actions and store
import * as authenticationsActions from '../../store/ducks/authentications/actions';
import { ApplicationState } from "../../store";
//Constants
import { LOGIN_URL } from "../api/constants";

interface StateProps {
  component: React.FC;
  path: string;
  exact: boolean;
  isAuthenticated: boolean;
}

interface DispatchProps {    
  isTokenValidRequest(): void,
  savePathToRedirect(path: String): void,
}

type Props = StateProps & DispatchProps

const PrivateRoute: React.FC<Props> = (props) => {

  useEffect(() => {
    props.isTokenValidRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 const savePath = (path: String) => {
   props.savePathToRedirect(path)
 }

  return props.isAuthenticated ?
    (<Route path={props.path} exact={props.exact} component={props.component} />) :
    (<>
    {savePath(props.path)}
    <Redirect to={LOGIN_URL}/>
    </>);
};

const mapStateToProps = (state: ApplicationState) => ({  
  isAuthenticated: state.authentications.isAuthenticated
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(authenticationsActions, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
