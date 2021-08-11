import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../store';

import * as addressesActions from '../../store/ducks/addresses/actions';
import { Address, AddressDTO } from '../../store/ducks/addresses/types';

import '../../styles/global.css';
import { modalStyles, useStyles } from '../../styles/Styles';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';

import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import EditAddress from '../address/edit'
import DeleteIcon from '@material-ui/icons/Delete';
import { useTranslation } from 'react-i18next';
import "../../services/i18n/i18n";

function getModalStyle() {
  return {
    top: '5%',
    left: '25%',
    // transform: `translate(-50%, 50%)`,
  };
}

interface StateProps {
  addressSrc?: Address
  typeSrc?: String,
  name?: String
}

interface DispatchProps {
  addressSetup(address: Address): void
  deleteByIdRequest(id: number): void
}

type Props = StateProps & DispatchProps

const ModalAddress: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const classes = modalStyles();
  const defaulStyle = useStyles();
  const { addressSrc, typeSrc, name, addressSetup, deleteByIdRequest } = props;
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [fmtAddress, setFmtAddress] = useState("");
  const [address, setAddress] = useState<Address | null>(null);
  const [edit, setEdit] = useState(false);
  const [addressId, setAddressId] = useState(0);

  useEffect(() => {
    console.log("Address")
    console.log(addressSrc)
    if (addressSrc) {
      setAddressId(addressSrc.id as number);
      setEdit(true);
      setFmtAddress(formatAddress(addressSrc))
    }
  }, [addressSrc]);

  const handleAddress = (addressPar: Address) => {
    setAddress(addressPar);
    addressSetup(addressPar);
    setFmtAddress(formatAddress(addressPar));
    setEdit(true);
  };

  const formatAddress = (addressPar: Address) => {
    if (addressPar.city) {
      if (addressPar.city.state) {
        addressPar.stateName = addressPar.city.state.name;
        if (addressPar.city.state.country) {
          addressPar.countryName = addressPar.city.state.country.name;
        }
        addressPar.cityName = addressPar.city.name;
      }
    }
    return (addressPar.logradouro + " " +
      addressPar.name + ", " +
      addressPar.number + ". " +
      addressPar.cityName + " - " +
      addressPar.stateName + " - " +
      addressPar.countryName)
  }
  const handleOpen = () => {
    setOpen(true);
  };

  function confirmEraseAddress() {
    let addressLabel = t("tooltip.address")
    if (window.confirm(t("messages.table_confrm_delete", { name: addressLabel }))) {
      eraseAddress();
    }
  }

  const eraseAddress = () => {
    console.log("deleteAddress")
    if (addressId > 0) {
      deleteByIdRequest(addressId);
    } else {
      setAddress(null);
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
          <EditAddress name={name} closeModal={handleClose} setAddress={handleAddress} addressSrc={addressSrc} />
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
