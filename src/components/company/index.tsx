import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import FilterCompany from './filter'
import CompanyList from './list'
import EditCompany from './edit'
import { ApplicationState } from '../../store';
import * as companiesActions from '../../store/ducks/companies/actions';

interface StateProps {
  flagEditing: Boolean,
  flagDetail: Boolean
}

interface DispatchProps {}

type Props = StateProps & DispatchProps

const PageCompany : React.FC<Props> = (props) =>{

  const {flagEditing, flagDetail} = props;
  return (
    <>
    {flagEditing || flagDetail ? (
        <EditCompany />
      ) : (
        <> 
        <FilterCompany />
        <CompanyList />
      </>     
    )}
    </>
  );
}

PageCompany.displayName = 'PageCompany';

const mapStateToProps = (state: ApplicationState) => ({
  flagEditing: state.companies.flagEditing,  
  flagDetail: state.companies.flagDetail,  
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(companiesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageCompany);