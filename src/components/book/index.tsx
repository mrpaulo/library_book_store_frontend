import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import FilterBook from './filterBook'
import BookList from './bookList'
import EditBook from './editBook'
import { ApplicationState } from '../../store';
import * as booksActions from '../../store/ducks/books/actions';

interface StateProps {
  flagEditing: Boolean,
  flagDetail: Boolean
}

interface DispatchProps {
  
}

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

EditBook.displayName = 'EditBook';

const mapStateToProps = (state: ApplicationState) => ({
  flagEditing: state.books.flagEditing,  
  flagDetail: state.books.flagDetail,  
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(booksActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageBook);