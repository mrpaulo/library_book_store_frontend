import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ApplicationState } from '../../store';
import * as peopleActions from '../../store/ducks/people/actions';

interface StateProps {
  flagEditing: Boolean,
  flagDetail: Boolean
}

interface DispatchProps {
  
}

type Props = StateProps & DispatchProps

const PagePerson : React.FC<Props> = (props) =>{

  const {flagEditing, flagDetail} = props;
  return (
    <>
   <h1>Person </h1>
    </>
  );
}

PagePerson.displayName = 'PagePerson';

const mapStateToProps = (state: ApplicationState) => ({
  flagEditing: state.people.flagEditing,  
  flagDetail: state.people.flagDetail,  
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(peopleActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PagePerson);