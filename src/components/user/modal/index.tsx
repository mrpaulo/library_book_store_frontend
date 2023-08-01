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
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
//Actions and store
import * as usersActions from '../../../store/ducks/users/actions';
import { ApplicationState } from '../../../store';
//Types and local components
import { Login } from '../../../store/ducks/authentications/types';
import LoginCreatePage from '../../login/create'
//Tranlation
import "../../../services/i18n/i18n";
//Style
import '../../../styles/global.css';
import { modalStyles } from '../../../styles/Styles';
import Modal from '@mui/material/Modal';

function getModalStyle() {
  return {
    height: 'unset',
    top: '5%',
    left: '25%',
  };
}

interface StateProps {
  openModal: boolean
}

interface DispatchProps {
  userSetup(login: Login): void
  handleCloseModal(flag: boolean): void
}

type Props = StateProps & DispatchProps

const ModalUser: React.FC<Props> = (props) => {
  const classes = modalStyles();
  const { openModal, userSetup, handleCloseModal } = props;
  const [modalStyle] = useState(getModalStyle);


  const handleClose = () => {
    handleCloseModal(false);
  };

  const submitedUser = (user: Login) => {
    userSetup(user);
    handleClose();
  }

  return (
    <>      
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <LoginCreatePage fromModalUser submitToModalUser={submitedUser} handleClose={handleClose}/>
        </div>
      </Modal>
    </>
  );
}

ModalUser.displayName = 'ModalUser';

const mapStateToProps = (state: ApplicationState) => ({
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(usersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
