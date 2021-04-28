import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import FilterBook from './filterBook'
import BookList from './bookList'
import { ApplicationState } from '../../store';


const PageBook = React.memo(function PageBook(props) {
  return (
    <>
    <FilterBook />
    <BookList />
    </>
  );
});

PageBook.displayName = 'PageBook';

const mapStateToProps = (state: ApplicationState) => ({
  // listResult: selectors.getListResult(state),
  // filters: selectors.getFilters(state)
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PageBook);