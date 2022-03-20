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
import * as authorsActions from '../../store/ducks/authors/actions';
import { ApplicationState } from '../../store';
//Local components
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