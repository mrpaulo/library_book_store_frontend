import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { ApplicationState } from '../../store';
import * as peopleActions from '../../store/ducks/people/actions';
import PersonFilter from './filter';
import PeopleList from './list';
import PersonEdit from './edit';

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
   {flagEditing || flagDetail ? (
        <PersonEdit />
      ) : (
        <> 
        <PersonFilter />
        <PeopleList />
      </>     
    )}
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