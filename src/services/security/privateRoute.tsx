import React, {  useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from 'redux';
import * as authenticationsActions from '../../store/ducks/authentications/actions';

import { Route, Redirect } from "react-router-dom";

import { ApplicationState } from "../../store";
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
