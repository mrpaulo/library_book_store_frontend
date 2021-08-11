import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import FilterBook from './filter'
import BookList from './list'
import EditBook from './edit'
import { ApplicationState } from '../../store';
import * as booksActions from '../../store/ducks/books/actions';

interface StateProps {
  flagEditing: Boolean,
  flagDetail: Boolean
}

interface DispatchProps {}

type Props = StateProps & DispatchProps

const PageBook : React.FC<Props> = (props) =>{

  const {flagEditing, flagDetail} = props;
  return (
    <>
    {flagEditing || flagDetail ? (
        <EditBook />
      ) : (
        <> 
        <FilterBook />
        <BookList />
      </>     
    )}
    </>
  );
}

PageBook.displayName = 'PageBook';

const mapStateToProps = (state: ApplicationState) => ({
  flagEditing: state.books.flagEditing,  
  flagDetail: state.books.flagDetail,  
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(booksActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageBook);