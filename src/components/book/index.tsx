/**
 * Copyright (C) 2021 paulo.rodrigues
 * Profile: <https://github.com/mrpaulo>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

//React
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
//Actions and store
import * as booksActions from '../../store/ducks/books/actions';
import { ApplicationState } from '../../store';
//Local components
import FilterBook from './filter'
import BookList from './list'
import EditBook from './edit'

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