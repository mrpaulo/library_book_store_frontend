import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../../store';

import * as usersActions from '../../../store/ducks/users/actions';


import '../../../styles/global.css';
import { modalStyles, useStyles } from '../../../styles/Styles';
import { TextField, InputAdornment, IconButton, Button } from '@material-ui/core';

import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTranslation } from 'react-i18next';
import "../../../services/i18n/i18n";
import LoginCreatePage from '../../login/create'
import { Login } from '../../../store/ducks/authentications/types';

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
  const { t } = useTranslation();
  const classes = modalStyles();
  const defaulStyle = useStyles();
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
