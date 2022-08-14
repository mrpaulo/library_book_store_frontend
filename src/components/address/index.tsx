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
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
//Actions and store
import * as addressesActions from '../../store/ducks/addresses/actions';
import { ApplicationState } from '../../store';
//Types and local components
import { Address } from '../../store/ducks/addresses/types';
import EditAddress from '../address/edit'
//Translation
import { useTranslation } from 'react-i18next';
import "../../services/i18n/i18n";
//Style
import '../../styles/global.css';
import { modalStyles, useStyles } from '../../styles/Styles';
import { TextField, InputAdornment, IconButton, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function getModalStyle() {
  return {
    top: '5%',
    left: '25%',
    // transform: `translate(-50%, 50%)`,
  };
}

interface StateProps {
  addressSrc?: Address  
  name?: String
  flagEditing?: Boolean
}

interface DispatchProps {
  addressSetup(address: Address): void
  deleteByIdAddressRequest(id: number): void
}

type Props = StateProps & DispatchProps

const ModalAddress: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const classes = modalStyles();
  const defaulStyle = useStyles();
  const { addressSrc, name, flagEditing, addressSetup, deleteByIdAddressRequest } = props;
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [fmtAddress, setFmtAddress] = useState("");
  const [edit, setEdit] = useState(false);
  const [addressId, setAddressId] = useState(0);

  useEffect(() => {   
    if (addressSrc) {
      setAddressId(addressSrc.id as number);
      setEdit(true);
      setFmtAddress(formatAddress(addressSrc) as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressSrc]);

  const handleAddress = (addressPar: Address) => {
    addressSetup(addressPar);
    setFmtAddress(formatAddress(addressPar) as string);
    setEdit(true);
  };

  const formatAddress = (addressPar: Address) => {

    let formatedAddress: String = "";
    if (addressPar.city) {
      formatedAddress = addressPar.city.name;
      if (addressPar.city.state) {
        formatedAddress = formatedAddress + " - " + addressPar.city.state.name;
        
        if (addressPar.city.state.country) {
          formatedAddress = formatedAddress + " - " + addressPar.city.state.country.name;
        }        
      }
    }
    
    if(addressPar.number){
      formatedAddress = addressPar.number + ". " + formatedAddress;
    }
    if(addressPar.name){
      formatedAddress = addressPar.name + ", " + formatedAddress;
    }
    if(addressPar.logradouro){
      formatedAddress = addressPar.logradouro + " " + formatedAddress;
    }
    
    return formatedAddress;
  }
  const handleOpen = () => {
    setOpen(true);
  };

  function confirmEraseAddress() {
    let addressLabel = t("tooltip.address")
    if (window.confirm(t("messages.table_confirm_delete", { name: addressLabel }))) {
      eraseAddress();
    }
  }

  const eraseAddress = () => {    
    if (addressId > 0) {
      deleteByIdAddressRequest(addressId);
    } else {
      setFmtAddress("");
      setEdit(false);
    }    
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <TextField
        name="fmtAddress"
        type="text"
        placeholder={t("placeholder.click_add_address")}
        value={fmtAddress}
        className={defaulStyle.textField}
        disabled
        InputProps={{
          className: defaulStyle.input,
          endAdornment:
            <InputAdornment position="end">
              {edit ?
                (<>
                  <IconButton
                    aria-label={t("buttons.edit")}
                    onClick={handleOpen}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label={t("buttons.delete")}
                    onClick={confirmEraseAddress}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>) :
                (<IconButton
                  aria-label={t("buttons.add")}
                  onClick={handleOpen}
                >
                  <AddIcon />
                </IconButton>)}
            </InputAdornment>
        }}
        variant="outlined"
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <EditAddress name={name} closeModal={handleClose} setAddress={handleAddress} addressSrc={addressSrc} flagEditing={flagEditing} />
        </div>
      </Modal>
    </>
  );
}

ModalAddress.displayName = 'ModalAddress';

const mapStateToProps = (state: ApplicationState) => ({
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(addressesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddress);
