import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import FilterUser from './filter'
import UserList from './list'
import EditUser from './edit'
import { ApplicationState } from '../../store';
import * as usersActions from '../../store/ducks/users/actions';

interface StateProps {
  flagEditing: Boolean,
  flagDetail: Boolean
}

interface DispatchProps {}

type Props = StateProps & DispatchProps

const PageUser : React.FC<Props> = (props) =>{

  const {flagEditing, flagDetail} = props;
  return (
    <>
    {flagEditing || flagDetail ? (
        <EditUser />
      ) : (
        <> 
        <FilterUser />
        <UserList />
      </>     
    )}
    </>
  );
}

PageUser.displayName = 'PageUser';

const mapStateToProps = (state: ApplicationState) => ({
  flagEditing: state.users.flagEditing,  
  flagDetail: state.users.flagDetail,  
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(usersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageUser);