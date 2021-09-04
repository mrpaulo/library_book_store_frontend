import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ApplicationState } from '../../store';
import * as authorsActions from '../../store/ducks/authors/actions';
import AuthorFilter from './filter';
import AuthorsList from './list';
import AuthorEdit from './edit';

interface StateProps {
  flagEditing: Boolean,
  flagDetail: Boolean
}

interface DispatchProps {
  
}

type Props = StateProps & DispatchProps

const PageAuthor : React.FC<Props> = (props) =>{

  const {flagEditing, flagDetail} = props;
  return (
    <>
   {flagEditing || flagDetail ? (
        <AuthorEdit />
      ) : (
        <> 
        <AuthorFilter />
        <AuthorsList />
      </>     
    )}
    </>
  );
}

PageAuthor.displayName = 'PageAuthor';

const mapStateToProps = (state: ApplicationState) => ({
  flagEditing: state.authors.flagEditing,  
  flagDetail: state.authors.flagDetail,  
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(authorsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageAuthor);