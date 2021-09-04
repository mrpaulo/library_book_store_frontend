import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import FilterPublisher from './filter'
import PublisherList from './list'
import EditPublisher from './edit'
import { ApplicationState } from '../../store';
import * as publishersActions from '../../store/ducks/publishers/actions';

interface StateProps {
  flagEditing: Boolean,
  flagDetail: Boolean
}

interface DispatchProps {}

type Props = StateProps & DispatchProps

const PagePublisher : React.FC<Props> = (props) =>{

  const {flagEditing, flagDetail} = props;
  return (
    <>
    {flagEditing || flagDetail ? (
        <EditPublisher />
      ) : (
        <> 
        <FilterPublisher />
        <PublisherList />
      </>     
    )}
    </>
  );
}

PagePublisher.displayName = 'PagePublisher';

const mapStateToProps = (state: ApplicationState) => ({
  flagEditing: state.publishers.flagEditing,  
  flagDetail: state.publishers.flagDetail,  
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(publishersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PagePublisher);